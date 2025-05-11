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
      return new NextResponse(JSON.stringify({ user: null }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
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
      cookies().delete({
        name: "session-token",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
      })

      return new NextResponse(JSON.stringify({ user: null }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
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
      cookies().delete({
        name: "session-token",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
      })

      return new NextResponse(JSON.stringify({ user: null }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
    }

    const user = users[0]

    // Return the user data with cache control headers
    return new NextResponse(
      JSON.stringify({
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Session error:", error)
    return new NextResponse(JSON.stringify({ user: null }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  }
}
