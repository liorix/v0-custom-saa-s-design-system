import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ContentContainerProps {
  children: ReactNode
  className?: string
  size?: "default" | "narrow" | "wide"
}

export function ContentContainer({ children, className, size = "default" }: ContentContainerProps) {
  return (
    <div className="container py-8">
      <div
        className={cn(
          "mx-auto w-full",
          size === "narrow" && "max-w-3xl",
          size === "default" && "max-w-6xl",
          size === "wide" && "max-w-7xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
