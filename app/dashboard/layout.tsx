"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { signOut } from "next-auth/react"

// Note: We're not importing DashboardLayout here anymore
// as we'll use children directly

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })

      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      })

      router.push("/login")
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  // We're just returning children directly now
  // The actual sidebar will be in the DashboardShell component
  return children
}
