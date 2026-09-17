import {
  Microscope,
  FlaskConical,
  Dna,
  Monitor,
  TestTube,
  GraduationCap,
  Users,
  Building2,
  Briefcase,
  Award,
  ClipboardList,
  BarChart3,
  PenTool,
  Presentation,
  Rocket,
  Atom,
  Leaf,
} from "lucide-react";
import type {
  Discipline,
  AudienceOption,
  WhyPoint,
  CoreService,
  Stat,
  Program,
  Workshop,
  Testimonial,
  Partner,
} from "../types";

export const HERO_DISCIPLINES: Discipline[] = [
  {
    icon: Microscope,
    title: "Microbiology",
    description: "Hands-on culturing, staining & diagnostic lab training",
  },
  {
    icon: FlaskConical,
    title: "Biotechnology",
    description: "Genetic engineering & modern biotech techniques",
  },
  {
    icon: TestTube,
    title: "Medical Lab Science",
    description: "Clinical & diagnostic laboratory skill building",
  },
  {
    icon: Monitor,
    title: "Bioinformatics",
    description: "Sequence analysis, docking & computational biology",
  },
  {
    icon: Atom,
    title: "Pharmaceutical Sciences",
    description: "Pharmaceutics & drug development fundamentals",
  },
];

export const AUDIENCE_OPTIONS: AudienceOption[] = [
  {
    icon: GraduationCap,
    title: "Student",
    description: "Build practical skills & get certified",
    href: "/programs",
    gradient: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-200",
  },
  {
    icon: Microscope,
    title: "Research Scholar",
    description: "Get research training & dissertation guidance",
    href: "/research-dissertation",
    gradient: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-200",
  },
  {
    icon: Users,
    title: "Faculty",
    description: "Upgrade your research & teaching skills",
    href: "/for-institutions",
    gradient: "from-sky-500 to-blue-600",
    glow: "group-hover:shadow-sky-200",
  },
  {
    icon: Building2,
    title: "Institution",
    description: "Design customized training programs",
    href: "/for-institutions",
    gradient: "from-amber-500 to-orange-600",
    glow: "group-hover:shadow-amber-200",
  },
  {
    icon: Briefcase,
    title: "Industry Professional",
    description: "Develop technical & laboratory capabilities",
    href: "/for-industry",
    gradient: "from-rose-500 to-pink-600",
    glow: "group-hover:shadow-rose-200",
  },
];

export const WHY_NANONOVA: WhyPoint[] = [
  { text: "100% Practical & Hands-on Training" },
  { text: "Expert Faculty & Research Mentors" },
  { text: "Modern Laboratories & Infrastructure" },
  { text: "Industry Relevant & Career Focused" },
  { text: "Certification & Placement Guidance" },
  { text: "Flexible Learning Options" },
];

export const CORE_SERVICES: CoreService[] = [
  {
    icon: TestTube,
    image: "/core-services/research-dissertation.jpg",
    title: "Research & Dissertation Support",
    description: "From topic selection to publication, we guide you at every step.",
    href: "/research-dissertation",
  },
  {
    icon: Microscope,
    image: "/core-services/laboratory-training.jpg",
    title: "Laboratory Training",
    description: "Hands-on training in advanced labs with expert guidance.",
    href: "/laboratory-services",
  },
  {
    icon: Award,
    image: "/core-services/short-term-courses.jpg",
    title: "Short-Term Courses",
    description: "Certification courses designed for skill enhancement.",
    href: "/programs/short-term-courses",
  },
  {
    icon: Monitor,
    image: "/core-services/bioinformatics.jpg",
    title: "Bioinformatics Services",
    description: "Computational analysis, NGS, docking, data analysis & more.",
    href: "/laboratory-services",
  },
  {
    icon: Presentation,
    image: "/core-services/workshops-webinars.jpg",
    title: "Workshops & Webinars",
    description: "Interactive workshops by experts on trending topics.",
    href: "/workshops-events",
  },
  {
    icon: ClipboardList,
    image: "/core-services/project-consultancy.jpg",
    title: "Project & Research Consultancy",
    description: "Custom solutions for academic & industry research needs.",
    href: "/for-industry",
  },
];

