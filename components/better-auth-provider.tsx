"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getSession } from "@/lib/better-auth"

// Define session types
type User = {
  id: string
  name: string | null
  email: string
  image?: string | null
}

type Session = {
  user: User | null
  expires: string
}

type BetterAuthContextType = {
  session: Session | null
  loading: boolean
}

// Create context
const BetterAuthContext = createContext<BetterAuthContextType>({
  session: null,
  loading: true,
})

export function BetterAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      try {
        const session = await getSession()
        setSession(session)
      } catch (error) {
        console.error("Failed to load session:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [])

  return <BetterAuthContext.Provider value={{ session, loading }}>{children}</BetterAuthContext.Provider>
}

export function useSession() {
  return useContext(BetterAuthContext)
}
