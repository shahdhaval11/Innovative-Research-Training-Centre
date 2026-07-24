import type { Metadata } from "next";
import StudentSupport from "@/modules/studentSupport/components/StudentSupport";

export const metadata: Metadata = {
  title: "Student Support Services",
  description:
    "Explore NRTC's 7 academic support services for PG & PhD scholars — Research Guidance, Dissertation/Thesis Support, Research Methodology, Data Analysis, Writing & Editing, Publication Support, and Training & Placement Support.",
  alternates: {
    canonical: "/studentSupport",
  },
};

export default function StudentSupportPage() {
  return <StudentSupport />;
}