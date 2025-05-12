import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { randomBytes, createHash } from "crypto"
import { jwtVerify, SignJWT } from "jose"
import { useAuthSession } from "@/hooks/use-auth-session"

// Create a mock or real database connection based on environment
let sql: any

// Function to initialize the database connection
const initDatabase = () => {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not available, using mock database for preview")

    // Create a mock database implementation for preview
    return {
      async query() {
        return { rows: [] }
      },
      async execute() {
        return []
      },
      async transaction() {
        return []
      },
      async raw() {
        return []
      },
      async any() {
        return []
      },
      async one() {
        return null
      },
      async many() {
        return []
      },
      async none() {
        return null
      },
      async maybeOne() {
        return null
      },
      async stream() {
        return { readable: new ReadableStream() }
      },
      // Add a template literal tag function that returns an empty array
      // This allows sql`` syntax to work without errors
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      "": (...args: any[]) => [], // Using a string key instead of a method
    }
  }

  // Use the real database connection
  try {
    return neon(process.env.DATABASE_URL)
  } catch (error) {
    console.error("Failed to connect to database:", error)
    throw new Error("Database connection failed")
  }
}

// Initialize database connection lazily
const getDatabase = () => {
  if (!sql) {
    sql = initDatabase()
  }
  return sql
}

// Secret key for JWT
const JWT_SECRET = new TextEncoder().encode(
  process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET || "your-secret-key-min-32-chars-long",
)

// User schema
const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().email(),
  password: z.string().optional(),
  image: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type User = z.infer<typeof UserSchema>

// Session schema
const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expires: z.date(),
  sessionToken: z.string(),
})

type Session = z.infer<typeof SessionSchema>

// Mock user for preview mode - IMPORTANT: Password is "password"
const MOCK_USER: User = {
  id: "preview-user-id",
  name: "Preview User",
  email: "preview@example.com",
  password: createHash("sha256").update("password").digest("hex"),
  createdAt: new Date(),
  updatedAt: new Date(),
  image: null,
  emailVerified: null,
}

