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

// Create a mapping of dynamic imports for each story
const storyImports = {
  ui: {
    accordion: () => import("../../../stories/ui/accordion.stories.tsx"),
    alert: () => import("../../../stories/ui/alert.stories.tsx"),
    "alert-dialog": () => import("../../../stories/ui/alert-dialog.stories.tsx"),
    avatar: () => import("../../../stories/ui/avatar.stories.tsx"),
    badge: () => import("../../../stories/ui/badge.stories.tsx"),
    button: () => import("../../../stories/ui/button.stories.tsx"),
    calendar: () => import("../../../stories/ui/calendar.stories.tsx"),
    card: () => import("../../../stories/ui/card.stories.tsx"),
    checkbox: () => import("../../../stories/ui/checkbox.stories.tsx"),
    command: () => import("../../../stories/ui/command.stories.tsx"),
    dialog: () => import("../../../stories/ui/dialog.stories.tsx"),
    "dropdown-menu": () => import("../../../stories/ui/dropdown-menu.stories.tsx"),
    "hover-card": () => import("../../../stories/ui/hover-card.stories.tsx"),
    input: () => import("../../../stories/ui/input.stories.tsx"),
    label: () => import("../../../stories/ui/label.stories.tsx"),
    popover: () => import("../../../stories/ui/popover.stories.tsx"),
    select: () => import("../../../stories/ui/select.stories.tsx"),
    separator: () => import("../../../stories/ui/separator.stories.tsx"),
    sheet: () => import("../../../stories/ui/sheet.stories.tsx"),
    skeleton: () => import("../../../stories/ui/skeleton.stories.tsx"),
    slider: () => import("../../../stories/ui/slider.stories.tsx"),
    switch: () => import("../../../stories/ui/switch.stories.tsx"),
    tabs: () => import("../../../stories/ui/tabs.stories.tsx"),
    textarea: () => import("../../../stories/ui/textarea.stories.tsx"),
    toast: () => import("../../../stories/ui/toast.stories.tsx"),
    collapsible: () => import("../../../stories/ui/collapsible.stories.tsx"),
    "context-menu": () => import("../../../stories/ui/context-menu.stories.tsx"),
  },
  atoms: {
    logo: () => import("../../../stories/atoms/logo.stories.tsx"),
    "empty-state": () => import("../../../stories/atoms/empty-state.stories.tsx"),
    "avatar-group": () => import("../../../stories/atoms/avatar-group.stories.tsx"),
    "page-header": () => import("../../../stories/atoms/page-header.stories.tsx"),
  },
  molecules: {
    "stat-card": () => import("../../../stories/molecules/stat-card.stories.tsx"),
    "notification-item": () => import("../../../stories/molecules/notification-item.stories.tsx"),
    "feature-card": () => import("../../../stories/molecules/feature-card.stories.tsx"),
    "form-field": () => import("../../../stories/molecules/form-field.stories.tsx"),
  },
  organisms: {
    "organization-switcher": () => import("../../../stories/organisms/organization-switcher.stories.tsx"),
    "data-table": () => import("../../../stories/organisms/data-table.stories.tsx"),
    "billing-plan-card": () => import("../../../stories/organisms/billing-plan-card.stories.tsx"),
    "team-members-list": () => import("../../../stories/organisms/team-members-list.stories.tsx"),
    "auth-form": () => import("../../../stories/organisms/auth-form.stories.tsx"),
  },
  templates: {
    "auth-layout": () => import("../../../stories/templates/auth-layout.stories.tsx"),
    "dashboard-layout": () => import("../../../stories/templates/dashboard-layout.stories.tsx"),
  },
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
        // Use the explicit import function from our mapping
        const importFn = storyImports[category as keyof typeof storyImports]?.[component as any]

        if (!importFn) {
          throw new Error(`Import function not found for ${category}/${component}`)
        }

        const storyModule = await importFn()

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
        setStory(<div>Error loading story: {error instanceof Error ? error.message : String(error)}</div>)
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
