import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { parseAdvisoryMemberFormData } from "@/modules/admin/services/advisoryMemberForm";
import {
  deleteAdvisoryMember,
  updateAdvisoryMember,
} from "@/modules/admin/services/advisoryMemberService";

export async function PUT(request: Request, ctx: RouteContext<"/api/admin/advisory-members/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const parsed = parseAdvisoryMemberFormData(formData);
  if ("error" in parsed) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }

  const { id } = await ctx.params;

  try {
    const member = await updateAdvisoryMember(id, parsed.data);

    if (!member) {
      return NextResponse.json({ message: "Advisory member not found." }, { status: 404 });
    }

    return NextResponse.json({ member });
  } catch (error) {
    console.error("Failed to update advisory member:", error);
    return NextResponse.json({ message: "Failed to update advisory member." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/admin/advisory-members/[id]">,
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;

  try {
    const deleted = await deleteAdvisoryMember(id);

    if (!deleted) {
      return NextResponse.json({ message: "Advisory member not found." }, { status: 404 });
    }

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to delete advisory member:", error);
    return NextResponse.json({ message: "Failed to delete advisory member." }, { status: 500 });
  }
}
