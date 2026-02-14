import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the route requires authentication
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for auth token in cookies (if using cookies) or let client-side handle it
    // Since we're using localStorage, the client-side will handle redirects
    // This middleware can be extended to check cookies or headers if needed
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
