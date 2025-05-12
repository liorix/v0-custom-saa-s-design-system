import { NextResponse } from "next/server"
import { z } from "zod"
import { betterAuth } from "@/lib/better-auth"
import { neon } from "@neondatabase/serverless"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export async function PUT(request: Request) {
  try {
    // Get the session
    const session = await betterAuth.getSession({ req: request })

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Parse the request body
    const body = await request.json()
    const result = profileSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ message: result.error.errors[0].message }, { status: 400 })
    }

    const { name, email } = result.data

    // Update the user in the database
    const db = neon(process.env.DATABASE_URL!)
    const updatedUser = await db`
      UPDATE users
      SET name = ${name}, email = ${email}
      WHERE id = ${Number.parseInt(userId)}
      RETURNING id, name, email
    `

    return NextResponse.json({
      id: updatedUser[0].id.toString(),
      name: updatedUser[0].name,
      email: updatedUser[0].email,
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "An error occurred while updating your profile" }, { status: 500 })
  }
}
