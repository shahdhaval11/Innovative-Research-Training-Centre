import type { LucideIcon } from "lucide-react";

export type Discipline = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type AudienceOption = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient: string;
  glow: string;
};

export type WhyPoint = {
  text: string;
};

export type CoreService = {
  icon: LucideIcon;
  image: string;
  title: string;
  description: string;
  href: string;
};

export type Stat = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export type Program = {
  icon: LucideIcon;
  title: string;
  duration: string;
  tag: string;
  href: string;
};

export type Workshop = {
  day: string;
  month: string;
  title: string;
  venue: string;
  time: string;
  href: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
};

export type Partner = {
  name: string;
};
