"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormInputField } from "@/components/molecules/form-field"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const signupSchema = loginSchema
  .extend({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type LoginFormValues = z.infer<typeof loginSchema>
type SignupFormValues = z.infer<typeof signupSchema>

interface AuthFormProps {
  type: "login" | "signup"
  onSubmit: (values: LoginFormValues | SignupFormValues) => Promise<void>
  className?: string
  isLoading?: boolean
}

export function AuthForm({ type, onSubmit, className, isLoading = false }: AuthFormProps) {
  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
    defaultValues:
      type === "login" ? { email: "", password: "" } : { name: "", email: "", password: "", confirmPassword: "" },
  })

  const handleSubmit = async (values: LoginFormValues | SignupFormValues) => {
    await onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-4", className)}>
        {type === "signup" && (
          <FormInputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter your name"
            disabled={isLoading}
          />
        )}
        <FormInputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          disabled={isLoading}
        />
        <FormInputField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          disabled={isLoading}
        />
        {type === "signup" && (
          <FormInputField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            disabled={isLoading}
          />
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </Form>
  )
}
