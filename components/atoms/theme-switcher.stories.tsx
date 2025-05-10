import type { Meta, StoryObj } from "@storybook/react"
import { ThemeSwitcher } from "./theme-switcher"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Atoms/ThemeSwitcher",
  component: ThemeSwitcher,
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
type Story = StoryObj<typeof ThemeSwitcher>

export const Default: Story = {}
