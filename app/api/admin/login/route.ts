import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authenticateAdmin } from "@/modules/admin/services/adminAuthService";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
} from "@/lib/adminSession";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  const admin = await authenticateAdmin(email, password);

  if (!admin) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const token = createAdminSessionToken({ userId: admin.userId, email: admin.email });
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, adminSessionCookieOptions);

  return NextResponse.json({ user: { email: admin.email, name: admin.name } });
}
