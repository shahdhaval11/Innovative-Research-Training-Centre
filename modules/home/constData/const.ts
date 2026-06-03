import { Service, Testimonial, Announcement } from "@/modules/home/types"
// ─── Data ─────────────────────────────────────────────────────────────────────

export const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1400&q=80",
    heading: "Empowering Academic Excellence",
    sub: "Dedicated support for PG & PhD scholars at every stage of their research journey.",
  },
  {
    url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1400&q=80",
    heading: "Research · Training · Publication",
    sub: "Short-term courses, certificate programs, and expert mentorship — all under one roof.",
  },
];

// export const SERVICES: Service[] = [
//   {
//     icon: "📝",
//     title: "Thesis & Dissertation Writing",
//     desc: "Structure, content development, and formatting guidance to craft a compelling thesis.",
//   },
//   {
//     icon: "🔬",
//     title: "Research Guidance",
//     desc: "From formulating research questions to refining methodologies and frameworks.",
//   },
//   {
//     icon: "📰",
//     title: "Paper Publication Support",
//     desc: "Journal selection, proofreading, and ensuring compliance with submission guidelines.",
//   },
//   {
//     icon: "✏️",
//     title: "Academic Editing & Proofreading",
//     desc: "Expert review for clarity, coherence, grammar, and academic style.",
//   },
//   {
//     icon: "📊",
//     title: "Data Analysis & Statistics",
//     desc: "SPSS, R, and Python support for rigorous quantitative and qualitative research.",
//   },
//   {
//     icon: "🤝",
//     title: "Consultation & Mentorship",
//     desc: "One-on-one sessions with experienced academics at any stage of your project.",
//   },
// ];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Priya Sharma",
    degree: "PhD – Life Sciences, IIT Bombay",
    text: "IRTC's mentorship helped me structure my dissertation in a way I never thought possible. The guidance was precise, practical, and deeply encouraging.",
  },
  {
    name: "Rahul Mehta",
    degree: "M.Phil – Economics, DU",
    text: "Their data analysis support transformed my thesis. The experts walked me through SPSS step-by-step. I couldn't have submitted without them.",
  },
  {
    name: "Dr. Anjali Nair",
    degree: "PhD – Computer Science, NIT Calicut",
    text: "From paper selection to final proofreading, IRTC was there at every step. My Scopus-indexed paper wouldn't exist without their guidance.",
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    date: "Apr 10, 2025",
    tag: "Webinar",
    title: "Research Methodology Masterclass",
    desc: "A 3-hour live session on qualitative & quantitative methods for PhD scholars. Limited seats.",
  },
  {
    date: "Apr 18, 2025",
    tag: "Workshop",
    title: "Data Analysis with Python & R",
    desc: "Hands-on workshop covering statistical analysis for academic research. Certificate provided.",
  },
  {
    date: "May 2, 2025",
    tag: "Course",
    title: "Academic Writing Certificate Program",
    desc: "6-week intensive program on thesis writing, paper structuring, and scholarly communication.",
  },
];

// export const WHY_US = [
//   { icon: "🎓", label: "Expertise", desc: "Seasoned academics who've navigated the research path themselves." },
//   { icon: "🎯", label: "Tailored Services", desc: "Personalised solutions whether you're at proposal or final submission stage." },
//   { icon: "💰", label: "Affordable Pricing", desc: "Competitive rates designed with student budgets in mind." },
//   { icon: "🔒", label: "Confidentiality", desc: "Your work and identity are completely secure with us." },
//   { icon: "⏱️", label: "Timely Delivery", desc: "We respect deadlines and deliver without compromising quality." },
// ];

export const stats = [
    { value: "1200+", label: "Students Supported" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "350+", label: "Papers Published" },
    { value: "15+", label: "Expert Mentors" },
];

// ─── modules/home/constData/const.ts  (WHY_US + SERVICES blocks)
// Replace the existing WHY_US and SERVICES arrays with these.
// All other exports (SLIDER_SLIDES, TESTIMONIALS, ANNOUNCEMENTS, etc.) remain unchanged.

// ─── Why Choose NanoNova ──────────────────────────────────────────────────────
export const WHY_US = [
  {
    icon: "🎓",
    label: "Expertise",
    desc: "Our team consists of experienced academics and professionals who have been where you are and know what it takes to succeed.",
  },
  {
    icon: "🎯",
    label: "Tailored Services",
    desc: "We offer personalized solutions to meet your specific needs, whether you're in the early stages of research or preparing your final submission.",
  },
  {
    icon: "💰",
    label: "Affordable Pricing",
    desc: "We understand the financial constraints of students, so we offer competitive rates without compromising on quality.",
  },
  {
    icon: "🔒",
    label: "Confidentiality",
    desc: "We value your privacy and ensure that your work remains secure and confidential throughout the entire process.",
  },
  {
    icon: "⏰",
    label: "Timely Delivery",
    desc: "We respect deadlines and work diligently to ensure your projects are completed and delivered on time, every time.",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    icon: "📝",
    title: "Thesis & Dissertation Writing",
    desc: "Expert guidance on structure, content development, and formatting — helping you turn your research into a well-crafted thesis or dissertation.",
  },
  {
    icon: "🔬",
    title: "Research Guidance",
    desc: "From formulating research questions to refining methodologies, we help you develop a solid research framework that meets academic standards.",
  },
  {
    icon: "📄",
    title: "Paper Publication Support",
    desc: "We assist in preparing your research for publication — from selecting the right journals to proofreading and meeting submission guidelines.",
  },
  {
    icon: "✏️",
    title: "Academic Editing & Proofreading",
    desc: "Our expert editors review your work for clarity, coherence, grammar, and style, ensuring it meets the highest academic standards.",
  },
  {
    icon: "📊",
    title: "Data Analysis & Statistical Support",
    desc: "Specialized support in statistical analysis, data interpretation, and tools like SPSS, R, and Python — essential for rigorous academic research.",
  },
  {
    icon: "🤝",
    title: "Consultation & Mentorship",
    desc: "Connect with experienced mentors for one-on-one consultations at any stage of your academic project — from research design to final submission.",
  },
];