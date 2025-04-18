# Custom Hooks Documentation

This document provides an overview of the custom hooks used in the SaaS Design System.

## Table of Contents

- [useEventCallback](#useeventcallback)
- [useMobile](#usemobile)

## useEventCallback

`useEventCallback` is a custom hook that creates a stable callback function that can be used in effects without causing the effect to re-run when the callback changes.

### Usage

\`\`\`tsx
import { useEventCallback } from "@/hooks/use-effect-event"

function MyComponent({ onSomething }) {
  // This callback won't cause effects to re-run when onSomething changes
  const handleSomething = useEventCallback(() => {
    onSomething()
  })

  // Use handleSomething in an effect
  React.useEffect(() => {
    document.addEventListener("click", handleSomething)
    return () => document.removeEventListener("click", handleSomething)
  }, [handleSomething]) // handleSomething is stable, so this effect runs only once
}
\`\`\`

### Parameters

- `callback`: The function to be called

### Returns

- A stable callback function that will always call the latest version of the provided callback

## useMobile

`useMobile` is a custom hook that detects if the current viewport is mobile-sized.

### Usage

\`\`\`tsx
import { useMobile } from "@/hooks/use-mobile"

function MyComponent() {
  const isMobile = useMobile()

  return (
    <div>
      {isMobile ? "Mobile View" : "Desktop View"}
    </div>
  )
}
\`\`\`

### Returns

- `boolean`: `true` if the viewport width is less than 768px, `false` otherwise
