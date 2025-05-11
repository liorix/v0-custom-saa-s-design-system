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

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "An error occurred during logout" }, { status: 500 })
  }
}
