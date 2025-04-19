import type React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-6 py-4">
        <div
          className={cn(
            "flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0",
            className,
          )}
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {children && <div className="flex items-center gap-2">{children}</div>}
        </div>
      </div>
    </div>
  )
}
