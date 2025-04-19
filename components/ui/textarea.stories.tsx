import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"
import { Label } from "./label"

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

export const Default = {
  render: () => <Textarea placeholder="Type your message here." className="w-[300px]" />,
}

export const WithLabel = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." className="w-[300px]" />
    </div>
  ),
}

export const Disabled = {
  render: () => <Textarea placeholder="Type your message here." disabled className="w-[300px]" />,
}

export const WithDefaultValue = {
  render: () => <Textarea defaultValue="This is a default value for the textarea." className="w-[300px]" />,
}
