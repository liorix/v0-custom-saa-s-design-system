import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
    className: "w-[300px]",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." className="w-[300px]" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: "Type your message here.",
    disabled: true,
    className: "w-[300px]",
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "This is a default value for the textarea.",
    className: "w-[300px]",
  },
}
