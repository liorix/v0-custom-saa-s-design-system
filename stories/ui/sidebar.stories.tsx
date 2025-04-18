"use client"

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Sidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Home, Settings, Users, HelpCircle } from "lucide-react"

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    open: true,
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground">Main</div>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground">Support</div>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Documentation
            </Button>
          </div>
        </div>
      </div>
    ),
  },
}

export const Closed: Story = {
  args: {
    ...Default.args,
    open: false,
  },
}

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div>
        <Button onClick={() => setOpen(!open)} className="mb-4 ml-4 mt-4">
          Toggle Sidebar
        </Button>
        <Sidebar open={open} onOpenChange={setOpen}>
          {Default.args.children}
        </Sidebar>
      </div>
    )
  },
}
