import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { deleteInternshipRegistration } from "@/modules/admin/services/internshipRegistrationService";

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/admin/internship-registrations/[id]">,
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  const deleted = await deleteInternshipRegistration(id);

  if (!deleted) {
    return NextResponse.json({ message: "Registration not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
