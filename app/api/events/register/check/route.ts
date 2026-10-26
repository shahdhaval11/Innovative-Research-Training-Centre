import { NextResponse } from "next/server";
import { findDuplicateEventRegistration } from "@/modules/events/services/eventRegistrationService";

// Lets the form catch a repeat registration before the applicant pays.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    eventId?: string;
    email?: string;
    mobile?: string;
  } | null;

  if (!body?.eventId || !body.email || !body.mobile) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  try {
    const fields = await findDuplicateEventRegistration(body.eventId, body.email, body.mobile);
    return NextResponse.json({ duplicate: !!fields, fields });
  } catch (error) {
    console.error("Failed to check event registration:", error);
    return NextResponse.json({ message: "Failed to verify your details." }, { status: 500 });
  }
}
