"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import * as RadixTabs from "@radix-ui/react-tabs"

const Card = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
        {children}
      </div>
    )
  },
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
        {children}
      </div>
    )
  },
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
        {children}
      </p>
    )
  },
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
        {children}
      </p>
    )
  },
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
        {children}
      </div>
    )
  },
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props}>
        {children}
      </div>
    )
  },
)
CardFooter.displayName = "CardFooter"

const Tabs = RadixTabs.Root
const TabsList = RadixTabs.List
const TabsTrigger = RadixTabs.Trigger
const TabsContent = RadixTabs.Content

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
}
