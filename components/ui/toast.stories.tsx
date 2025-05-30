"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast"
import { Button } from "./button"
import { useToast } from "@/hooks/use-toast"

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

function DefaultToast() {
  return (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Description</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

function ToastWithAction() {
  return (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Description</ToastDescription>
        </div>
        <ToastAction altText="Try again">Try again</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

function DestructiveToast() {
  return (
    <ToastProvider>
      <Toast variant="destructive">
        <div className="grid gap-1">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong.</ToastDescription>
        </div>
        <ToastAction altText="Try again">Try again</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

function ToastDemo() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export const Default = {
  render: () => <DefaultToast />,
}

export const WithAction = {
  render: () => <ToastWithAction />,
}

export const Destructive = {
  render: () => <DestructiveToast />,
}

export const UseToastHook = {
  render: () => <ToastDemo />,
}
