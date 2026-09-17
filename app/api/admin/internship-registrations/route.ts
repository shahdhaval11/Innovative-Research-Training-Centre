import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getInternshipRegistrations } from "@/modules/admin/services/internshipRegistrationService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const registrations = await getInternshipRegistrations();
  return NextResponse.json({ registrations });
}
