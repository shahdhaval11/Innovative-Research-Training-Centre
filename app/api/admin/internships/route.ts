import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { parseInternshipFormData } from "@/modules/admin/services/internshipForm";
import {
  DuplicateSlugError,
  createInternship,
  getInternships,
} from "@/modules/admin/services/internshipService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const internships = await getInternships();
  return NextResponse.json({ internships });
}

export async function POST(request: Request) {
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

  try {
    const internship = await createInternship(parsed.data);
    return NextResponse.json({ internship }, { status: 201 });
  } catch (error) {
    if (error instanceof DuplicateSlugError) {
      return NextResponse.json(
        { message: "An internship with this title already exists." },
        { status: 409 },
      );
    }
    console.error("Failed to create internship:", error);
    return NextResponse.json({ message: "Failed to create internship." }, { status: 500 });
  }
}
