import type { Meta, StoryObj } from "@storybook/react"
import { BillingPlanCard } from "@/components/organisms/billing-plan-card"

const meta: Meta<typeof BillingPlanCard> = {
  title: "Organisms/BillingPlanCard",
  component: BillingPlanCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof BillingPlanCard>

const features = [
  { name: "5 team members", included: true },
  { name: "20GB storage", included: true },
  { name: "Basic analytics", included: true },
  { name: "Priority support", included: false },
  { name: "Custom branding", included: false },
]

export const Default: Story = {
  args: {
    name: "Starter",
    description: "For individuals and small teams",
    price: {
      monthly: 9,
      annually: true,
    },
    features,
    onSelect: () => console.log("Plan selected"),
    className: "w-[300px]",
  },
}

export const Popular: Story = {
  args: {
    name: "Pro",
    description: "For growing teams and businesses",
    price: {
      monthly: 29,
      annually: true,
    },
    features: [
      { name: "10 team members", included: true },
      { name: "50GB storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom branding", included: false },
    ],
    popular: true,
    onSelect: () => console.log("Plan selected"),
    className: "w-[300px]",
  },
}

export const Current: Story = {
  args: {
    name: "Pro",
    description: "For growing teams and businesses",
    price: {
      monthly: 29,
      annually: true,
    },
    features: [
      { name: "10 team members", included: true },
      { name: "50GB storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom branding", included: false },
    ],
    current: true,
    onSelect: () => console.log("Plan selected"),
    className: "w-[300px]",
  },
}

export const Enterprise: Story = {
  args: {
    name: "Enterprise",
    description: "For large organizations",
    price: {
      monthly: 99,
      annually: true,
    },
    features: [
      { name: "Unlimited team members", included: true },
      { name: "250GB storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom branding", included: true },
    ],
    onSelect: () => console.log("Plan selected"),
    className: "w-[300px]",
  },
}
