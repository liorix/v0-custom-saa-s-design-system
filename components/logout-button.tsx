"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      toast({
        title: "Signing out...",
        description: "Please wait while we sign you out.",
      })

      // Clear all cookies that might be related to authentication
      document.cookie = "session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"

      // Add a small delay to ensure the toast is shown
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Force a hard navigation to the login page
      window.location.href = "/login?signedOut=true"
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error signing out",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Button variant="ghost" className="w-full justify-start" onClick={handleLogout} disabled={isLoading}>
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  )
}
