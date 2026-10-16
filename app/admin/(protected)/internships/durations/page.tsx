import type { Metadata } from "next";
import ManageDurationsPage from "@/modules/admin/components/ManageDurationsPage";

export const metadata: Metadata = {
  title: "Manage Duration",
};

export default function Page() {
  return <ManageDurationsPage />;
}
