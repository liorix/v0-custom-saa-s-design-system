"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "An unknown error occurred during authentication"

  switch (error) {
    case "CredentialsSignin":
      errorMessage = "Invalid email or password"
      break
    case "AccessDenied":
      errorMessage = "You do not have permission to access this resource"
      break
    case "EmailSignin":
      errorMessage = "Failed to send the login email. Please try again"
      break
    case "SessionRequired":
      errorMessage = "You must be signed in to access this page"
      break
    case "Default":
    default:
      errorMessage = "An unknown error occurred during authentication"
      break
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Authentication Error</CardTitle>
          </div>
          <CardDescription>There was a problem with your authentication request</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
