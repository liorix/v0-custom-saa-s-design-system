"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => <Switch />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => <Switch defaultChecked />,
}

export const Disabled: Story = {
  render: () => <Switch disabled />,
}

export const DisabledChecked: Story = {
  render: () => <Switch disabled defaultChecked />,
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="controlled" checked={checked} onCheckedChange={setChecked} />
          <Label htmlFor="controlled">{checked ? "Enabled" : "Disabled"}</Label>
        </div>
        <p className="text-sm text-muted-foreground">The switch is {checked ? "on" : "off"}.</p>
      </div>
    )
  },
}
