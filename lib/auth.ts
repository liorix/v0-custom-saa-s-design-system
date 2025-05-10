import { BetterAuth } from "better-auth"
import { PostgresAdapter } from "better-auth/adapters/postgres"
import { CredentialsProvider } from "better-auth/providers/credentials"
import { MagicLinkProvider } from "better-auth/providers/magic-link"
import { compare, hash } from "bcrypt"

// Initialize the PostgreSQL adapter with the Neon DB connection
const adapter = new PostgresAdapter({
  connectionString: process.env.DATABASE_URL!,
  // Tables are already created, so we don't need to auto-create them
  autoCreateTables: false,
})

// Initialize Better Auth
export const auth = new BetterAuth({
  adapter,
  secret: process.env.BETTER_AUTH_SECRET!,
  baseUrl: process.env.BETTER_AUTH_URL!,
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
})

// Configure the credentials provider for username/password authentication
auth.use(
  new CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      const user = await adapter.getUserByEmail(credentials.email)

      if (!user || !user.password) {
        return null
      }

      const isPasswordValid = await compare(credentials.password, user.password)

      if (!isPasswordValid) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      }
    },
  }),
)

// Add magic link authentication (email link) only if email configuration is available
if (
  process.env.EMAIL_SERVER_HOST &&
  process.env.EMAIL_SERVER_PORT &&
  process.env.EMAIL_SERVER_USER &&
  process.env.EMAIL_SERVER_PASSWORD &&
  process.env.EMAIL_FROM
) {
  auth.use(
    new MagicLinkProvider({
      name: "magic-link",
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  )
}

// Helper functions for user management
export async function createUser(data: { name: string; email: string; password: string }) {
  const hashedPassword = await hash(data.password, 10)

  return adapter.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  })
}

export async function getUserByEmail(email: string) {
  return adapter.getUserByEmail(email)
}

export async function getUserById(id: string) {
  return adapter.getUserById(id)
}

export async function updateUser(id: string, data: Partial<{ name: string; email: string; password: string }>) {
  const updateData: any = { ...data }

  if (data.password) {
    updateData.password = await hash(data.password, 10)
  }

  return adapter.updateUser(id, updateData)
}

// Export types
export type { User, Session } from "better-auth"
