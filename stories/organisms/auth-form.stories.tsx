import type { Meta, StoryObj } from "@storybook/react"
import { AuthForm } from "@/components/organisms/auth-form"

const meta: Meta<typeof AuthForm> = {
  title: "Organisms/AuthForm",
  component: AuthForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AuthForm>

export const Login: Story = {
  args: {
    type: "login",
    onSubmit: async (values) => {
      console.log("Login values:", values)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
    className: "w-[350px]",
  },
}

export const Signup: Story = {
  args: {
    type: "signup",
    onSubmit: async (values) => {
      console.log("Signup values:", values)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
    className: "w-[350px]",
  },
}
