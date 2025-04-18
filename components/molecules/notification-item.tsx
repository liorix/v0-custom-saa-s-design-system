"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { X } from "lucide-react"

interface NotificationItemProps {
  id: string
  title: string
  description?: string
  time: Date
  read?: boolean
  user?: {
    name: string
    avatarUrl?: string
  }
  onDismiss?: (id: string) => void
  className?: string
}

export function NotificationItem({
  id,
  title,
  description,
  time,
  read = false,
  user,
  onDismiss,
  className,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-4 rounded-lg p-4 transition-colors",
        !read && "bg-muted/50",
        className,
      )}
    >
      {user && (
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium leading-none">{title}</p>
          {!read && <span className="h-2 w-2 rounded-full bg-primary" />}
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <p className="text-xs text-muted-foreground">{formatDistanceToNow(time, { addSuffix: true })}</p>
      </div>
      {onDismiss && (
        <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6" onClick={() => onDismiss(id)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  )
}
