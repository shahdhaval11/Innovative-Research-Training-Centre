// ─── middleware.ts (place in project root) ────────────────────────────────────
// Protects all /admin/* routes except /admin/login
// In production: verify a signed JWT cookie here instead of relying on localStorage

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Allow the login page through
  if (pathname === "/admin/login") return NextResponse.next();

  // NOTE: localStorage is client-side only — server middleware cannot read it.
  // For production, set an httpOnly cookie on login and verify it here.
  // For this static demo, auth check happens client-side in each page's useEffect.

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};