"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
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
    accordion: () => import("../../../components/ui/accordion.stories"),
    alert: () => import("../../../components/ui/alert.stories"),
    "alert-dialog": () => import("../../../components/ui/alert-dialog.stories"),
    avatar: () => import("../../../components/ui/avatar.stories"),
    badge: () => import("../../../components/ui/badge.stories"),
    button: () => import("../../../components/ui/button.stories"),
    calendar: () => import("../../../components/ui/calendar.stories"),
    card: () => import("../../../components/ui/card.stories"),
    checkbox: () => import("../../../components/ui/checkbox.stories"),
    dialog: () => import("../../../components/ui/dialog.stories"),
    "dropdown-menu": () => import("../../../components/ui/dropdown-menu.stories"),
    "hover-card": () => import("../../../components/ui/hover-card.stories"),
    input: () => import("../../../components/ui/input.stories"),
    label: () => import("../../../components/ui/label.stories"),
    popover: () => import("../../../components/ui/popover.stories"),
    select: () => import("../../../components/ui/select.stories"),
    separator: () => import("../../../components/ui/separator.stories"),
    sheet: () => import("../../../components/ui/sheet.stories"),
    skeleton: () => import("../../../components/ui/skeleton.stories"),
    slider: () => import("../../../components/ui/slider.stories"),
    switch: () => import("../../../components/ui/switch.stories"),
    tabs: () => import("../../../components/ui/tabs.stories"),
    textarea: () => import("../../../components/ui/textarea.stories"),
    toast: () => import("../../../components/ui/toast.stories"),
    collapsible: () => import("../../../components/ui/collapsible.stories"),
    "context-menu": () => import("../../../components/ui/context-menu.stories"),
    command: () => import("../../../components/ui/command.stories"),
  },
  atoms: {
    logo: () => import("../../../components/atoms/logo.stories"),
    "empty-state": () => import("../../../components/atoms/empty-state.stories"),
    "avatar-group": () => import("../../../components/atoms/avatar-group.stories"),
    "page-header": () => import("../../../components/atoms/page-header.stories"),
  },
  molecules: {
    "stat-card": () => import("../../../components/molecules/stat-card.stories"),
    "notification-item": () => import("../../../components/molecules/notification-item.stories"),
    "feature-card": () => import("../../../components/molecules/feature-card.stories"),
    "form-field": () => import("../../../components/molecules/form-field.stories"),
  },
  organisms: {
    "organization-switcher": () => import("../../../components/organisms/organization-switcher.stories"),
    "data-table": () => import("../../../components/organisms/data-table.stories"),
    "billing-plan-card": () => import("../../../components/organisms/billing-plan-card.stories"),
    "team-members-list": () => import("../../../components/organisms/team-members-list.stories"),
    "auth-form": () => import("../../../components/organisms/auth-form.stories"),
  },
  templates: {
    "auth-layout": () => import("../../../components/templates/auth-layout.stories"),
    "dashboard-layout": () => import("../../../components/templates/dashboard-layout.stories"),
  },
}

// Add this near the top of the file, outside the component
const storyModuleCache: Record<string, any> = {}

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

  const loadStory = useCallback(async () => {
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
      // Create a cache key
      const cacheKey = `${category}/${component}`

      // Use cached module if available
      let storyModule
      if (storyModuleCache[cacheKey]) {
        storyModule = storyModuleCache[cacheKey]
      } else {
        // Use the explicit import function from our mapping
        const importFn = storyImports[category as keyof typeof storyImports]?.[component as any]

        if (!importFn) {
          throw new Error(`Import function not found for ${category}/${component}`)
        }

        storyModule = await importFn()
        // Cache the module
        storyModuleCache[cacheKey] = storyModule
      }

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
  }, [params.path, hasInitialParams])

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    loadStory()
  }, [loadStory])

  // Replace this useEffect
  useEffect(() => {
    if (!isLoading && hasInitialParams && params.path && params.path.length === 2 && availableVariants.length > 0) {
      const [category, component] = params.path
      setStoryVariant(availableVariants[0])
      router.replace(`/storybook/${category}/${component}/${availableVariants[0]}`, { scroll: false })
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
              <TabsTrigger
                key={variant}
                value={variant.toLowerCase()}
                onClick={(e) => {
                  // Update the variant state immediately for a faster UI response
                  setStoryVariant(variant)

                  // Use router.push for client-side navigation without page reload
                  const url = `/storybook/${params.path[0]}/${params.path[1]}/${variant}`
                  router.push(url, { scroll: false })

                  // Load the story component directly if it's already in the cache
                  const cacheKey = `${params.path[0]}/${params.path[1]}`
                  const storyModule = storyModuleCache[cacheKey]
                  if (storyModule && storyModule[variant]) {
                    if (storyModule[variant].render) {
                      setStoryComponent(() => () => storyModule[variant].render())
                    } else if (storyModule[variant].component) {
                      setStoryComponent(() => storyModule[variant].component)
                    }
                  }
                }}
              >
                {variant}
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
