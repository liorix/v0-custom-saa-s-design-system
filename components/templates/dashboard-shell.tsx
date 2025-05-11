"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/user-provider"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  const handleSignOut = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)

    try {
      await logout()

      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      })

      // The redirect is handled in the logout function
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
      setIsLoggingOut(false)
    }
  }

  return (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => console.log("Create organization")}
      onSignOut={handleSignOut}
    >
      {children}
    </DashboardLayout>
  )
}
