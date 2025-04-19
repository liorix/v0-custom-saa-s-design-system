"use client"

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "./calendar"

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

function DefaultCalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
}

function DateRangeCalendarDemo() {
  const [date, setDate] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })
  return <Calendar mode="range" selected={date} onSelect={setDate} className="rounded-md border" />
}

function MultipleCalendarDemo() {
  const [dates, setDates] = React.useState<Date[] | undefined>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ])
  return <Calendar mode="multiple" selected={dates} onSelect={setDates} className="rounded-md border" />
}

export const Default = {
  render: () => <DefaultCalendarDemo />,
}

export const DateRange = {
  render: () => <DateRangeCalendarDemo />,
}

export const Multiple = {
  render: () => <MultipleCalendarDemo />,
}
