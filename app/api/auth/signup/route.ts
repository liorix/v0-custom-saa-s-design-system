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
    const { email, password, name } = body

    console.log("Signup attempt:", { email, name, password: "***" })

    // In preview mode, pretend to create a user
    // Check if email matches mock user
    if (email === MOCK_USER.email) {
      console.log("Signup failed: User already exists")
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create a custom user based on the signup data
    const customUser = {
      id: "custom-user-id",
      name: name || "Custom User",
      email,
      image: null,
    }

    console.log("User created:", { id: customUser.id, email: customUser.email })

    // Create session token
    const expires = new Date()
    expires.setDate(expires.getDate() + 30) // 30 days

    const sessionToken = await new SignJWT({ sub: customUser.id })
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

    console.log("Signup successful, session created")
    return NextResponse.json({ user: customUser })
  } catch (error) {
    console.error("Error in signup route:", error)
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}
