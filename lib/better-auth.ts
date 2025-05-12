import { BetterAuth } from "@better-auth/core"
import { neon } from "@neondatabase/serverless"

// Initialize Better Auth with Neon DB
export const betterAuth = new BetterAuth({
  // Database configuration
  database: {
    type: "postgres",
    url: process.env.DATABASE_URL!,
    // Use the neon client for database operations
    client: neon,
  },

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secret: process.env.BETTER_AUTH_SECRET!,
  },

  // URL configuration
  urls: {
    baseUrl: process.env.BETTER_AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
    signIn: "/login",
    signUp: "/signup",
    signOut: "/api/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },

  // Providers configuration
  providers: [
    {
      id: "credentials",
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Use the database to find the user
        const db = neon(process.env.DATABASE_URL!)
        const users = await db`
          SELECT * FROM users WHERE email = ${credentials.email} LIMIT 1
        `

        const user = users[0]

        if (!user) {
          return null
        }

        // Verify password (Better Auth handles this securely)
        const isValid = await betterAuth.verifyPassword(credentials.password, user.password)

        if (!isValid) {
          return null
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    },
    // Add magic link provider if enabled
    ...(process.env.NEXT_PUBLIC_MAGIC_LINK_ENABLED === "true"
      ? [
          {
            id: "email",
            type: "email",
            name: "Email Magic Link",
            server: {
              host: process.env.EMAIL_SERVER_HOST,
              port: Number(process.env.EMAIL_SERVER_PORT),
              auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
              },
            },
            from: process.env.EMAIL_FROM,
          },
        ]
      : []),
  ],

  // Callbacks for customizing authentication behavior
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

// Export the auth handler
export const { handler, signIn, signOut, getSession } = betterAuth
