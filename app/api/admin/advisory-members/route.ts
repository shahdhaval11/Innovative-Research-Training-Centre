import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { parseAdvisoryMemberFormData } from "@/modules/admin/services/advisoryMemberForm";
import {
  createAdvisoryMember,
  getAdvisoryMembers,
} from "@/modules/admin/services/advisoryMemberService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const members = await getAdvisoryMembers();
  return NextResponse.json({ members });
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

  const parsed = parseAdvisoryMemberFormData(formData);
  if ("error" in parsed) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }

  try {
    const member = await createAdvisoryMember(parsed.data);
    return NextResponse.json({ member }, { status: 201 });
  } catch (error) {
    console.error("Failed to create advisory member:", error);
    return NextResponse.json({ message: "Failed to create advisory member." }, { status: 500 });
  }
}
