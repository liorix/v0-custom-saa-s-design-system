"use client"

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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

// Export components directly with component property
export const Default = {
  render: () => <Switch />,
}

export const WithLabel = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const Checked = {
  render: () => <Switch defaultChecked />,
}

export const Disabled = {
  render: () => <Switch disabled />,
}

export const DisabledChecked = {
  render: () => <Switch disabled defaultChecked />,
}

// Component that uses hooks
function ControlledSwitchDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="controlled" checked={checked} onCheckedChange={setChecked} />
        <Label htmlFor="controlled">{checked ? "Enabled" : "Disabled"}</Label>
      </div>
      <p className="text-sm text-muted-foreground">The switch is {checked ? "on" : "off"}.</p>
    </div>
  )
}

export const Controlled = {
  render: () => <ControlledSwitchDemo />,
}
