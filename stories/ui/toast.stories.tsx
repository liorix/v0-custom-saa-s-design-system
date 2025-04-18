"use client"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
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

export const Default: Story = {
  render: (args) => (
    <ToastProvider>
      <Toast {...args}>
        <div className="grid gap-1">
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Description</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
  args: {
    variant: "default",
  },
}

export const WithAction: Story = {
  render: (args) => (
    <ToastProvider>
      <Toast {...args}>
        <div className="grid gap-1">
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Description</ToastDescription>
        </div>
        <ToastAction altText="Try again">Try again</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
  args: {
    variant: "default",
  },
}

export const Destructive: Story = {
  render: (args) => (
    <ToastProvider>
      <Toast {...args}>
        <div className="grid gap-1">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong.</ToastDescription>
        </div>
        <ToastAction altText="Try again">Try again</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
  args: {
    variant: "destructive",
  },
}

// Create a proper React component for the toast demo
const ToastDemo = () => {
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

export const UseToastHook: Story = {
  render: () => <ToastDemo />,
}
