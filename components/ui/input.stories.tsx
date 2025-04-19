import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"
import { Search } from "lucide-react"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default = {
  render: () => <Input placeholder="Email" className="w-[300px]" />,
}

export const WithLabel = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const Disabled = {
  render: () => <Input placeholder="Disabled" disabled className="w-[300px]" />,
}

export const WithIcon = {
  render: () => (
    <div className="relative w-[300px]">
      <Input placeholder="Search..." />
      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  ),
}

export const File = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="file" className="text-sm font-medium">
        Upload file
      </label>
      <Input id="file" type="file" />
    </div>
  ),
}
