"use client"

import type React from "react"

import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Mock data for organizations
const mockOrganizations = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Globex Corporation" },
  { id: "3", name: "Initech" },
]

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const [currentOrganizationId, setCurrentOrganizationId] = useState(mockOrganizations[0].id)
  const router = useRouter()

  const handleOrganizationChange = (organizationId: string) => {
    setCurrentOrganizationId(organizationId)
    // In a real app, you might want to fetch data specific to this organization
  }

  const handleCreateOrganization = () => {
    // In a real app, you would implement the organization creation logic
    console.log("Creating new organization")
  }

  const handleSignOut = () => {
    // In a real app, you would implement sign out logic
    console.log("Signing out")
    router.push("/login")
  }

  return (
    <DashboardLayout
      organizations={mockOrganizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={handleOrganizationChange}
      onCreateOrganization={handleCreateOrganization}
      onSignOut={handleSignOut}
    >
      {children}
    </DashboardLayout>
  )
}
