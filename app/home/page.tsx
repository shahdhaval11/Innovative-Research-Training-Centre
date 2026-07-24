import type { Metadata } from "next";
import Home from "@/modules/home/components/Home";

export const metadata: Metadata = {
  title: {
    absolute: "Nanonova Research and Training Centre | Academic Research, Thesis & Publication Support",
  },
  description:
    "NRTC helps under-graduate, post-graduate, and doctoral students with research guidance, thesis support, data analysis, academic writing, and publication support — backed by expert mentors.",
  alternates: {
    canonical: "/home",
  },
};

export default function HomePage() {
  return <Home />;
}