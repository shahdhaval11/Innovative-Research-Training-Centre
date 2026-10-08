import type { Metadata } from "next";
import AboutPage from "@/modules/about/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our mission and vision to empower post-graduate and doctoral students with research guidance, writing assistance and publication support.",
};

export default function Page() {
  return <AboutPage />;
}
