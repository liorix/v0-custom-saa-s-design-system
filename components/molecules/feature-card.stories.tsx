import type { Meta, StoryObj } from "@storybook/react"
import { FeatureCard } from "./feature-card"
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

export const Default = {
  render: () => (
    <FeatureCard
      title="Lightning Fast"
      description="Our platform is optimized for speed and performance."
      icon={Zap}
      className="w-[300px]"
    />
  ),
}

export const Security = {
  render: () => (
    <FeatureCard
      title="Enterprise Security"
      description="Bank-level security with end-to-end encryption and two-factor authentication."
      icon={Shield}
      className="w-[300px]"
    />
  ),
}

export const Analytics = {
  render: () => (
    <FeatureCard
      title="Advanced Analytics"
      description="Gain insights with our powerful analytics and reporting tools."
      icon={BarChart}
      className="w-[300px]"
    />
  ),
}

export const Global = {
  render: () => (
    <FeatureCard
      title="Global CDN"
      description="Content delivery network spanning multiple regions for fast access worldwide."
      icon={Globe}
      className="w-[300px]"
    />
  ),
}
