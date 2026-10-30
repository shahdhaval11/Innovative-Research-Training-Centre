import type { Metadata } from "next";
import ContactPage from "@/modules/contact/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach NanoNova Research and Training Centre in Surat – address, phone, email and map location.",
};

export default function Page() {
  return <ContactPage />;
}
