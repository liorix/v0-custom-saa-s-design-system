"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
  },
}

export const DateRange: Story = {
  render: () => {
    const [date, setDate] = useState<{
      from: Date | undefined
      to: Date | undefined
    }>({
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    })
    return <Calendar mode="range" selected={date} onSelect={setDate} className="rounded-md border" />
  },
}

export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 2)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
    ])
    return <Calendar mode="multiple" selected={dates} onSelect={setDates} className="rounded-md border" />
  },
}
