import { createUser, getUserByEmail } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate the request body
    const result = signupSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ message: result.error.errors[0].message }, { status: 400 })
    }

    const { name, email, password } = result.data

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({ message: "A user with this email already exists" }, { status: 409 })
    }

    // Create the user
    const user = await createUser({ name, email, password })

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)

    return NextResponse.json({ message: "An error occurred while creating your account" }, { status: 500 })
  }
}
