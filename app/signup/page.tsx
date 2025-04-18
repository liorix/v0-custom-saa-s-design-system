"use client"

import { AuthForm } from "@/components/organisms/auth-form"
import { AuthLayout } from "@/components/templates/auth-layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const handleSignup = async (values: any) => {
    // Handle signup logic here
    console.log("Signup values:", values)
  }

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information below to create your account"
      icon={UserPlus}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary underline underline-offset-4 hover:text-primary/90">
            Sign in
          </Link>
        </p>
      }
    >
      <div className="grid gap-6">
        <AuthForm type="signup" onSubmit={handleSignup} />

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
    </AuthLayout>
  )
}
