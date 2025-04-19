"use client"

import { Button } from "@/components/ui/button"
import { Book, Home } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function StorybookNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isStorybookPage = pathname.startsWith("/storybook")

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isStorybookPage ? (
        <Button
          variant="default"
          className="bg-black hover:bg-black/90 text-white border-0"
          onClick={() => router.push("/dashboard")}
        >
          <Home className="mr-2 h-4 w-4 text-white" />
          Back to App
        </Button>
      ) : (
        <Button
          variant="default"
          className="bg-black hover:bg-black/90 text-white border-0"
          onClick={() => router.push("/storybook")}
        >
          <Book className="mr-2 h-4 w-4 text-white" />
          Design System
        </Button>
      )}
    </div>
  )
}
