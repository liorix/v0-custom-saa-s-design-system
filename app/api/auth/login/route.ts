import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import * as bcryptjs from "bcryptjs"
import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

// Define the request schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find the user
    const users = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `

    const user = users[0]

    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify the password
    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate a session token
    const sessionToken = uuidv4()
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    // Create a session
    await sql`
      INSERT INTO sessions (user_id, expires, session_token)
      VALUES (${user.id}, ${expires.toISOString()}, ${sessionToken})
    `

    // Set the session cookie
    cookies().set({
      name: "session-token",
      value: sessionToken,
      expires,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    })

    // Return the user data (excluding password)
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    })
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
