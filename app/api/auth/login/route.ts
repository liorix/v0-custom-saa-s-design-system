import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SignJWT } from "jose"

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

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json()
    const { email, password } = body

    console.log("Login attempt:", { email, password: "***" })

    // In preview mode, only check for exact match with mock credentials
    if (email === "preview@example.com" && password === "password") {
      console.log("Login successful for mock user")

      // Create session token
      const expires = new Date()
      expires.setDate(expires.getDate() + 30) // 30 days

      const sessionToken = await new SignJWT({ sub: MOCK_USER.id })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(JWT_SECRET)

      // Set cookie
      cookies().set({
        name: "session-token",
        value: sessionToken,
        expires,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      return NextResponse.json({ user: MOCK_USER })
    }

    console.log("Login failed: Invalid credentials")
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Error in login route:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
