import type { Metadata } from "next";
import ManageFeedbackPage from "@/modules/admin/components/ManageFeedbackPage";

export const metadata: Metadata = {
  title: "Feedback",
};

export default function Page() {
  return <ManageFeedbackPage />;
}
