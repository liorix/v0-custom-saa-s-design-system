import { auth, updateUser } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export async function PUT(req: NextRequest) {
  try {
    const session = await auth.getSession()

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Validate the request body
    const result = profileSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ message: result.error.errors[0].message }, { status: 400 })
    }

    const { name, email } = result.data

    // Update the user
    const updatedUser = await updateUser(session.user.id, { name, email })

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    })
  } catch (error) {
    console.error("Profile update error:", error)

    return NextResponse.json({ message: "An error occurred while updating your profile" }, { status: 500 })
  }
}
