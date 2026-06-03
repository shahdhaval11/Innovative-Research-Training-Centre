
// ─── Stats Cards ─────────────────────────────────────────────────────────────
export const STATS = [
  { label: "Total Students",    value: 248,  trend: "+12%", up: true,  icon: "🎓", color: "bg-[#6366f1]" },
  { label: "Active Enquiries",  value: 34,   trend: "+5%",  up: true,  icon: "📩", color: "bg-[#0ea5e9]" },
  { label: "Events This Month", value: 6,    trend: "-1",   up: false, icon: "📅", color: "bg-[#f59e0b]" },
  { label: "Publications",      value: 91,   trend: "+8%",  up: true,  icon: "📄", color: "bg-[#10b981]" },
  { label: "Overdue Follow-ups",value: 7,    trend: "+3",   up: false, icon: "⚠️", color: "bg-red-500"   },
  { label: "Revenue (₹)",       value: "4.2L",trend: "+18%",up: true,  icon: "💰", color: "bg-[#8b5cf6]" },
];

// ─── Monthly Data ─────────────────────────────────────────────────────────────
export const MONTHLY_DATA = [
  { month: "Oct", students: 28 },
  { month: "Nov", students: 35 },
  { month: "Dec", students: 22 },
  { month: "Jan", students: 40 },
  { month: "Feb", students: 38 },
  { month: "Mar", students: 52 },
  { month: "Apr", students: 45 },
];

// ─── Activity Feed ────────────────────────────────────────────────────────────
export const ACTIVITY_FEED = [
  { id: 1, type: "enquiry",   text: "New enquiry from Priya Sharma — Data Analysis support", time: "2 min ago",  icon: "📩" },
  { id: 2, type: "student",   text: "Student Rahul Mehta enrolled in Thesis Writing Program", time: "14 min ago", icon: "🎓" },
  { id: 3, type: "event",     text: "Webinar 'Research Methodology' — 120 registrations",    time: "1 hr ago",   icon: "📅" },
  { id: 4, type: "payment",   text: "Payment ₹8,500 received from Anjali Patel",              time: "2 hr ago",   icon: "💰" },
  { id: 5, type: "publish",   text: "Publication support completed for Dr. Suresh Kumar",    time: "3 hr ago",   icon: "📄" },
  { id: 6, type: "enquiry",   text: "Enquiry resolved — SPSS Analysis (Amit Desai)",         time: "5 hr ago",   icon: "✅" },
];

// ─── Service Breakdown ────────────────────────────────────────────────────────
export const SERVICE_BREAKDOWN = [
  { label: "Thesis / Dissertation", pct: 38, color: "bg-[#6366f1]" },
  { label: "Data Analysis",         pct: 27, color: "bg-[#0ea5e9]" },
  { label: "Publication Support",   pct: 18, color: "bg-[#10b981]" },
  { label: "Training Programs",     pct: 10, color: "bg-[#f59e0b]" },
  { label: "Other Services",        pct: 7,  color: "bg-slate-500"  },
];

// ─── Recent Enquiries ─────────────────────────────────────────────────────────
export const RECENT_ENQUIRIES = [
  { id: "ENQ-041", name: "Priya Sharma",   service: "Data Analysis",  status: "New",         date: "Today" },
  { id: "ENQ-040", name: "Vikram Nair",    service: "Thesis Writing", status: "In Progress", date: "Yesterday" },
  { id: "ENQ-039", name: "Sunita Rao",     service: "Publication",    status: "Pending",     date: "Apr 25" },
  { id: "ENQ-038", name: "Arjun Kapoor",   service: "SPSS Training",  status: "Resolved",    date: "Apr 24" },
  { id: "ENQ-037", name: "Meena Iyer",     service: "Research Guide", status: "In Progress", date: "Apr 23" },
];

// ─── Recent Students ──────────────────────────────────────────────────────────
export const RECENT_STUDENTS = [
  { id: "STU-112", name: "Rahul Mehta",    program: "Thesis Writing Program", status: "Active",    joined: "Apr 26" },
  { id: "STU-111", name: "Anjali Patel",   program: "Data Analysis Course",   status: "Active",    joined: "Apr 24" },
  { id: "STU-110", name: "Dr. Suresh K.",  program: "Publication Support",    status: "Completed", joined: "Mar 10" },
  { id: "STU-109", name: "Fatima Sheikh",  program: "Research Methodology",   status: "On Hold",   joined: "Mar 05" },
  { id: "STU-108", name: "Rohan Desai",    program: "Academic Writing",       status: "Active",    joined: "Feb 28" },
];