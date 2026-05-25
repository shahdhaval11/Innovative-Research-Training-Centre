// ─── app/api/admin/auth/route.ts ──────────────────────────────────────────────
// Static-credential login API route (Next.js App Router)

import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = verifyCredentials(email.trim().toLowerCase(), password);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    // In production: create a signed JWT or server session here
    const sessionPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      loginAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, message: "Login successful.", user: sessionPayload },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout — in production, clear the server session / cookie here
  return NextResponse.json({ success: true, message: "Logged out." });
}