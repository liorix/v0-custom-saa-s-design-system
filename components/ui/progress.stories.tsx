"use client"

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Progress>

function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}

export const Default: Story = {
  render: () => <Progress value={33} className="w-[60%]" />,
}

export const Animated: Story = {
  render: () => <ProgressDemo />,
}

export const Indeterminate: Story = {
  render: () => <Progress className="w-[60%]" />,
}
