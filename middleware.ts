import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth.createMiddleware({
  publicRoutes: ["/", "/login", "/signup", "/api/auth/(.*)", "/auth/(.*)", "/storybook(.*)"],
  afterAuth(req, { session }) {
    // If the user is not signed in and trying to access a protected route,
    // redirect them to the login page
    const isAuthRoute =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup") ||
      req.nextUrl.pathname.startsWith("/auth")

    if (!session && !isPublicRoute(req)) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.url)
      return NextResponse.redirect(loginUrl)
    }

    // If the user is signed in and trying to access an auth route,
    // redirect them to the dashboard
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
})

function isPublicRoute(req: NextRequest): boolean {
  const publicRoutes = ["/", "/login", "/signup", "/api/auth", "/auth", "/storybook"]

  return publicRoutes.some((route) => req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(`${route}/`))
}
