import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { markEnquiryAsSeen } from "@/modules/admin/services/enquiryService";

export async function PATCH(
  _request: Request,
  ctx: RouteContext<"/api/admin/enquiries/[id]">,
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  const enquiry = await markEnquiryAsSeen(id);

  if (!enquiry) {
    return NextResponse.json({ message: "Enquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ enquiry });
}
