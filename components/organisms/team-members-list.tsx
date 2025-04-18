"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
  status: "active" | "invited" | "inactive"
}

interface TeamMembersListProps {
  members: TeamMember[]
  onRemoveMember: (id: string) => void
  onChangeMemberRole: (id: string, role: string) => void
  onResendInvite: (id: string) => void
  className?: string
}

export function TeamMembersList({
  members,
  onRemoveMember,
  onChangeMemberRole,
  onResendInvite,
  className,
}: TeamMembersListProps) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id)
  }

  const roles = ["Owner", "Admin", "Member", "Viewer"]

  return (
    <div className={cn("space-y-4", className)}>
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={member.avatarUrl || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback>
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{member.name}</p>
                <Badge status={member.status} />
              </div>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{member.role}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onChangeMemberRole(member.id, "Admin")}>Change role</DropdownMenuItem>
                {member.status === "invited" && (
                  <DropdownMenuItem onClick={() => onResendInvite(member.id)}>Resend invite</DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onRemoveMember(member.id)}
                >
                  Remove member
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

interface BadgeProps {
  status: "active" | "invited" | "inactive"
}

function Badge({ status }: BadgeProps) {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-green-100 text-green-800",
    },
    invited: {
      label: "Invited",
      className: "bg-yellow-100 text-yellow-800",
    },
    inactive: {
      label: "Inactive",
      className: "bg-gray-100 text-gray-800",
    },
  }

  const config = statusConfig[status]

  return <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", config.className)}>{config.label}</span>
}
