"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setIsLoading(true)

      // Clear the session cookie client-side
      document.cookie = "session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

      // Force a hard navigation to the login page
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
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
