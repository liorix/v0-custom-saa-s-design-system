import type { Meta, StoryObj } from "@storybook/react"
import { SidebarThemeSwitcher } from "./sidebar-theme-switcher"
import { ThemeProvider } from "@/components/theme-provider"

const meta: Meta<typeof SidebarThemeSwitcher> = {
  title: "Atoms/SidebarThemeSwitcher",
  component: SidebarThemeSwitcher,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" defaultColor="zinc">
        <div className="p-4 bg-background rounded-md">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SidebarThemeSwitcher>

export const Default: Story = {}
