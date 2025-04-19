"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, notFound, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Create a mapping of component paths to their stories
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
    "command",
  ],
  atoms: ["logo", "empty-state", "avatar-group", "page-header"],
  molecules: ["stat-card", "notification-item", "feature-card", "form-field"],
  organisms: ["organization-switcher", "data-table", "billing-plan-card", "team-members-list", "auth-form"],
  templates: ["auth-layout", "dashboard-layout"],
}

// Create a mapping of dynamic imports for each story
const storyImports = {
  ui: {
    accordion: () => import("../../../stories/ui/accordion.stories"),
    alert: () => import("../../../stories/ui/alert.stories"),
    "alert-dialog": () => import("../../../stories/ui/alert-dialog.stories"),
    avatar: () => import("../../../stories/ui/avatar.stories"),
    badge: () => import("../../../stories/ui/badge.stories"),
    button: () => import("../../../stories/ui/button.stories"),
    calendar: () => import("../../../stories/ui/calendar.stories"),
    card: () => import("../../../stories/ui/card.stories"),
    checkbox: () => import("../../../stories/ui/checkbox.stories"),
    dialog: () => import("../../../stories/ui/dialog.stories"),
    "dropdown-menu": () => import("../../../stories/ui/dropdown-menu.stories"),
    "hover-card": () => import("../../../stories/ui/hover-card.stories"),
    input: () => import("../../../stories/ui/input.stories"),
    label: () => import("../../../stories/ui/label.stories"),
    popover: () => import("../../../stories/ui/popover.stories"),
    select: () => import("../../../stories/ui/select.stories"),
    separator: () => import("../../../stories/ui/separator.stories"),
    sheet: () => import("../../../stories/ui/sheet.stories"),
    skeleton: () => import("../../../stories/ui/skeleton.stories"),
    slider: () => import("../../../stories/ui/slider.stories"),
    switch: () => import("../../../stories/ui/switch.stories"),
    tabs: () => import("../../../stories/ui/tabs.stories"),
    textarea: () => import("../../../stories/ui/textarea.stories"),
    toast: () => import("../../../stories/ui/toast.stories"),
    collapsible: () => import("../../../stories/ui/collapsible.stories"),
    "context-menu": () => import("../../../stories/ui/context-menu.stories"),
    command: () => import("../../../stories/ui/command.stories"),
  },
  atoms: {
    logo: () => import("../../../stories/atoms/logo.stories"),
    "empty-state": () => import("../../../stories/atoms/empty-state.stories"),
    "avatar-group": () => import("../../../stories/atoms/avatar-group.stories"),
    "page-header": () => import("../../../stories/atoms/page-header.stories"),
  },
  molecules: {
    "stat-card": () => import("../../../stories/molecules/stat-card.stories"),
    "notification-item": () => import("../../../stories/molecules/notification-item.stories"),
    "feature-card": () => import("../../../stories/molecules/feature-card.stories"),
    "form-field": () => import("../../../stories/molecules/form-field.stories"),
  },
  organisms: {
    "organization-switcher": () => import("../../../stories/organisms/organization-switcher.stories"),
    "data-table": () => import("../../../stories/organisms/data-table.stories"),
    "billing-plan-card": () => import("../../../stories/organisms/billing-plan-card.stories"),
    "team-members-list": () => import("../../../stories/organisms/team-members-list.stories"),
    "auth-form": () => import("../../../stories/organisms/auth-form.stories"),
  },
  templates: {
    "auth-layout": () => import("../../../stories/templates/auth-layout.stories"),
    "dashboard-layout": () => import("../../../stories/templates/dashboard-layout.stories"),
  },
}

// Create a component to safely render stories
function StoryRenderer({ Story }: { Story: React.ComponentType<any> }) {
  return <Story />
}

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const [storyComponent, setStoryComponent] = useState<React.ComponentType<any> | null>(null)
  const [storyTitle, setStoryTitle] = useState("")
  const [storyVariant, setStoryVariant] = useState("")
  const [availableVariants, setAvailableVariants] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasInitialParams, setHasInitialParams] = useState(false)

  useEffect(() => {
    if (params?.path && Array.isArray(params.path) && params.path.length >= 2) {
      setHasInitialParams(true)
    } else {
      setHasInitialParams(false)
    }
  }, [params])

  useEffect(() => {
    async function loadStory() {
      if (!hasInitialParams) {
        setIsLoading(false)
        return
      }

      const [category, component, variantFromUrl] = params.path

      // Check if the category and component exist in our map
      if (
        !storyMap[category as keyof typeof storyMap] ||
        !storyMap[category as keyof typeof storyMap].includes(component)
      ) {
        return notFound()
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

        if (variants.length === 0) {
          throw new Error(`No story variants found for ${category}/${component}`)
        }

        setAvailableVariants(variants)

        // Set the current story variant - use the one from URL if provided, otherwise use the first available variant
        const selectedVariant = variantFromUrl || variants[0]
        setStoryVariant(selectedVariant)

        // Set the story title
        setStoryTitle(`${component.charAt(0).toUpperCase() + component.slice(1)}`)

        // Check if the story has a render function
        if (storyModule[selectedVariant]?.render) {
          // Create a component from the render function
          setStoryComponent(() => () => storyModule[selectedVariant].render())
        }
        // Otherwise, check if it has a component property
        else if (storyModule[selectedVariant]?.component) {
          setStoryComponent(() => storyModule[selectedVariant].component)
        } else {
          // If no variant is found, try to use the first available variant
          const firstVariant = variants[0]
          if (storyModule[firstVariant]?.render) {
            setStoryComponent(() => () => storyModule[firstVariant].render())
            setStoryVariant(firstVariant)
          } else if (storyModule[firstVariant]?.component) {
            setStoryComponent(() => storyModule[firstVariant].component)
            setStoryVariant(firstVariant)
          } else {
            setError(`Story variant "${selectedVariant}" does not have a component or render function`)
          }
        }
      } catch (error) {
        console.error("Error loading story:", error)
        setError(`Error loading story: ${error instanceof Error ? error.message : String(error)}`)
      }

      setIsLoading(false)
    }

    setIsLoading(true)
    setError(null)
    loadStory()
  }, [params, hasInitialParams])

  // Redirect to the first variant if no variant is specified
  useEffect(() => {
    if (!isLoading && hasInitialParams && params.path && params.path.length === 2 && availableVariants.length > 0) {
      const [category, component] = params.path
      router.replace(`/storybook/${category}/${component}/${availableVariants[0]}`)
    }
  }, [isLoading, params, availableVariants, hasInitialParams, router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">{storyTitle}</h1>

      {availableVariants.length > 0 && (
        <Tabs value={storyVariant.toLowerCase()} className="mb-6">
          <TabsList>
            {availableVariants.map((variant) => (
              <TabsTrigger key={variant} value={variant.toLowerCase()} asChild>
                <a href={`/storybook/${params.path[0]}/${params.path[1]}/${variant}`}>{variant}</a>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{storyVariant}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-10 bg-background border-t">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : storyComponent ? (
            <StoryRenderer Story={storyComponent} />
          ) : (
            <div>No story component found</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
