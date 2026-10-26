import type { Metadata } from "next";
import FeedbackPage from "@/modules/feedback/components/FeedbackPage";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  description: "Tell us about your experience with NanoNova.",
};

export default function Page() {
  return <FeedbackPage />;
}
