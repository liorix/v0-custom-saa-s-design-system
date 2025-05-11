"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type SessionContextType = {
  session: any | null
  loading: boolean
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
})

export function BetterAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          setSession(data)
        }
      } catch (error) {
        console.error("Failed to load session:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [])

  return <SessionContext.Provider value={{ session, loading }}>{children}</SessionContext.Provider>
}

export function useSession() {
  return useContext(SessionContext)
}
