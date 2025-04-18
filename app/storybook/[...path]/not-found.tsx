"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Component Not Found</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-3 text-xl font-semibold">Component Not Found</h2>
          <p className="mb-8 max-w-md text-center text-muted-foreground">
            The component or story you're looking for doesn't exist or hasn't been implemented yet.
          </p>
          <Button asChild>
            <Link href="/storybook">Return to Design System</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
