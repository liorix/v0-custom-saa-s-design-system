import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  avatarUrl?: string
}

interface AvatarGroupProps {
  users: User[]
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AvatarGroup({ users, max = 3, size = "md", className }: AvatarGroupProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const visibleUsers = users.slice(0, max)
  const remainingUsers = users.length > max ? users.length - max : 0

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleUsers.map((user) => (
        <Avatar key={user.id} className={cn("ring-2 ring-background", sizes[size])}>
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingUsers > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background",
            sizes[size],
          )}
        >
          +{remainingUsers}
        </div>
      )}
    </div>
  )
}
