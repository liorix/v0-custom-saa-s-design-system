"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface LogoutButtonProps extends ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
}

export function LogoutButton({
  variant = "ghost",
  size = "default",
  showIcon = true,
  className,
  children,
  ...props
}: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { toast } = useToast()

  const handleLogout = async () => {
    if (isLoggingOut) return

    try {
      setIsLoggingOut(true)
      console.log("Logout initiated from standalone button")

      toast({
        title: "Signing out...",
        description: "Please wait while we sign you out.",
      })

      // Make a request to the logout API endpoint
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      console.log("API logout successful")

      // Clear cookies on the client side as well for redundancy
      document.cookie = "session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"

      console.log("Cookies cleared")

      // Force a hard navigation to the login page
      console.log("Redirecting to login page")
      window.location.href = "/login?signedOut=true"
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error signing out",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
      })
      setIsLoggingOut(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={className}
      data-testid="standalone-logout-button"
      {...props}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      {children || (isLoggingOut ? "Signing out..." : "Sign out")}
    </Button>
  )
}
