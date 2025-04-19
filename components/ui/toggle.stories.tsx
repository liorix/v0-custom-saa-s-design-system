import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"
import { Bold, Italic, Underline } from "lucide-react"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => <Toggle>Toggle</Toggle>,
}

export const Outline: Story = {
  render: () => <Toggle variant="outline">Toggle</Toggle>,
}

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

export const TextFormatting: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <Toggle size="sm">
      <Bold className="h-3 w-3" />
      <span className="ml-1">Bold</span>
    </Toggle>
  ),
}

export const Large: Story = {
  render: () => (
    <Toggle size="lg">
      <Bold className="h-5 w-5" />
      <span className="ml-1">Bold</span>
    </Toggle>
  ),
}

export const Disabled: Story = {
  render: () => <Toggle disabled>Toggle</Toggle>,
}
