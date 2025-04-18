import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "@/components/ui/badge"

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

// Change from args to render pattern for consistency
export const Default: Story = {
  render: () => <Badge>Badge</Badge>,
}

export const Secondary: Story = {
  render: () => <Badge variant="secondary">Secondary</Badge>,
}

export const Destructive: Story = {
  render: () => <Badge variant="destructive">Destructive</Badge>,
}

export const Outline: Story = {
  render: () => <Badge variant="outline">Outline</Badge>,
}

export const WithDot: Story = {
  render: () => (
    <Badge>
      <span className="mr-1 h-2 w-2 rounded-full bg-primary-foreground" />
      New
    </Badge>
  ),
}
