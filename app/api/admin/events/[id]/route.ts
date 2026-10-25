import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { parseEventFormData } from "@/modules/admin/services/eventForm";
import {
  EVENT_STATUSES,
  deleteEvent,
  setEventStatus,
  updateEvent,
  type EventStatus,
} from "@/modules/admin/services/eventService";

export async function PUT(request: Request, ctx: RouteContext<"/api/admin/events/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const parsed = parseEventFormData(formData, { requireBanner: false });
  if ("error" in parsed) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }

  const { id } = await ctx.params;

  try {
    const event = await updateEvent(id, parsed.data);

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json({ message: "Failed to update event." }, { status: 500 });
  }
}

// Active / inactive toggle.
export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/events/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { status?: string } | null;
  const status = body?.status as EventStatus;
  if (!EVENT_STATUSES.includes(status)) {
    return NextResponse.json({ message: "Invalid status." }, { status: 400 });
  }

  const { id } = await ctx.params;

  try {
    const event = await setEventStatus(id, status);

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Failed to update event status:", error);
    return NextResponse.json({ message: "Failed to update event status." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/events/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;

  try {
    const deleted = await deleteEvent(id);

    if (!deleted) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json({ message: "Failed to delete event." }, { status: 500 });
  }
}
