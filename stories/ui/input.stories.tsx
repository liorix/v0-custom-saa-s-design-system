import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@/components/ui/input"

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

export const Default: Story = {
  args: {
    placeholder: "Email",
    className: "w-[300px]",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    className: "w-[300px]",
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-[300px]">
      <Input placeholder="Search..." />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  ),
}

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="file" className="text-sm font-medium">
        Upload file
      </label>
      <Input id="file" type="file" />
    </div>
  ),
}
