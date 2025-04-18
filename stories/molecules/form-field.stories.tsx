"use client"

import type React from "react"

import type { Meta, StoryObj } from "@storybook/react"
import { FormInputField } from "@/components/molecules/form-field"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        {children}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const meta: Meta<typeof FormInputField> = {
  title: "Molecules/FormInputField",
  component: FormInputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormInputField>

export const Default: Story = {
  args: {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
  },
  render: (args) => {
    // Use useForm inside the render function to ensure it's properly initialized
    const form = useForm({
      defaultValues: {
        username: "",
      },
    })
    return <FormInputField control={form.control} {...args} />
  },
}

export const WithDescription: Story = {
  args: {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    description: "We'll never share your email with anyone else.",
  },
  render: (args) => {
    const form = useForm({
      defaultValues: {
        email: "",
      },
    })
    return <FormInputField control={form.control} {...args} />
  },
}

export const Password: Story = {
  args: {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  render: (args) => {
    const form = useForm({
      defaultValues: {
        password: "",
      },
    })
    return <FormInputField control={form.control} {...args} />
  },
}

export const Disabled: Story = {
  args: {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    disabled: true,
  },
  render: (args) => {
    const form = useForm({
      defaultValues: {
        username: "johndoe",
      },
    })
    return <FormInputField control={form.control} {...args} />
  },
}
