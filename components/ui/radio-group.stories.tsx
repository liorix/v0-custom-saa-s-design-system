import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="default">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <div className="grid gap-1.5">
          <Label htmlFor="r1">Default</Label>
          <p className="text-sm text-muted-foreground">Use system settings</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <div className="grid gap-1.5">
          <Label htmlFor="r2">Comfortable</Label>
          <p className="text-sm text-muted-foreground">More space between items</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <div className="grid gap-1.5">
          <Label htmlFor="r3">Compact</Label>
          <p className="text-sm text-muted-foreground">Less space between items</p>
        </div>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one-disabled" />
        <Label htmlFor="option-one-disabled">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two-disabled" disabled />
        <Label htmlFor="option-two-disabled" className="text-muted-foreground">
          Option Two (Disabled)
        </Label>
      </div>
    </RadioGroup>
  ),
}
