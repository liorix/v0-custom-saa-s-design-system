"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/user-provider" // Use our custom auth hook

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter()
  const { user, logout } = useAuth() // Use our custom auth hook
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  const handleSignOut = async () => {
    try {
      await logout() // Use the logout function from our custom hook

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
