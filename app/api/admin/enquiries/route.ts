import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getEnquiries } from "@/modules/admin/services/enquiryService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const enquiries = await getEnquiries();
  return NextResponse.json({ enquiries });
}
