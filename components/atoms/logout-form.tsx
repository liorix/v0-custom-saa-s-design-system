"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useState } from "react"

interface LogoutFormProps extends Omit<ButtonProps, "type"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
}

export function LogoutForm({
  variant = "ghost",
  size = "default",
  showIcon = true,
  className,
  children,
  ...props
}: LogoutFormProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  return (
    <form action="/api/auth/logout" method="post" onSubmit={() => setIsLoggingOut(true)}>
      <Button
        type="submit"
        variant={variant}
        size={size}
        disabled={isLoggingOut}
        className={className}
        data-testid="form-logout-button"
        {...props}
      >
        {showIcon && <LogOut className="mr-2 h-4 w-4" />}
        {children || (isLoggingOut ? "Signing out..." : "Sign out")}
      </Button>
    </form>
  )
}
