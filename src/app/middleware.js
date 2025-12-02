import { NextResponse } from "next/server";

export function middleware(req) {
  const protectedPaths = ["/add-property", "/property"];

  const token = req.cookies.get("user") || req.headers.get("user");
  const pathname = req.nextUrl.pathname;

  // Check if route needs auth
  const requiresAuth = protectedPaths.some((p) =>
    pathname.startsWith(p)
  );

  if (requiresAuth && !req.cookies.get("user")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-property/:path*", "/property/:path*"],
};
