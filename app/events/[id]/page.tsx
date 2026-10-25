import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EventDetailPage from "@/modules/events/components/EventDetailPage";
import { getActiveEventById } from "@/modules/admin/services/eventService";

// Events are managed from the admin panel, so render on every request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/events/[id]">): Promise<Metadata> {
  const { id } = await params;
  const event = await getActiveEventById(id);
  if (!event) return {};

  return {
    title: event.title,
    description: event.description.slice(0, 160),
  };
}

export default async function Page({ params }: PageProps<"/events/[id]">) {
  const { id } = await params;
  const event = await getActiveEventById(id);
  if (!event) notFound();

  return <EventDetailPage event={event} />;
}
