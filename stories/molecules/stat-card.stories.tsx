import type { Meta, StoryObj } from "@storybook/react"
import { StatCard } from "@/components/molecules/stat-card"
import { DollarSign, Users, ArrowUpRight, TrendingDown } from "lucide-react"

const meta: Meta<typeof StatCard> = {
  title: "Molecules/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Default = {
  render: () => <StatCard title="Total Revenue" value="$45,231.89" className="w-[300px]" />,
}

export const WithIcon = {
  render: () => <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} className="w-[300px]" />,
}

export const WithDescription = {
  render: () => (
    <StatCard
      title="Active Users"
      value="2,350"
      description="Active users in the last 30 days"
      icon={Users}
      className="w-[300px]"
    />
  ),
}

export const WithPositiveTrend = {
  render: () => (
    <StatCard
      title="Conversion Rate"
      value="3.2%"
      description="from last month"
      icon={ArrowUpRight}
      trend={{ value: 0.8, isPositive: true }}
      className="w-[300px]"
    />
  ),
}

export const WithNegativeTrend = {
  render: () => (
    <StatCard
      title="Churn Rate"
      value="1.5%"
      description="from last month"
      icon={TrendingDown}
      trend={{ value: 0.3, isPositive: false }}
      className="w-[300px]"
    />
  ),
}
