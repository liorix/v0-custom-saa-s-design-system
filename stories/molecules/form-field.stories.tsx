"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { FormInputField } from "@/components/molecules/form-field"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

// Define a schema for our form
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const meta: Meta<typeof FormInputField> = {
  title: "Molecules/FormInputField",
  component: FormInputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FormInputField>

// Create standalone story components that include their own form context
const DefaultExample = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4">
        <FormInputField control={form.control} name="username" label="Username" placeholder="Enter your username" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const WithDescriptionExample = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4">
        <FormInputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          description="We'll never share your email with anyone else."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const PasswordExample = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4">
        <FormInputField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const DisabledExample = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "johndoe",
    },
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4">
        <FormInputField
          control={form.control}
          name="username"
          label="Username"
          placeholder="Enter your username"
          disabled={true}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Default = {
  render: () => <DefaultExample />,
}

export const WithDescription = {
  render: () => <WithDescriptionExample />,
}

export const Password = {
  render: () => <PasswordExample />,
}

export const Disabled = {
  render: () => <DisabledExample />,
}
