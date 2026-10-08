import type { LucideIcon } from "lucide-react";

export interface MissionVision {
  eyebrow: string;
  heading: string;
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    points: string[];
  };
}

export interface WhyPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhyNanoNova {
  eyebrow: string;
  heading: string;
  points: WhyPoint[];
}

export interface AboutIntro {
  eyebrow: string;
  heading: string;
  tagline: string;
  paragraphs: string[];
}
