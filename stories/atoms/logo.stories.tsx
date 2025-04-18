import type { Meta, StoryObj } from "@storybook/react"
import { Logo } from "@/components/atoms/logo"
import { Home, Zap, Building, Rocket } from "lucide-react"

const meta: Meta<typeof Logo> = {
  title: "Atoms/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showText: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {
    icon: Home,
    text: "Acme SaaS",
  },
}

export const Small: Story = {
  args: {
    icon: Zap,
    size: "sm",
    text: "Acme SaaS",
  },
}

export const Medium: Story = {
  args: {
    icon: Building,
    size: "md",
    text: "Acme SaaS",
  },
}

export const Large: Story = {
  args: {
    icon: Rocket,
    size: "lg",
    text: "Acme SaaS",
  },
}

export const IconOnly: Story = {
  args: {
    icon: Home,
    showText: false,
  },
}
