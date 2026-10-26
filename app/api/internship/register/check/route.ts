import { NextResponse } from "next/server";
import { findDuplicateInternshipRegistration } from "@/modules/internship/services/internshipRegistrationService";

// Lets the form catch a repeat registration before the applicant pays.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    internshipId?: string | number;
    email?: string;
    mobile?: string;
  } | null;

  if (!body?.internshipId || !body.email || !body.mobile) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  try {
    const fields = await findDuplicateInternshipRegistration(
      body.internshipId,
      body.email,
      body.mobile,
    );
    return NextResponse.json({ duplicate: !!fields, fields });
  } catch (error) {
    console.error("Failed to check internship registration:", error);
    return NextResponse.json({ message: "Failed to verify your details." }, { status: 500 });
  }
}
