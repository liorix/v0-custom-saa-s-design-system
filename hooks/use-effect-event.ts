"use client"

import { useCallback, useEffect, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef(fn)

  useEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args) => {
    return ref.current(...args)
  }, []) as T
}
