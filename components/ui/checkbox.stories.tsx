import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"
import { Label } from "./label"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => <Checkbox />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
}

export const Disabled: Story = {
  render: () => <Checkbox disabled />,
}

export const DisabledChecked: Story = {
  render: () => <Checkbox disabled defaultChecked />,
}
