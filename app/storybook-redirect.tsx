"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function StorybookRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/storybook")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Redirecting to Storybook...</p>
    </div>
  )
}
