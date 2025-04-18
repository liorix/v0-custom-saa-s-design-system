"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface BillingPlanFeature {
  name: string
  included: boolean
}

interface BillingPlanProps {
  name: string
  description: string
  price: {
    monthly: number
    annually: boolean
  }
  features: BillingPlanFeature[]
  popular?: boolean
  current?: boolean
  onSelect: () => void
  className?: string
}

export function BillingPlanCard({
  name,
  description,
  price,
  features,
  popular = false,
  current = false,
  onSelect,
  className,
}: BillingPlanProps) {
  return (
    <Card className={cn("flex flex-col", popular && "border-primary shadow-md", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          {popular && <Badge>Popular</Badge>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${price.monthly}</span>
            <span className="ml-1 text-muted-foreground">/month</span>
          </div>
          {price.annually && <p className="text-xs text-muted-foreground">Billed annually (save 20%)</p>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className={cn("mr-2 h-4 w-4", feature.included ? "text-primary" : "text-muted-foreground opacity-50")}
              />
              <span className={cn("text-sm", !feature.included && "text-muted-foreground line-through")}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={popular ? "default" : "outline"} className="w-full" disabled={current} onClick={onSelect}>
          {current ? "Current Plan" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  )
}
