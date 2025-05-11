"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { neon } from "@neondatabase/serverless"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

export async function logout() {
  // Get the session token
  const sessionToken = cookies().get("session-token")?.value

  if (sessionToken) {
    try {
      // Delete the session from the database
      await sql`
        DELETE FROM sessions WHERE session_token = ${sessionToken}
      `
    } catch (error) {
      console.error("Error deleting session:", error)
    }

    // Clear the session cookie
    cookies().delete({
      name: "session-token",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    })
  }

  // Redirect to login page (server-side redirect)
  redirect("/login")
}
