import type { Meta, StoryObj } from "@storybook/react"
import { ThemeToggle } from "./theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof ThemeToggle> = {
  title: "Atoms/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="flex items-center justify-center p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {}
