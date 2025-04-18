import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "@/components/ui/slider"

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => <Slider defaultValue={[33]} max={100} step={1} className="w-[300px]" />,
}

export const Range: Story = {
  render: () => <Slider defaultValue={[25, 75]} max={100} step={1} className="w-[300px]" />,
}

export const Disabled: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} disabled className="w-[300px]" />,
}

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-6 w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} />
      <div className="flex justify-between">
        <span className="text-xs">0%</span>
        <span className="text-xs">50%</span>
        <span className="text-xs">100%</span>
      </div>
    </div>
  ),
}
