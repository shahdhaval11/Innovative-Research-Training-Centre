import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getRegistrationTrend } from "@/modules/admin/services/dashboardService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const trend = await getRegistrationTrend(7);
  return NextResponse.json({ trend });
}
