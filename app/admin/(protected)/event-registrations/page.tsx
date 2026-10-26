import type { Metadata } from "next";
import EventRegistrationsPage from "@/modules/admin/components/EventRegistrationsPage";

export const metadata: Metadata = {
  title: "Event Registrations",
};

export default function Page() {
  return <EventRegistrationsPage />;
}
