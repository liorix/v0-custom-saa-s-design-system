import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function SignOutPage() {
  try {
    // Get the session token
    const sessionToken = cookies().get("session-token")?.value

    if (sessionToken) {
      try {
        // Import the database client inside the try block to avoid initialization errors
        const { neon } = await import("@neondatabase/serverless")
        const sql = neon(process.env.DATABASE_URL!)

        // Delete the session from the database
        await sql`
          DELETE FROM sessions WHERE session_token = ${sessionToken}
        `
      } catch (dbError) {
        console.error("Database error during signout:", dbError)
        // Continue with cookie deletion even if DB operation fails
      }

      // Clear the session cookie
      cookies().delete({
        name: "session-token",
        path: "/",
      })
    }

    // Redirect to login page
    return redirect("/login")
  } catch (error) {
    console.error("Error in signout page:", error)

    // Return a fallback UI instead of throwing an error
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 text-2xl font-bold">Signing Out</h1>
          <p className="mb-4">There was an issue signing you out.</p>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Return to Login
          </a>
        </div>
      </div>
    )
  }
}
