import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

// Mock user for preview mode
const MOCK_USER = {
  id: "preview-user-id",
  name: "Preview User",
  email: "preview@example.com",
  image: null,
}

// Secret key for JWT
const JWT_SECRET = new TextEncoder().encode(
  process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET || "your-secret-key-min-32-chars-long",
)

export async function GET(req: NextRequest) {
  try {
    // Get session token from cookie
    const cookieStore = cookies()
    const token = cookieStore.get("session-token")?.value

    if (!token) {
      console.log("No session token found")
      return NextResponse.json({ session: null })
    }

    try {
      // Verify JWT
      const { payload } = await jwtVerify(token, JWT_SECRET)

      if (!payload || !payload.sub) {
        console.log("Invalid JWT payload")
        return NextResponse.json({ session: null })
      }

      // In preview mode, return mock session
      console.log("Valid session found for user ID:", payload.sub)

      const session = {
        user: MOCK_USER,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      }

      return NextResponse.json({ session })
    } catch (error) {
      console.error("JWT verification failed:", error)
      return NextResponse.json({ session: null })
    }
  } catch (error) {
    console.error("Error in session route:", error)
    return NextResponse.json({ session: null })
  }
}
