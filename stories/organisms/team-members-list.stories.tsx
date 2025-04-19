import type { Meta, StoryObj } from "@storybook/react"
import { TeamMembersList } from "@/components/organisms/team-members-list"

const meta: Meta<typeof TeamMembersList> = {
  title: "Organisms/TeamMembersList",
  component: TeamMembersList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TeamMembersList>

const members = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Member",
    status: "invited" as const,
  },
]

export const Default = {
  render: () => (
    <TeamMembersList
      members={members}
      onRemoveMember={(id) => console.log(`Remove member ${id}`)}
      onChangeMemberRole={(id, role) => console.log(`Change role for member ${id} to ${role}`)}
      onResendInvite={(id) => console.log(`Resend invite to member ${id}`)}
      className="w-full max-w-3xl"
    />
  ),
}

export const WithAvatars = {
  render: () => (
    <TeamMembersList
      members={members.map((member) => ({
        ...member,
        avatarUrl: "/placeholder.svg?height=40&width=40",
      }))}
      onRemoveMember={(id) => console.log(`Remove member ${id}`)}
      onChangeMemberRole={(id, role) => console.log(`Change role for member ${id} to ${role}`)}
      onResendInvite={(id) => console.log(`Resend invite to member ${id}`)}
      className="w-full max-w-3xl"
    />
  ),
}

export const WithInactive = {
  render: () => (
    <TeamMembersList
      members={[
        ...members,
        {
          id: "4",
          name: "Alice Brown",
          email: "alice@example.com",
          role: "Member",
          status: "inactive" as const,
        },
      ]}
      onRemoveMember={(id) => console.log(`Remove member ${id}`)}
      onChangeMemberRole={(id, role) => console.log(`Change role for member ${id} to ${role}`)}
      onResendInvite={(id) => console.log(`Resend invite to member ${id}`)}
      className="w-full max-w-3xl"
    />
  ),
}
