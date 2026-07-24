import type { Metadata } from "next";
import Contact from "@/modules/contactus/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nanonova Research and Training Centre for a free consultation on research guidance, thesis support, data analysis, academic writing, and publication services.",
  alternates: {
    canonical: "/contactus",
  },
};

export default function ContactUs() {
  return (
    <div className="w-full h-full">
      <Contact />
    </div>
  );
}