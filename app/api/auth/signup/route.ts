import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { neon } from "@neondatabase/serverless"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

// Define the signup schema
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request body
    const result = signupSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Invalid signup data" }, { status: 400 })
    }

    // Check if the user already exists
    const { name, email, password } = result.data
    const existingUser = await auth.getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    // Create the user
    const user = await auth.createUser({ name, email, password })

    // Return the user data
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}
