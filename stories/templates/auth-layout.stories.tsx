"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { AuthLayout } from "@/components/templates/auth-layout"
import { AuthForm } from "@/components/organisms/auth-form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Lock, UserPlus } from "lucide-react"

const meta: Meta<typeof AuthLayout> = {
  title: "Templates/AuthLayout",
  component: AuthLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AuthLayout>

export const Login: Story = {
  args: {
    title: "Sign in to your account",
    description: "Enter your email below to sign in to your account",
    icon: Lock,
    footer: (
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-medium text-primary underline underline-offset-4 hover:text-primary/90">
          Sign up
        </a>
      </p>
    ),
    children: (
      <div className="grid gap-6">
        <AuthForm
          type="login"
          onSubmit={async (values) => {
            console.log("Login values:", values)
            // Simulate API call
            return new Promise((resolve) => setTimeout(resolve, 1000))
          }}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Button variant="outline" type="button">
            Google
          </Button>
          <Button variant="outline" type="button">
            GitHub
          </Button>
        </div>
      </div>
    ),
  },
}

export const Signup: Story = {
  args: {
    title: "Create an account",
    description: "Enter your information below to create your account",
    icon: UserPlus,
    footer: (
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="#" className="font-medium text-primary underline underline-offset-4 hover:text-primary/90">
          Sign in
        </a>
      </p>
    ),
    children: (
      <div className="grid gap-6">
        <AuthForm
          type="signup"
          onSubmit={async (values) => {
            console.log("Signup values:", values)
            // Simulate API call
            return new Promise((resolve) => setTimeout(resolve, 1000))
          }}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Button variant="outline" type="button">
            Google
          </Button>
          <Button variant="outline" type="button">
            GitHub
          </Button>
        </div>
      </div>
    ),
  },
}
