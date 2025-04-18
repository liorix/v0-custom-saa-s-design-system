import type React from "react"
import { Logo } from "@/components/atoms/logo"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  icon: LucideIcon
  footer?: React.ReactNode
  className?: string
}

export function AuthLayout({ children, title, description, icon: Icon, footer, className }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col space-y-6">
            <Logo icon={Icon} />
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            <div className={cn("flex flex-col", className)}>{children}</div>
          </div>
          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  )
}
