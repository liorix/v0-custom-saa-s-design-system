import { neon } from "@neondatabase/serverless"
import { compare, hash } from "bcrypt"

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!)

// Create a simple auth utility
export const auth = {
  // User authentication
  async signIn(email: string, password: string) {
    try {
      const result = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 1
      `

      const user = result[0]

      if (!user || !user.password) {
        return null
      }

      const isPasswordValid = await compare(password, user.password)

      if (!isPasswordValid) {
        return null
      }

      return {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
      }
    } catch (error) {
      console.error("Authentication error:", error)
      return null
    }
  },

  // Create a new user
  async createUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = await hash(data.password, 10)

    try {
      const result = await sql`
        INSERT INTO users (name, email, password)
        VALUES (${data.name}, ${data.email}, ${hashedPassword})
        RETURNING id, name, email
      `

      return result[0]
    } catch (error) {
      console.error("Error creating user:", error)
      throw new Error("Failed to create user")
    }
  },

  // Get user by email
  async getUserByEmail(email: string) {
    try {
      const result = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 1
      `

      return result[0]
    } catch (error) {
      console.error("Error getting user by email:", error)
      return null
    }
  },

  // Get user by ID
  async getUserById(id: string) {
    try {
      const result = await sql`
        SELECT * FROM users WHERE id = ${Number.parseInt(id)} LIMIT 1
      `

      return result[0]
    } catch (error) {
      console.error("Error getting user by ID:", error)
      return null
    }
  },

  // Update user
  async updateUser(id: string, data: Partial<{ name: string; email: string; password: string }>) {
    try {
      const updates = []
      const values = []

      if (data.name) {
        updates.push(`name = ${data.name}`)
      }

      if (data.email) {
        updates.push(`email = ${data.email}`)
      }

      if (data.password) {
        const hashedPassword = await hash(data.password, 10)
        updates.push(`password = ${hashedPassword}`)
      }

      if (updates.length === 0) {
        return null
      }

      const updateQuery = `
        UPDATE users
        SET ${updates.join(", ")}
        WHERE id = ${Number.parseInt(id)}
        RETURNING id, name, email
      `

      const result = await sql.query(updateQuery)

      return result.rows[0]
    } catch (error) {
      console.error("Error updating user:", error)
      throw new Error("Failed to update user")
    }
  },

  // Session management will be handled via cookies in the API routes
}

// Export the auth utilities
export { auth as default }

export const updateUser = auth.updateUser
