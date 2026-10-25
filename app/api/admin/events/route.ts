import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { parseEventFormData } from "@/modules/admin/services/eventForm";
import { createEvent, getEvents } from "@/modules/admin/services/eventService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const events = await getEvents();
  return NextResponse.json({ events });
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

  const parsed = parseEventFormData(formData, { requireBanner: true });
  if ("error" in parsed) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }

  try {
    const event = await createEvent(parsed.data);
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json({ message: "Failed to create event." }, { status: 500 });
  }
}
