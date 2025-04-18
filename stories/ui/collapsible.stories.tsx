"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronsUpDown, Plus, X } from "lucide-react"

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const WithCustomTrigger: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Notifications</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Hide
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Show
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3">
            <p className="text-sm">You have a new message!</p>
          </div>
          <div className="rounded-md border px-4 py-3">
            <p className="text-sm">Your subscription expires soon.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}
