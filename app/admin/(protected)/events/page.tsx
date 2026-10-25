import type { Metadata } from "next";
import ManageEventsPage from "@/modules/admin/components/ManageEventsPage";

export const metadata: Metadata = {
  title: "Manage Events & Workshop",
};

export default function Page() {
  return <ManageEventsPage />;
}
