import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { cookies } from "next/headers"
import { z } from "zod"
import { sql } from "@vercel/postgres"

// Define the login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request body
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
    }

    // Authenticate the user
    const { email, password } = result.data
    const user = await auth.signIn(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create a session token
    const sessionToken = crypto.randomUUID()

    // Store the session in the database
    await sql`
      INSERT INTO sessions (user_id, session_token, expires)
      VALUES (${user.id}, ${sessionToken}, ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)})
    `

    // Set the session cookie
    cookies().set({
      name: "session-token",
      value: sessionToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    // Return the user data
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
