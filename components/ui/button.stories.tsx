import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Mail } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    asChild: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: () => <Button>Button</Button>,
}

export const Destructive: Story = {
  render: () => <Button variant="destructive">Delete</Button>,
}

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
}

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
}

export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
}

export const Link: Story = {
  render: () => <Button variant="link">Link</Button>,
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <Mail className="mr-2 h-4 w-4" /> Login with Email
    </Button>
  ),
}

export const IconButton: Story = {
  render: () => (
    <Button size="icon" aria-label="Send email">
      <Mail className="h-4 w-4" />
    </Button>
  ),
}

export const Loading: Story = {
  render: () => <Button disabled>Loading...</Button>,
}
