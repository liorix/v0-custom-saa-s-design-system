"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { TeamMembersList } from "@/components/organisms/team-members-list"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { ContentWrapper } from "@/components/templates/content-wrapper"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function TeamPage() {
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  const members = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      status: "active" as const,
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "active" as const,
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Member",
      status: "invited" as const,
    },
  ]

  return (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => console.log("Create organization")}
      onSignOut={() => console.log("Sign out")}
    >
      <PageHeader title="Team Members" description="Manage your team members and their permissions">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </PageHeader>

      <ContentWrapper>
        <TeamMembersList
          members={members}
          onRemoveMember={(id) => console.log(`Remove member ${id}`)}
          onChangeMemberRole={(id, role) => console.log(`Change role for member ${id} to ${role}`)}
          onResendInvite={(id) => console.log(`Resend invite to member ${id}`)}
        />
      </ContentWrapper>
    </DashboardLayout>
  )
}
