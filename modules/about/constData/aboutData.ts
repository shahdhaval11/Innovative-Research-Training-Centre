import { BadgeDollarSign, Clock, GraduationCap, Lock, SlidersHorizontal } from "lucide-react";
import type { AboutIntro, MissionVision, WhyNanoNova } from "../types";

export const MISSION_VISION: MissionVision = {
  eyebrow: "Mission & Vision",
  heading: "What Drives Us",
  mission: {
    title: "Our Mission",
    description:
      "Our mission is to empower post-graduate and doctoral students with the tools, resources, and expertise they need to succeed in their academic pursuits. We are committed to providing high-quality, personalized services that help students produce original, well-researched, and professionally written academic works. Through mentorship, skill-building, and expert guidance, we aim to contribute to the academic success of every student who comes to us.",
  },
  vision: {
    title: "Our Vision",
    points: [
      "Our vision is to become a leading platform for academic support, recognized for excellence in helping students advance their academic careers.",
      "We aim to create an inclusive, accessible, and collaborative environment that fosters intellectual growth, innovation, and the exchange of ideas.",
      "By providing expert research guidance, writing assistance, and publication support, we envision contributing to the global academic community and shaping the future of research.",
    ],
  },
};

export const WHY_NANONOVA: WhyNanoNova = {
  eyebrow: "Why NanoNova",
  heading: "Why Choose NanoNova",
  points: [
    {
      title: "Expertise",
      description:
        "Our team consists of experienced academics and professionals who have been where you are and know what it takes to succeed.",
      icon: GraduationCap,
    },
    {
      title: "Tailored Services",
      description:
        "We offer personalized solutions to meet your specific needs, whether you're in the early stages of research or preparing your final submission.",
      icon: SlidersHorizontal,
    },
    {
      title: "Affordable Pricing",
      description:
        "We understand the financial constraints of students, so we offer competitive rates without compromising on quality.",
      icon: BadgeDollarSign,
    },
    {
      title: "Confidentiality",
      description:
        "We value your privacy and ensure that your work remains secure throughout the process.",
      icon: Lock,
    },
    {
      title: "Timely Delivery",
      description:
        "We respect deadlines and work diligently to ensure your projects are completed on time.",
      icon: Clock,
    },
  ],
};

export const ABOUT_INTRO: AboutIntro = {
  eyebrow: "About NanoNova",
  heading: "Welcome to NanoNova Research & Training Centre",
  tagline: "Your Partner in Academic Excellence",
  paragraphs: [
    "At Innovative Research & Training Centre, we are dedicated to helping post-graduate (PG) and PhD students achieve their academic goals. Whether you're starting your research journey, writing your thesis, or preparing for paper publication, our platform offers tailored services designed to guide you through every step.",
    "We aim to provide expert advice, practical resources, and personalized support to ensure your success in the world of academia. We focus on training students by short term and certificate courses.",
  ],
};
