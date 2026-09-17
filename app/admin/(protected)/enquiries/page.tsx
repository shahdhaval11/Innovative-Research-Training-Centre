import type { Metadata } from "next";
import EnquiriesPage from "@/modules/admin/components/EnquiriesPage";

export const metadata: Metadata = {
  title: "Enquiries",
};

export default function Page() {
  return <EnquiriesPage />;
}
