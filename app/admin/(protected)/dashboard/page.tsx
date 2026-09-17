import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <h1 className="font-heading text-2xl font-extrabold text-secondary-800">
      Welcome to dashboard
    </h1>
  );
}
