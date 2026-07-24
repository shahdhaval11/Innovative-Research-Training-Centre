import type { Metadata } from "next";
import Course from "@/modules/courses/components/Course";

export const metadata: Metadata = {
  title: "Courses & Training Programs",
  description:
    "Discover NRTC's short-term courses and certificate programs — from 1 week to 3 months, available online and offline, designed to bridge the gap between academic theory and real-world research practice.",
  alternates: {
    canonical: "/courses",
  },
};

export default function CoursePage() {
  return <Course />;
}