"use client"

import { useCallback, useRef } from "react"

/**
 * A custom implementation that provides similar functionality to the experimental useEffectEvent hook
 * This uses the ref pattern which is stable and works with current versions of React
 */
export function useEventCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback)

  // Update the ref each render to always have the latest callback
  callbackRef.current = callback

  // Return a stable function that calls the latest callback
  return useCallback(((...args) => callbackRef.current(...args)) as T, [])
}

// Export with both names for backward compatibility
export const useEffectEvent = useEventCallback
