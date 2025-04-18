"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// Create a mapping of component paths to their stories
// Instead of importing all stories at once, we'll dynamically import them when needed
const storyMap = {
  ui: [
    "accordion",
    "alert",
    "alert-dialog",
    "avatar",
    "badge",
    "button",
    "calendar",
    "card",
    "checkbox",
    "command",
    "dialog",
    "dropdown-menu",
    "hover-card",
    "input",
    "label",
    "popover",
    "select",
    "separator",
    "sheet",
    "skeleton",
    "slider",
    "switch",
    "tabs",
    "textarea",
    "toast",
    "collapsible",
    "context-menu",
  ],
  atoms: ["logo", "empty-state", "avatar-group", "page-header"],
  molecules: ["stat-card", "notification-item", "feature-card", "form-field"],
  organisms: ["organization-switcher", "data-table", "billing-plan-card", "team-members-list", "auth-form"],
  templates: ["auth-layout", "dashboard-layout"],
}

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState<React.ReactNode | null>(null)
  const [storyTitle, setStoryTitle] = useState("")
  const [storyVariant, setStoryVariant] = useState("")
  const [availableVariants, setAvailableVariants] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStory() {
      if (!params?.path || !Array.isArray(params.path) || params.path.length < 2) {
        setIsLoading(false)
        return
      }

      const [category, component, variant = "Default"] = params.path

      // Check if the category and component exist in our map
      if (
        !storyMap[category as keyof typeof storyMap] ||
        !storyMap[category as keyof typeof storyMap].includes(component)
      ) {
        setStory(<div>Story not found</div>)
        setIsLoading(false)
        return
      }

      try {
        // Dynamically import the story file
        const storyModule = await import(`@/stories/${category}/${component}.stories`)

        // Get all available story variants
        const variants = Object.keys(storyModule).filter(
          (key) => key !== "default" && typeof storyModule[key] === "object",
        )

        setAvailableVariants(variants)

        // Set the current story variant
        const selectedVariant = variant || "Default"
        setStoryVariant(selectedVariant)

        // Set the story title
        setStoryTitle(`${category}/${component}`)

        // Render the selected story
        if (storyModule[selectedVariant]?.render) {
          const StoryComponent = storyModule[selectedVariant].render(storyModule[selectedVariant].args || {})
          setStory(StoryComponent)
        } else {
          setStory(<div>Variant not found</div>)
        }
      } catch (error) {
        console.error("Error loading story:", error)
        setStory(<div>Error loading story</div>)
      }

      setIsLoading(false)
    }

    setIsLoading(true)
    loadStory()
  }, [params])

  const goBack = () => {
    router.push("/storybook")
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Button variant="ghost" onClick={goBack} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Components
      </Button>

      <h1 className="text-2xl font-bold mb-4">{storyTitle}</h1>
      {availableVariants.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Variants:</h2>
          <div className="flex flex-wrap gap-2">
            {availableVariants.map((variant) => (
              <Link
                key={variant}
                href={`/storybook/${storyTitle}/${variant}`}
                className={`px-3 py-1 rounded-md text-sm ${
                  storyVariant === variant
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {variant}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="p-4 border rounded-lg bg-background">{story}</div>
    </div>
  )
}
