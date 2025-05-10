"use client"

import { AuthForm } from "@/components/organisms/auth-form"
import { AuthLayout } from "@/components/templates/auth-layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogIn } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [isLoading, setIsLoading] = useState(false)

  const [magicLinkAvailable] = useState(
    !!(
      process.env.NEXT_PUBLIC_MAGIC_LINK_ENABLED === "true" || process.env.NEXT_PUBLIC_MAGIC_LINK_ENABLED === undefined
    ),
  )

  const handleLogin = async (values: any) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signin/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          callbackUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to sign in")
      }

      const data = await response.json()

      if (data.url) {
        router.push(data.url)
      } else {
        router.push(callbackUrl)
      }

      toast({
        title: "Success",
        description: "You have been signed in.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLink = async (values: any) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signin/magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          callbackUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to send magic link")
      }

      toast({
        title: "Check your email",
        description: "A sign in link has been sent to your email address.",
      })

      router.push("/auth/verify-request")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send magic link",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your credentials below to sign in to your account"
      icon={LogIn}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary underline underline-offset-4 hover:text-primary/90">
            Sign up
          </Link>
        </p>
      }
    >
      <div className="grid gap-6">
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />

        {magicLinkAvailable && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={() =>
                handleMagicLink({ email: document.querySelector<HTMLInputElement>('input[name="email"]')?.value })
              }
              disabled={isLoading}
            >
              Magic Link
            </Button>
          </>
        )}
      </div>
    </AuthLayout>
  )
}
