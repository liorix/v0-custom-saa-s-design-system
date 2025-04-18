import type { Meta, StoryObj } from "@storybook/react"
import { FeatureCard } from "@/components/molecules/feature-card"
import { Zap, Shield, BarChart, Globe } from "lucide-react"

const meta: Meta<typeof FeatureCard> = {
  title: "Molecules/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FeatureCard>

export const Default: Story = {
  args: {
    title: "Lightning Fast",
    description: "Our platform is optimized for speed and performance.",
    icon: Zap,
    className: "w-[300px]",
  },
}

export const Security: Story = {
  args: {
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and two-factor authentication.",
    icon: Shield,
    className: "w-[300px]",
  },
}

export const Analytics: Story = {
  args: {
    title: "Advanced Analytics",
    description: "Gain insights with our powerful analytics and reporting tools.",
    icon: BarChart,
    className: "w-[300px]",
  },
}

export const Global: Story = {
  args: {
    title: "Global CDN",
    description: "Content delivery network spanning multiple regions for fast access worldwide.",
    icon: Globe,
    className: "w-[300px]",
  },
}
