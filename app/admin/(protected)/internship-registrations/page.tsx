import type { Metadata } from "next";
import InternshipRegistrationsPage from "@/modules/admin/components/InternshipRegistrationsPage";

export const metadata: Metadata = {
  title: "Internship Registrations",
};

export default function Page() {
  return <InternshipRegistrationsPage />;
}
