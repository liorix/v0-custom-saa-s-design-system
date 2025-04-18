import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface LogoProps {
  icon: LucideIcon
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
  text?: string
}

export function Logo({ icon: Icon, className, size = "md", showText = true, text = "Acme SaaS" }: LogoProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="rounded-md bg-primary p-1">
        <Icon className={cn("text-primary-foreground", sizes[size])} />
      </div>
      {showText && <span className={cn("font-bold tracking-tight", textSizes[size])}>{text}</span>}
    </div>
  )
}
