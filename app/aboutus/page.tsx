import type { Metadata } from "next";
import About from "@/modules/aboutus/components/About";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nanonova Research and Training Centre (NRTC) is a dedicated academic support platform for under-graduate, post-graduate, and doctoral students, combining expert mentorship, research guidance, and professional publishing support.",
  alternates: {
    canonical: "/aboutus",
  },
};

export default function AboutPage() {
  return <About />;
}