export const STATS: Stat[] = [
  { icon: Users, value: "2500+", label: "Students Trained" },
  { icon: GraduationCap, value: "150+", label: "Programs Conducted" },
  { icon: Building2, value: "75+", label: "Institutions Collaborated" },
  { icon: PenTool, value: "50+", label: "Expert Mentors" },
  { icon: BarChart3, value: "98%", label: "Student Satisfaction" },
  { icon: Rocket, value: "100%", label: "Practical Learning" },
];

export const POPULAR_PROGRAMS: Program[] = [
  {
    icon: Dna,
    title: "Molecular Biology & Genetic Engineering",
    duration: "1 - 3 Months",
    tag: "Certificate",
    href: "/programs/molecular-biology",
  },
  {
    icon: Monitor,
    title: "Bioinformatics & Computational Biology",
    duration: "1 - 3 Months",
    tag: "Certificate",
    href: "/programs/bioinformatics",
  },
  {
    icon: Microscope,
    title: "Clinical & Diagnostic Microbiology",
    duration: "1 - 3 Months",
    tag: "Certificate",
    href: "/programs/microbiology",
  },
  {
    icon: TestTube,
    title: "Medical Laboratory Technology",
    duration: "1 - 3 Months",
    tag: "Certificate",
    href: "/programs/medical-laboratory-science",
  },
  {
    icon: FlaskConical,
    title: "Pharmaceutical Microbiology",
    duration: "1 - 3 Months",
    tag: "Certificate",
    href: "/programs/pharmaceutics",
  },
  {
    icon: Leaf,
    title: "Environmental Biotechnology",
    duration: "1 - 3 Months",
    tag: "Certificate",
    href: "/programs/environmental-biotechnology",
  },
];

export const UPCOMING_WORKSHOPS: Workshop[] = [
  {
    day: "25",
    month: "OCT",
    title: "Hands-on Workshop on PCR Techniques",
    venue: "NanoNova Laboratory, Surat",
    time: "10:00 AM - 04:00 PM",
    href: "/workshops-events",
  },
  {
    day: "10",
    month: "NOV",
    title: "Bioinformatics Data Analysis using Python",
    venue: "Online Workshop",
    time: "11:00 AM - 03:00 PM",
    href: "/workshops-events",
  },
  {
    day: "22",
    month: "NOV",
    title: "Molecular Docking & Drug Design Workshop",
    venue: "NanoNova Laboratory, Surat",
    time: "10:00 AM - 05:00 PM",
    href: "/workshops-events",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Riya Sharma",
    role: "M.Sc. Microbiology",
    quote:
      "NanoNova helped me complete my dissertation with proper guidance and hands-on training. The mentors are extremely supportive!",
    initials: "RS",
  },
  {
    name: "Arjun Patel",
    role: "Bioinformatics Trainee",
    quote:
      "The Bioinformatics course was excellent. Practical sessions and real datasets made learning easy and exciting.",
    initials: "AP",
  },
  {
    name: "Neha Desai",
    role: "B.Sc. Biotechnology",
    quote:
      "Great infrastructure, experienced faculty and career-oriented programs. Highly recommended for all life science students.",
    initials: "ND",
  },
];

export const PARTNERS: Partner[] = [
  { name: "Gujarat Biotech Association" },
  { name: "Biocon Academy" },
  { name: "SciGenom Labs" },
  { name: "VNSGU" },
  { name: "SVNIT Surat" },
  { name: "BiTech Institute" },
];

export const HERO_STATS = [
  { value: "2500+", label: "Students Trained" },
  { value: "150+", label: "Programs Conducted" },
];

export const INDUSTRY_INTERESTS = [
  "Short-Term Course",
  "Certificate Program",
  "Research & Dissertation",
  "Laboratory Training",
  "Bioinformatics Services",
  "Workshop & Events",
  "Institutional Collaboration",
  "Industry Training",
];
