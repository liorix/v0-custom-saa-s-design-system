import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Clear the session cookie
    cookies().delete({
      name: "session-token",
      path: "/",
    })

    // Return a success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, error: "Failed to logout" }, { status: 500 })
  }
}
