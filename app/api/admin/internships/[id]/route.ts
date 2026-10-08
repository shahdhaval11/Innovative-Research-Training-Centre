import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { parseInternshipFormData } from "@/modules/admin/services/internshipForm";
import { DuplicateSlugError, updateInternship } from "@/modules/admin/services/internshipService";

export async function PUT(request: Request, ctx: RouteContext<"/api/admin/internships/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const parsed = parseInternshipFormData(formData);
  if ("error" in parsed) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }

  const { id } = await ctx.params;

  try {
    const internship = await updateInternship(id, parsed.data);

    if (!internship) {
      return NextResponse.json({ message: "Internship not found." }, { status: 404 });
    }

    return NextResponse.json({ internship });
  } catch (error) {
    if (error instanceof DuplicateSlugError) {
      return NextResponse.json(
        { message: "An internship with this title already exists." },
        { status: 409 },
      );
    }
    console.error("Failed to update internship:", error);
    return NextResponse.json({ message: "Failed to update internship." }, { status: 500 });
  }
}
