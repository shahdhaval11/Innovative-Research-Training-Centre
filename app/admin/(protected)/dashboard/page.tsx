import type { Metadata } from "next";
import DashboardPage from "@/modules/admin/components/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return <DashboardPage />;
}
