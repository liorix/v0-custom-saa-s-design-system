"use client"

import { useState, useEffect } from "react"

type User = {
  id: string
  name?: string | null
  email: string
  image?: string | null
}

type Session = {
  user: User
}

type SessionStatus = "loading" | "authenticated" | "unauthenticated"

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<SessionStatus>("loading")

  useEffect(() => {
    // Fetch session on mount
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()

        if (data.session) {
          setSession(data.session)
          setStatus("authenticated")
        } else {
          setSession(null)
          setStatus("unauthenticated")
        }
      } catch (error) {
        console.error("Error fetching session:", error)
        setStatus("unauthenticated")
      }
    }

    fetchSession()
  }, [])

  const update = async () => {
    try {
      const res = await fetch("/api/auth/session")
      const data = await res.json()

      if (data.session) {
        setSession(data.session)
        setStatus("authenticated")
      } else {
        setSession(null)
        setStatus("unauthenticated")
      }
    } catch (error) {
      console.error("Error updating session:", error)
    }
  }

  return {
    data: session,
    status,
    update,
  }
}
