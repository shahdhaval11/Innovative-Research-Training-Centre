import type { Metadata } from "next";
import AdminLoginPage from "@/modules/admin/components/AdminLoginPage";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return <AdminLoginPage />;
}
