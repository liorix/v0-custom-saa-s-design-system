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

export const Default: Story = {
  args: {
    children: "Badge",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const WithDot: Story = {
  render: () => (
    <Badge>
      <span className="mr-1 h-2 w-2 rounded-full bg-primary-foreground" />
      New
    </Badge>
  ),
}
