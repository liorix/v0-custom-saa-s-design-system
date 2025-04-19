import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ContentContainerProps {
  children: ReactNode
  className?: string
}

export function ContentContainer({ children, className }: ContentContainerProps) {
  return <div className={cn("w-full flex-1", className)}>{children}</div>
}
