import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ContentContainerProps {
  children: ReactNode
  className?: string
}

export function ContentContainer({ children, className }: ContentContainerProps) {
  return (
    <div className="container py-8">
      <div className={cn("mx-auto w-full max-w-5xl", className)}>{children}</div>
    </div>
  )
}
