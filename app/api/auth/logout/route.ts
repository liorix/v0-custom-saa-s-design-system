import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

export async function POST() {
  try {
    // Get the session token
    const sessionToken = cookies().get("session-token")?.value

    if (sessionToken) {
      // Delete the session from the database
      await sql`
        DELETE FROM sessions WHERE session_token = ${sessionToken}
      `

      // Clear the session cookie with proper options
      cookies().delete({
        name: "session-token",
        path: "/",
        // Make sure the cookie is deleted across the entire site
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
      })
    }

    // Return success response with cache control headers to prevent caching
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "An error occurred during logout" }, { status: 500 })
  }
}
