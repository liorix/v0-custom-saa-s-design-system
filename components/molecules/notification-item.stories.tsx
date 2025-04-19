import type { Meta, StoryObj } from "@storybook/react"
import { NotificationItem } from "./notification-item"

const meta: Meta<typeof NotificationItem> = {
  title: "Molecules/NotificationItem",
  component: NotificationItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof NotificationItem>

export const Default = {
  render: () => (
    <NotificationItem
      id="1"
      title="New feature available"
      description="Check out our new analytics dashboard"
      time={new Date(Date.now() - 1000 * 60 * 30)} // 30 minutes ago
      read={false}
      className="w-[400px]"
    />
  ),
}

export const WithUser = {
  render: () => (
    <NotificationItem
      id="2"
      title="New comment on your post"
      description="John Doe commented on your post"
      time={new Date(Date.now() - 1000 * 60 * 60 * 2)} // 2 hours ago
      read={false}
      user={{
        name: "John Doe",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      }}
      className="w-[400px]"
    />
  ),
}

export const Read = {
  render: () => (
    <NotificationItem
      id="3"
      title="Your subscription has been renewed"
      description="Your Pro plan has been renewed for another month"
      time={new Date(Date.now() - 1000 * 60 * 60 * 24)} // 1 day ago
      read={true}
      className="w-[400px]"
    />
  ),
}

export const Dismissible = {
  render: () => (
    <NotificationItem
      id="4"
      title="System maintenance scheduled"
      description="Our system will be undergoing maintenance on Saturday at 2 AM UTC"
      time={new Date(Date.now() - 1000 * 60 * 60 * 12)} // 12 hours ago
      read={false}
      onDismiss={(id) => console.log(`Dismissed notification ${id}`)}
      className="w-[400px]"
    />
  ),
}
