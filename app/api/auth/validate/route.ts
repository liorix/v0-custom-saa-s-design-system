import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Get the session token
    const sessionToken = cookies().get("session-token")?.value

    if (!sessionToken) {
      return NextResponse.json({ isAuthenticated: false })
    }

    // Return a simple response indicating the user is authenticated
    return NextResponse.json({ isAuthenticated: true })
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json({ isAuthenticated: false })
  }
}