// Create a Better Auth compatible API
export const betterAuth = {
  // Get session from request
  async getSession(req: NextRequest | Request): Promise<Session | null> {
    try {
      // Get session token from cookie
      const cookieStore = cookies()
      const token = cookieStore.get("session-token")?.value

      if (!token) return null

      // Verify JWT
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        if (!payload || !payload.sub) return null

        // In preview mode with no database, return a mock session
        if (!process.env.DATABASE_URL) {
          const expires = new Date()
          expires.setDate(expires.getDate() + 30)

          return {
            id: "preview-session-id",
            userId: payload.sub as string,
            expires,
            sessionToken: token,
          }
        }

        // Get session from database
        const db = getDatabase()
        // Use a different approach for SQL queries to avoid template literal issues
        const sessions = await db.query("SELECT * FROM sessions WHERE sessionToken = $1 AND expires > NOW()", [token])
        const session = sessions.rows?.[0] as Session | undefined

        return session || null
      } catch (error) {
        console.error("JWT verification failed:", error)
        return null
      }
    } catch (error) {
      console.error("Error getting session:", error)
      return null
    }
  },

  // Sign in with credentials
  async signIn(credentials: { email: string; password: string }) {
    try {
      console.log("Attempting to sign in with:", credentials.email)

      // Hash the provided password
      const hashedPassword = createHash("sha256").update(credentials.password).digest("hex")

      // In preview mode with no database, use mock user
      if (!process.env.DATABASE_URL) {
        console.log("Preview mode detected, using mock authentication")
        console.log("Mock user email:", MOCK_USER.email)
        console.log("Provided email:", credentials.email)

        // Check if credentials match mock user
        if (credentials.email === MOCK_USER.email) {
          console.log("Email matches mock user")

          // For security, don't log the actual passwords, but log if they match
          const passwordsMatch = hashedPassword === MOCK_USER.password
          console.log("Passwords match:", passwordsMatch)

          if (passwordsMatch) {
            console.log("Authentication successful for mock user")

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

            return { user: MOCK_USER }
          }
        }

        console.log("Authentication failed for mock user")
        return { error: "Invalid credentials" }
      }

      // Get user from database
      const db = getDatabase()
      const users = await db.query("SELECT * FROM users WHERE email = $1", [credentials.email])
      const user = users.rows?.[0] as User | undefined

      if (!user) {
        return { error: "Invalid credentials" }
      }

      // Verify password
      const storedPassword = user.password

      if (hashedPassword !== storedPassword) {
        return { error: "Invalid credentials" }
      }

      // Create session
      const expires = new Date()
      expires.setDate(expires.getDate() + 30) // 30 days

      const sessionToken = await new SignJWT({ sub: user.id })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(JWT_SECRET)

      // Store session in database
      await db.query("INSERT INTO sessions (id, userId, expires, sessionToken) VALUES ($1, $2, $3, $4)", [
        randomBytes(16).toString("hex"),
        user.id,
        expires.toISOString(),
        sessionToken,
      ])

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

      return { user }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error: "An error occurred during sign in" }
    }
  },

  // Sign up new user
  async signUp(userData: { name?: string; email: string; password: string }) {
    try {
      // In preview mode with no database, pretend to create a user
      if (!process.env.DATABASE_URL) {
        // Check if email matches mock user
        if (userData.email === MOCK_USER.email) {
          return { error: "User already exists" }
        }

        // Pretend to create a user, then sign in
        return this.signIn({
          email: userData.email,
          password: userData.password,
        })
      }

      // Check if user already exists
      const db = getDatabase()
      const existingUsers = await db.query("SELECT * FROM users WHERE email = $1", [userData.email])
      const existingUser = existingUsers.rows?.[0] as User | undefined

      if (existingUser) {
        return { error: "User already exists" }
      }

      // Hash password
      const hashedPassword = createHash("sha256").update(userData.password).digest("hex")

      // Create user
      const userId = randomBytes(16).toString("hex")
      const now = new Date()

      await db.query(
        "INSERT INTO users (id, name, email, password, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6)",
        [userId, userData.name || null, userData.email, hashedPassword, now.toISOString(), now.toISOString()],
      )

      // Auto sign in after sign up
      return this.signIn({
        email: userData.email,
        password: userData.password,
      })
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: "An error occurred during sign up" }
    }
  },

  // Sign out
  async signOut() {
    try {
      // Get session token from cookie
      const cookieStore = cookies()
      const token = cookieStore.get("session-token")?.value

      // In preview mode with database, skip database operations
      if (process.env.DATABASE_URL && token) {
        // Delete session from database
        const db = getDatabase()
        await db.query("DELETE FROM sessions WHERE sessionToken = $1", [token])
      }

      // Clear cookie
      cookies().delete("session-token")

      return { success: true }
    } catch (error) {
      console.error("Error signing out:", error)

      // Even if there's an error, try to clear the cookie
      cookies().delete("session-token")

      return { success: true }
    }
  },

  // API route handler
  handler: {
    async GET(req: NextRequest) {
      const url = new URL(req.url)
      const path = url.pathname.replace("/api/auth/", "")

      if (path === "session") {
        const session = await betterAuth.getSession(req)
        return NextResponse.json({ session })
      }

      if (path === "csrf") {
        const csrfToken = randomBytes(32).toString("hex")
        return NextResponse.json({ csrfToken })
      }

      return NextResponse.json({ error: "Not implemented" }, { status: 501 })
    },

    async POST(req: NextRequest) {
      const url = new URL(req.url)
      const path = url.pathname.replace("/api/auth/", "")

      if (path === "login" || path === "signin") {
        const data = await req.json()
        const result = await betterAuth.signIn(data)
        return NextResponse.json(result)
      }

      if (path === "signup") {
        const data = await req.json()
        const result = await betterAuth.signUp(data)
        return NextResponse.json(result)
      }

      if (path === "logout" || path === "signout") {
        const result = await betterAuth.signOut()
        return NextResponse.json(result)
      }

      return NextResponse.json({ error: "Not implemented" }, { status: 501 })
    },
  },
}

// Export the useSession hook
export const useSession = useAuthSession
