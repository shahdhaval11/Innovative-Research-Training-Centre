import type { Metadata } from "next";
import ManageInternshipsPage from "@/modules/admin/components/ManageInternshipsPage";

export const metadata: Metadata = {
  title: "Manage Internship",
};

export default function Page() {
  return <ManageInternshipsPage />;
}
