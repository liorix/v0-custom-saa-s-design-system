"use client"

import { useCallback, useRef } from "react"

/**
 * A custom hook that creates a stable callback function that can be used in effects
 * without causing the effect to re-run when the callback changes.
 *
 * This is a replacement for React's experimental useEffectEvent hook.
 *
 * @param callback The function to be called
 * @returns A stable callback function
 */
export function useEventCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback)

  // Update the ref whenever the callback changes
  callbackRef.current = callback

  // Return a stable callback that uses the ref
  return useCallback(((...args) => callbackRef.current(...args)) as T, [])
}
