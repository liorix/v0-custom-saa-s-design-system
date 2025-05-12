"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name?: string | null
  email: string
  image?: string | null
}

type Session = {
  user: User
}

type AuthContextType = {
  session: Session | null
  status: "loading" | "authenticated" | "unauthenticated"
  signIn: (credentials: { email: string; password: string }) => Promise<{ error?: string }>
  signUp: (userData: { name?: string; email: string; password: string }) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  status: "loading",
  signIn: async () => ({ error: "Not implemented" }),
  signUp: async () => ({ error: "Not implemented" }),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")

  // Fetch session on mount
  useEffect(() => {
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

  // Sign in function
  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        return { error: data.error || "Failed to sign in" }
      }

      // Update session state
      if (data.user) {
        setSession({ user: data.user })
        setStatus("authenticated")
      }

      return {}
    } catch (error) {
      console.error("Error signing in:", error)
      return { error: "An error occurred during sign in" }
    }
  }

  // Sign up function
  const signUp = async (userData: { name?: string; email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        return { error: data.error || "Failed to sign up" }
      }

      // Update session state
      if (data.user) {
        setSession({ user: data.user })
        setStatus("authenticated")
      }

      return {}
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: "An error occurred during sign up" }
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setSession(null)
      setStatus("unauthenticated")
      window.location.href = "/login?signedOut=true"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        status,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
