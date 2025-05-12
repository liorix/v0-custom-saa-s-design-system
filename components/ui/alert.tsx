"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"

const Alert = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative w-full rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground [&>[@data-state=open]]:animate-in [&>[@data-state=closed]]:animate-out [&>[@data-state=closed]]:fade-out-0 [&>[@data-state=open]]:fade-in-0 [&>[@data-state=closed]]:zoom-out-95 [&>[@data-state=open]]:zoom-in-95",
      className,
    )}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("mb-1 font-semibold leading-tight tracking-tight", className)} {...props} />
))
AlertTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
))
AlertDescription.displayName = AlertDialogPrimitive.Description.displayName

export { Alert, AlertTitle, AlertDescription }
