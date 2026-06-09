// ─── Static Dashboard Data ────────────────────────────────────────────────────
export const STATS = [
  { label: "Total Students",     value: "1,248", change: "+12%",  up: true,  icon: "🎓", color: "bg-[#6366f1]/15 border-[#6366f1]/25",  iconBg: "bg-[#6366f1]"  },
  { label: "Active Enquiries",   value: "84",    change: "+7%",   up: true,  icon: "💬", color: "bg-[#0ea5e9]/15 border-[#0ea5e9]/25",  iconBg: "bg-[#0ea5e9]"  },
  { label: "Papers Published",   value: "362",   change: "+23%",  up: true,  icon: "📰", color: "bg-[#10b981]/15 border-[#10b981]/25",  iconBg: "bg-[#10b981]"  },
  { label: "Revenue (₹ Lakh)",   value: "18.4",  change: "-2%",   up: false, icon: "💰", color: "bg-[#f59e0b]/15 border-[#f59e0b]/25",  iconBg: "bg-[#f59e0b]"  },
  { label: "Courses Running",    value: "14",    change: "+3",    up: true,  icon: "📚", color: "bg-[#8b5cf6]/15 border-[#8b5cf6]/25",  iconBg: "bg-[#8b5cf6]"  },
  { label: "Team Members",       value: "18",    change: "+2",    up: true,  icon: "👥", color: "bg-[#ec4899]/15 border-[#ec4899]/25",  iconBg: "bg-[#ec4899]"  },
];

export const RECENT_ENQUIRIES = [
  { id: "ENQ-001", name: "Neha Patil",    service: "Thesis Support",        status: "New",        date: "Today, 10:32 AM",   email: "neha@gmail.com"     },
  { id: "ENQ-002", name: "Kiran Joshi",   service: "Data Analysis",         status: "In Progress", date: "Today, 09:15 AM",   email: "kiran@outlook.com"  },
  { id: "ENQ-003", name: "Arjun Mehta",   service: "Publication Support",   status: "Resolved",   date: "Yesterday, 5:40 PM", email: "arjun@gmail.com"    },
  { id: "ENQ-004", name: "Pooja Sharma",  service: "Research Guidance",     status: "New",        date: "Yesterday, 3:12 PM", email: "pooja@yahoo.com"    },
  { id: "ENQ-005", name: "Rahul Singh",   service: "Writing & Editing",     status: "Pending",    date: "Apr 18, 11:00 AM",  email: "rahul@gmail.com"    },
  { id: "ENQ-006", name: "Divya Nair",    service: "Certificate Course",    status: "In Progress", date: "Apr 17, 4:22 PM",   email: "divya@gmail.com"    },
];

export const RECENT_STUDENTS = [
  { id: "STU-101", name: "Dr. Priya Sharma",  course: "PhD – Life Sciences",     status: "Active",    joined: "Jan 2025",  progress: 85 },
  { id: "STU-102", name: "Rahul Mehta",       course: "M.Phil – Economics",      status: "Active",    joined: "Feb 2025",  progress: 62 },
  { id: "STU-103", name: "Anjali Nair",       course: "PhD – Computer Science",  status: "Completed", joined: "Sep 2024",  progress: 100},
  { id: "STU-104", name: "Vikram Desai",      course: "MBA Research",            status: "Active",    joined: "Mar 2025",  progress: 40 },
  { id: "STU-105", name: "Sneha Kulkarni",    course: "PhD – Education",         status: "On Hold",   joined: "Nov 2024",  progress: 55 },
];

export const ACTIVITY_FEED = [
  { icon: "📥", text: "New enquiry from Neha Patil",              time: "2 min ago",  type: "enquiry"   },
  { icon: "✅", text: "Thesis submitted by Dr. Anjali Nair",      time: "1 hr ago",   type: "success"   },
  { icon: "📰", text: "Paper published — Rahul Mehta (Scopus)",   time: "3 hrs ago",  type: "publish"   },
  { icon: "🆕", text: "New student enrolled — Vikram Desai",      time: "5 hrs ago",  type: "student"   },
  { icon: "💬", text: "Chat support resolved — Kiran Joshi",      time: "Yesterday",  type: "chat"      },
  { icon: "📅", text: "Webinar scheduled — Apr 28, 6 PM IST",     time: "Yesterday",  type: "event"     },
  { icon: "⚠️", text: "Enquiry overdue — Pooja Sharma (3 days)",  time: "Yesterday",  type: "warning"   },
  { icon: "🎓", text: "Certificate issued — Divya Nair",          time: "Apr 17",     type: "success"   },
];

export const SERVICE_BREAKDOWN = [
  { label: "Thesis Support",       count: 312, pct: 82, color: "#6366f1" },
  { label: "Research Guidance",    count: 245, pct: 64, color: "#0ea5e9" },
  { label: "Data Analysis",        count: 198, pct: 52, color: "#10b981" },
  { label: "Publication Support",  count: 173, pct: 45, color: "#f59e0b" },
  { label: "Writing & Editing",    count: 164, pct: 43, color: "#8b5cf6" },
  { label: "Training Programs",    count: 156, pct: 41, color: "#ec4899" },
];

export const MONTHLY_DATA = [
  { month: "Oct", students: 62, enquiries: 34 },
  { month: "Nov", students: 78, enquiries: 41 },
  { month: "Dec", students: 55, enquiries: 28 },
  { month: "Jan", students: 92, enquiries: 55 },
  { month: "Feb", students: 108,enquiries: 67 },
  { month: "Mar", students: 134,enquiries: 78 },
  { month: "Apr", students: 148,enquiries: 84 },
];

export const NAV_ITEMS = [
  { icon: "🏠", label: "Dashboard", "link": "/admin/dashboard", active: true  },
  { icon: "📅", label: "Events",    "link": "/admin/events",    active: false },
  { icon: "💬", label: "Enquiries", "link": "/admin/enquiries", active: false },
//   { icon: "🎓", label: "Students",     active: false },
//   { icon: "📝", label: "Services",     active: false },
//   { icon: "📰", label: "Publications", active: false },
//   { icon: "📚", label: "Courses",      active: false },
//   { icon: "👥", label: "Team",         active: false },
//   { icon: "📊", label: "Reports",      active: false },
//   { icon: "⚙️", label: "Settings",     active: false },
];