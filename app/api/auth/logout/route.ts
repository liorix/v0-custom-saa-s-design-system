import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  console.log("Server-side logout API called")

  try {
    // Clear all possible session cookies
    cookies().delete({
      name: "session-token",
      path: "/",
    })

    cookies().delete({
      name: "session",
      path: "/",
    })

    // Add any other cookies that might be related to authentication

    console.log("Server-side cookies cleared")

    // Return a success response with cache control headers
    const response = NextResponse.json({ success: true })

    // Add cache control headers to prevent caching
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")

    return response
  } catch (error) {
    console.error("Server-side logout error:", error)
    return NextResponse.json({ success: false, error: "Failed to logout" }, { status: 500 })
  }
}
