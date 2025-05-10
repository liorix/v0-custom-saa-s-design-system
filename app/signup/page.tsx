"use client"

import { AuthForm } from "@/components/organisms/auth-form"
import { AuthLayout } from "@/components/templates/auth-layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (values: any) => {
    setIsLoading(true)

    try {
      // First, create the user
      const createResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      })

      if (!createResponse.ok) {
        const error = await createResponse.json()
        throw new Error(error.message || "Failed to create account")
      }

      // Then, sign in the user
      const signInResponse = await fetch("/api/auth/signin/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          callbackUrl: "/dashboard",
        }),
      })

      if (!signInResponse.ok) {
        const error = await signInResponse.json()
        throw new Error(error.message || "Account created but failed to sign in")
      }

      const data = await signInResponse.json()

      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      })

      if (data.url) {
        router.push(data.url)
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
        <AuthForm type="signup" onSubmit={handleSignup} isLoading={isLoading} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" type="button" onClick={() => router.push("/login")} disabled={isLoading}>
          Magic Link
        </Button>
      </div>
    </AuthLayout>
  )
}
