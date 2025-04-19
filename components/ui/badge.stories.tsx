import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default = {
  render: () => <Badge>Badge</Badge>,
}

export const Secondary = {
  render: () => <Badge variant="secondary">Secondary</Badge>,
}

export const Destructive = {
  render: () => <Badge variant="destructive">Destructive</Badge>,
}

export const Outline = {
  render: () => <Badge variant="outline">Outline</Badge>,
}

export const WithDot = {
  render: () => (
    <Badge>
      <span className="mr-1 h-2 w-2 rounded-full bg-primary-foreground" />
      New
    </Badge>
  ),
}
