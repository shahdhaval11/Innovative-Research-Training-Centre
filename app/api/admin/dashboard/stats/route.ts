import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getDashboardStats } from "@/modules/admin/services/dashboardService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const stats = await getDashboardStats();
  return NextResponse.json({ stats });
}
