import type { Metadata } from "next";
import InquiryPage from "@/modules/inquiry/components/InquiryPage";

export const metadata: Metadata = {
  title: "Inquiry",
  description:
    "Get in touch with NanoNova for internships, workshops and research support. Share your details and our team will contact you shortly.",
};

export default function Page() {
  return <InquiryPage />;
}
