import { NextResponse, after } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getActiveEventById } from "@/modules/admin/services/eventService";
import { getEventRecipients, sendMeetingLinks } from "@/modules/admin/services/meetingLinkService";

function parseMeetingUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function POST(
  request: Request,
  ctx: RouteContext<"/api/admin/events/[id]/send-meeting-link">,
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const meetingUrl = parseMeetingUrl(body?.meetingUrl);
  if (!meetingUrl) {
    return NextResponse.json({ message: "Enter a valid meeting link." }, { status: 400 });
  }

  const { id } = await ctx.params;
  const event = await getActiveEventById(id);
  if (!event) {
    return NextResponse.json({ message: "Event / workshop not found." }, { status: 404 });
  }

  const recipients = await getEventRecipients(id);
  if (recipients.length === 0) {
    return NextResponse.json(
      { message: "No one has registered for this event / workshop yet." },
      { status: 400 },
    );
  }

  // Respond right away; the emails go out after the response is sent.
  after(() => sendMeetingLinks(event, meetingUrl, recipients));

  return NextResponse.json({ message: "Email submitted.", recipients: recipients.length }, { status: 202 });
}
