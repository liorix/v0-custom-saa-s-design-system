"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { toast } = useToast()

    return (
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            })
          }}
        >
          Show Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Success",
              description: "Your message has been sent successfully.",
              variant: "default",
            })
          }}
        >
          Show Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              variant: "destructive",
            })
          }}
        >
          Show Destructive Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Action Required",
              description: "Please confirm your email address.",
              action: <ToastAction altText="Confirm">Confirm</ToastAction>,
            })
          }}
        >
          Show Action Toast
        </Button>
      </div>
    )
  },
}

export const SimpleToast: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <ToastTitle>Scheduled: Catch up</ToastTitle>
        <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
}

export const DestructiveToast: Story = {
  render: () => (
    <ToastProvider>
      <Toast variant="destructive">
        <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
        <ToastDescription>There was a problem with your request.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
}

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Action Required</ToastTitle>
          <ToastDescription>Please confirm your email address.</ToastDescription>
        </div>
        <ToastAction altText="Confirm">Confirm</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
}
