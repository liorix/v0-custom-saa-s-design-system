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

// Simple components that don't use hooks
function DefaultSwitch() {
  return <Switch />
}

function SwitchWithLabel() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

function CheckedSwitch() {
  return <Switch defaultChecked />
}

function DisabledSwitch() {
  return <Switch disabled />
}

function DisabledCheckedSwitch() {
  return <Switch disabled defaultChecked />
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

// Export components directly
export const Default = {
  component: DefaultSwitch,
}

export const WithLabel = {
  component: SwitchWithLabel,
}

export const Checked = {
  component: CheckedSwitch,
}

export const Disabled = {
  component: DisabledSwitch,
}

export const DisabledChecked = {
  component: DisabledCheckedSwitch,
}

export const Controlled = {
  component: ControlledSwitchDemo,
}
