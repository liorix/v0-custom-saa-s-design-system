"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { useAuth } from "@/components/user-provider"
import { LogoutForm } from "@/components/logout-form"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user } = useAuth()
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  return (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => console.log("Create organization")}
      LogoutButton={LogoutForm}
    >
      {children}
    </DashboardLayout>
  )
}
