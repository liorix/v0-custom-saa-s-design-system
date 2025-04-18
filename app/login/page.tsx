"use client"

import { AuthForm } from "@/components/organisms/auth-form"
import { AuthLayout } from "@/components/templates/auth-layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const handleLogin = async (values: any) => {
    // Handle login logic here
    console.log("Login values:", values)
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your email below to sign in to your account"
      icon={Lock}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary underline underline-offset-4 hover:text-primary/90">
            Sign up
          </Link>
        </p>
      }
    >
      <div className="grid gap-6">
        <AuthForm type="login" onSubmit={handleLogin} />

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
