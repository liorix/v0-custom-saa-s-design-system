import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default = {
  render: () => <Label>Label</Label>,
}

export const WithInput = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const Required = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">
        Email <span className="text-red-500">*</span>
      </Label>
      <Input type="email" id="email" placeholder="Email" required />
    </div>
  ),
}
