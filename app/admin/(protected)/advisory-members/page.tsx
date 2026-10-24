import type { Metadata } from "next";
import ManageAdvisoryMembersPage from "@/modules/admin/components/ManageAdvisoryMembersPage";

export const metadata: Metadata = {
  title: "Manage Advisory Member",
};

export default function Page() {
  return <ManageAdvisoryMembersPage />;
}
