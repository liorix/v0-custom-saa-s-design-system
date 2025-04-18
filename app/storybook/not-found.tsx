"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="p-6">
      <Button variant="ghost" onClick={() => router.push("/storybook")} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Components
      </Button>

      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-3xl font-bold mb-4">Component Not Found</h1>
        <p className="text-muted-foreground mb-8">The component or story you're looking for doesn't exist.</p>
        <Button onClick={() => router.push("/storybook")}>Return to Component Library</Button>
      </div>
    </div>
  )
}
