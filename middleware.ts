import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "@/lib/auth"

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/api/auth", "/auth", "/storybook"]

// Check if a route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

// Middleware function to protect routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If the route is public, allow access
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Use our unified auth module to check authentication
  const session = await getSession(request)

  // If the user is not authenticated and trying to access a protected route,
  // redirect them to the login page
  if (!session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.url)

    return NextResponse.redirect(loginUrl)
  }

  // For authenticated users accessing protected routes
  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
