"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { TeamMembersList } from "@/components/organisms/team-members-list"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { useState } from "react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
  status: "active" | "invited" | "inactive"
}

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Member",
    status: "invited",
  },
]

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers)

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  const handleChangeMemberRole = (id: string, role: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, role } : member)))
  }

  const handleResendInvite = (id: string) => {
    console.log(`Resending invite to member with id: ${id}`)
  }

  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Team Members" description="Manage your team members and their roles">
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </PageHeader>

      <TeamMembersList
        members={members}
        onRemoveMember={handleRemoveMember}
        onChangeMemberRole={handleChangeMemberRole}
        onResendInvite={handleResendInvite}
      />
    </div>
  )
}
