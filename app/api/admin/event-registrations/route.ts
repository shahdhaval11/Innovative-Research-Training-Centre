import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getEventRegistrations } from "@/modules/admin/services/eventRegistrationService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const registrations = await getEventRegistrations();
  return NextResponse.json({ registrations });
}
