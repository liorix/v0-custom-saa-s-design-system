"use client"

import { useCallback, useRef } from "react"

/**
 * A custom implementation of the experimental useEffectEvent hook
 * This provides the same functionality but works with the current stable version of React
 */
export function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback)

  // Update the ref each render to always have the latest callback
  callbackRef.current = callback

  // Return a stable function that calls the latest callback
  return useCallback(((...args) => callbackRef.current(...args)) as T, [])
}
