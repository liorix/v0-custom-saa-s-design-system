import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import * as bcryptjs from "bcryptjs"
import { neon } from "@neondatabase/serverless"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

// Define the request schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // Create the user
    const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `

    // Return the user data (excluding password)
    return NextResponse.json({
      user: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
