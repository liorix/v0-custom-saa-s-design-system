import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Get the session token
    const sessionToken = cookies().get("session-token")?.value

    if (!sessionToken) {
      return NextResponse.json({ user: null })
    }

    // Get the session from the database
    const sessions = await sql`
      SELECT * FROM sessions
      WHERE session_token = ${sessionToken}
      AND expires > NOW()
      LIMIT 1
    `

    if (!sessions || sessions.length === 0) {
      // Clear the invalid session cookie
      cookies().delete("session-token")
      return NextResponse.json({ user: null })
    }

    const session = sessions[0]

    // Get the user from the database
    const users = await sql`
      SELECT id, name, email, image
      FROM users
      WHERE id = ${session.user_id}
      LIMIT 1
    `

    if (!users || users.length === 0) {
      // Clear the session if user doesn't exist
      cookies().delete("session-token")
      return NextResponse.json({ user: null })
    }

    const user = users[0]

    // Return the user data
    return NextResponse.json({
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
      },
    })
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json({ user: null })
  }
}
