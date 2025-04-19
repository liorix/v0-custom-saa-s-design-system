import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ContentWrapperProps {
  children: ReactNode
  className?: string
}

export function ContentWrapper({ children, className }: ContentWrapperProps) {
  return <div className={cn("container mx-auto px-6 py-6", className)}>{children}</div>
}
