import { NextResponse } from "next/server";
import { getUpcomingActiveEvents } from "@/modules/admin/services/eventService";

// Public list for the website: active events that have not ended yet.
export async function GET() {
  try {
    const events = await getUpcomingActiveEvents();
    return NextResponse.json({ events }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Failed to load events:", error);
    return NextResponse.json({ message: "Failed to load events." }, { status: 500 });
  }
}
