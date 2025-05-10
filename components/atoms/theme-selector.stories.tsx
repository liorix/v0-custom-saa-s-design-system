import type { Meta, StoryObj } from "@storybook/react"
import { ThemeSelector } from "./theme-selector"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof ThemeSelector> = {
  title: "Atoms/ThemeSelector",
  component: ThemeSelector,
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
type Story = StoryObj<typeof ThemeSelector>

export const Default: Story = {}
