import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    console.log("Logout requested")

    // Clear cookie
    cookies().delete("session-token")

    console.log("Session cookie cleared")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in logout route:", error)

    // Even if there's an error, try to clear the cookie
    cookies().delete("session-token")

    return NextResponse.json({ success: true })
  }
}
