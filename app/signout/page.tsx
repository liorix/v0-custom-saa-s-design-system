import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { neon } from "@neondatabase/serverless"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

export default async function SignOutPage() {
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

  // Redirect to login page
  redirect("/login")

  // This is just a fallback in case the redirect doesn't work
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/login" />
        <title>Signing out...</title>
      </head>
      <body>
        <p>Signing out...</p>
        <p>
          If you are not redirected, <a href="/login">click here</a>.
        </p>
      </body>
    </html>
  )
}
