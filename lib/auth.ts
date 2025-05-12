// This file provides a unified API that works in both preview and production
import { betterAuth as compatAuth, useSession as compatUseSession } from "./better-auth-compat"

// Check if we're in preview mode (v0 environment)
const isPreviewMode =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
  process.env.NODE_ENV === "development" ||
  (typeof window !== "undefined" && window.location.hostname.includes(".lite.vusercontent.net"))

// In preview mode, always use our compatibility layer
if (isPreviewMode) {
  console.log("Using Better Auth compatibility layer (preview mode)")
}

// Export everything from the compatibility layer
// In production, you would replace these imports with imports from @better-auth/next
export const { getSession, signIn, signUp, signOut, handler } = compatAuth
export const useSession = compatUseSession

// Export a unified auth object
export const auth = compatAuth

// Add a note for production deployment
if (!isPreviewMode) {
  console.log("IMPORTANT: In production, replace imports in lib/auth.ts with @better-auth/next")
}
