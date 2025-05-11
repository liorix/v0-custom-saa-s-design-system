import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"
import { auth } from "./auth"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

// Get the current session
export async function getSession() {
  try {
    // Get the session token from cookies
    const sessionToken = cookies().get("session-token")?.value

    if (!sessionToken) {
      return null
    }

    // Get the session from the database
    const result = await sql`
      SELECT * FROM sessions
      WHERE session_token = ${sessionToken}
      AND expires > NOW()
      LIMIT 1
    `

    const session = result[0]

    if (!session) {
      return null
    }

    // Get the user from the database
    const user = await auth.getUserById(session.user_id)

    if (!user) {
      return null
    }

    // Return the session data
    return {
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
      },
      expires: session.expires,
    }
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}
