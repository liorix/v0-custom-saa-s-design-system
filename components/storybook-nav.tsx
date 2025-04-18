"use client"

import { Button } from "@/components/ui/button"
import { Book, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function StorybookNav() {
  const pathname = usePathname()
  const isStorybookPage = pathname.startsWith("/storybook")

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 z-50">
      {isStorybookPage ? (
        <Button asChild variant="default">
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Back to App
          </Link>
        </Button>
      ) : (
        <Button asChild variant="default">
          <Link href="/storybook">
            <Book className="mr-2 h-4 w-4" />
            Design System
          </Link>
        </Button>
      )}
    </div>
  )
}
