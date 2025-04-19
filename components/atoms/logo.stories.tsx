import type { Meta, StoryObj } from "@storybook/react"
import { Logo } from "./logo"
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

export const Default = {
  render: () => <Logo icon={Home} text="Acme SaaS" />,
}

export const Small = {
  render: () => <Logo icon={Zap} size="sm" text="Acme SaaS" />,
}

export const Medium = {
  render: () => <Logo icon={Building} size="md" text="Acme SaaS" />,
}

export const Large = {
  render: () => <Logo icon={Rocket} size="lg" text="Acme SaaS" />,
}

export const IconOnly = {
  render: () => <Logo icon={Home} showText={false} />,
}
