import type { Meta, StoryObj } from "@storybook/react"
import { AvatarGroup } from "@/components/atoms/avatar-group"

const meta: Meta<typeof AvatarGroup> = {
  title: "Atoms/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    max: {
      control: { type: "number", min: 1, max: 10 },
    },
  },
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

const users = [
  { id: "1", name: "John Doe", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Jane Smith", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Bob Johnson", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Alice Brown", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Charlie Davis", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "6", name: "Eva Wilson", avatarUrl: "/placeholder.svg?height=40&width=40" },
]

export const Default: Story = {
  args: {
    users: users.slice(0, 3),
  },
}

export const Small: Story = {
  args: {
    users: users.slice(0, 3),
    size: "sm",
  },
}

export const Medium: Story = {
  args: {
    users: users.slice(0, 3),
    size: "md",
  },
}

export const Large: Story = {
  args: {
    users: users.slice(0, 3),
    size: "lg",
  },
}

export const WithOverflow: Story = {
  args: {
    users,
    max: 3,
  },
}

export const NoLimit: Story = {
  args: {
    users,
    max: 10,
  },
}
