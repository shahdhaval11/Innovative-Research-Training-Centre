"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SESSION_KEY } from "@/modules/admin/login/constData/const";
import { STATS, RECENT_ENQUIRIES, RECENT_STUDENTS, ACTIVITY_FEED, SERVICE_BREAKDOWN, MONTHLY_DATA } from "@/modules/admin/dashboard/constData/const";
import Sidebar from "@/components/SidebarAdmin";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminUser {
  id: string; name: string; email: string; role: string; avatar: string;
}


// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  "New":         "bg-[#6366f1]/15 text-[#818cf8] border-[#6366f1]/25",
  "In Progress": "bg-[#0ea5e9]/15 text-[#38bdf8] border-[#0ea5e9]/25",
  "Pending":     "bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/25",
  "Resolved":    "bg-[#10b981]/15 text-[#34d399] border-[#10b981]/25",
  "Active":      "bg-[#10b981]/15 text-[#34d399] border-[#10b981]/25",
  "Completed":   "bg-[#6366f1]/15 text-[#818cf8] border-[#6366f1]/25",
  "On Hold":     "bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/25",
};

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ user, onMenuToggle }: { user: AdminUser; onMenuToggle: () => void }) {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" :
    now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="bg-[#1e293b] border-b border-slate-700/50 px-6 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-slate-400 hover:text-white text-xl"
        >
          ☰
        </button>
        <div>
          <p className="text-white font-bold text-sm">
            {greeting}, {user.name.split(" ")[0]}! 👋
          </p>
          <p className="text-slate-500 text-xs">
            {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2">
          <span className="text-slate-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-slate-300 text-xs placeholder-slate-600 outline-none w-32"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-[#0f172a] border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-[#6366f1] flex items-center justify-center font-black text-white text-sm">
          {user.avatar}
        </div>
      </div>
    </header>
  );
}

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
function BarChart() {
  const maxVal = Math.max(...MONTHLY_DATA.map((d) => d.students));
  return (
    <div className="flex items-end gap-3 h-36 pt-2">
      {MONTHLY_DATA.map((d) => (
        <div key={d.month} className="flex flex-col items-center gap-1.5 flex-1">
          <div className="flex flex-col items-center gap-0.5 w-full" style={{ height: "112px" }}>
            {/* Students bar */}
            <div className="w-full flex flex-col justify-end" style={{ height: "112px" }}>
              <div
                className="w-full bg-[#6366f1] rounded-t-md transition-all duration-700 hover:bg-[#818cf8] cursor-default relative group"
                style={{ height: `${(d.students / maxVal) * 100}%` }}
                title={`${d.students} students`}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1e293b] border border-slate-600 text-white text-[10px] px-2 py-0.5 rounded hidden group-hover:block whitespace-nowrap z-10">
                  {d.students} students
                </div>
              </div>
            </div>
          </div>
          <span className="text-slate-500 text-[10px]">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter();
  const [user,       setUser]      = useState<AdminUser | null>(null);
  const [collapsed,  setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu]= useState(false);
  const [activeTab,  setActiveTab] = useState<"enquiries" | "students">("enquiries");

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) { router.replace("/admin/login"); return; }
    try {
      setUser(JSON.parse(raw));
    } catch {
      router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    localStorage.removeItem(SESSION_KEY);
    router.push("/admin/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-[#6366f1]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-slate-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      <div className="flex flex-1 overflow-hidden" style={{ height: "100vh" }}>
        {/* ── Sidebar (desktop) ── */}
        <div className="hidden md:flex flex-col shrink-0">
          <Sidebar
            user={user}
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            onLogout={handleLogout}
          />
        </div>

        {/* ── Mobile sidebar overlay ── */}
        {mobileMenu && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setMobileMenu(false)}
          >
            <div className="w-60 h-full" onClick={(e) => e.stopPropagation()}>
              <Sidebar
                user={user}
                collapsed={false}
                onToggle={() => setMobileMenu(false)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <Topbar user={user} onMenuToggle={() => setMobileMenu(true)} /> */}

          {/* Scrollable body */}
          <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6">

            {/* ── Alert banner ── */}
            <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl px-5 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[#fbbf24] text-base">⚠️</span>
                <p className="text-[#fbbf24] text-sm font-medium">
                  3 enquiries are overdue and need immediate attention.
                </p>
              </div>
              <button className="shrink-0 text-[#fbbf24] border border-[#f59e0b]/40 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#f59e0b]/20 transition-colors">
                View →
              </button>
            </div>

            {/* ── Stats grid ── */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`bg-[#1e293b] border ${s.color} rounded-2xl p-4 flex flex-col gap-3`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center text-lg`}>
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        s.up
                          ? "bg-[#10b981]/15 text-[#34d399]"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {s.up ? "↑" : "↓"} {s.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-black text-xl leading-none">{s.value}</p>
                    <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Main grid: Chart + Activity ── */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Bar chart */}
              <div className="lg:col-span-2 bg-[#1e293b] border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-sm">Monthly Student Growth</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Oct 2024 – Apr 2025</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-[#6366f1] inline-block" />
                      <span className="text-slate-400">Students</span>
                    </span>
                  </div>
                </div>
                <BarChart />
              </div>

              {/* Activity feed */}
              <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-6 flex flex-col">
                <h3 className="text-white font-bold text-sm mb-4">Recent Activity</h3>
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                  {ACTIVITY_FEED.map((a, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-sm shrink-0">
                        {a.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 text-xs leading-snug">{a.text}</p>
                        <p className="text-slate-600 text-[10px] mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Service breakdown + Table tabs ── */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Service breakdown */}
              <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-white font-bold text-sm mb-5">Service Breakdown</h3>
                <div className="flex flex-col gap-4">
                  {SERVICE_BREAKDOWN.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-slate-300 text-xs">{s.label}</span>
                        <span className="text-slate-400 text-xs">{s.count} students</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data tables with tabs */}
              <div className="lg:col-span-2 bg-[#1e293b] border border-slate-700/50 rounded-2xl p-6">
                {/* Tabs */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1 bg-[#0f172a] rounded-xl p-1">
                    {(["enquiries", "students"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-xs font-bold px-4 py-1.5 rounded-lg capitalize transition-all duration-200 ${
                          activeTab === tab
                            ? "bg-[#6366f1] text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button className="text-[#818cf8] text-xs font-bold hover:text-[#6366f1] transition-colors">
                    View All →
                  </button>
                </div>

                {/* Enquiries table */}
                {activeTab === "enquiries" && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          {["ID", "Student", "Service", "Status", "Date"].map((h) => (
                            <th key={h} className="text-slate-500 text-[10px] font-bold uppercase tracking-wider pb-3 pr-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_ENQUIRIES.map((e) => (
                          <tr key={e.id} className="border-t border-slate-700/40 hover:bg-slate-700/20 transition-colors group">
                            <td className="py-2.5 pr-4 text-[#818cf8] text-xs font-bold">{e.id}</td>
                            <td className="py-2.5 pr-4">
                              <p className="text-slate-200 text-xs font-semibold">{e.name}</p>
                              <p className="text-slate-500 text-[10px]">{e.email}</p>
                            </td>
                            <td className="py-2.5 pr-4 text-slate-400 text-xs">{e.service}</td>
                            <td className="py-2.5 pr-4">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[e.status]}`}>
                                {e.status}
                              </span>
                            </td>
                            <td className="py-2.5 text-slate-500 text-[10px]">{e.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Students table */}
                {activeTab === "students" && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          {["ID", "Student", "Course", "Progress", "Status"].map((h) => (
                            <th key={h} className="text-slate-500 text-[10px] font-bold uppercase tracking-wider pb-3 pr-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_STUDENTS.map((s) => (
                          <tr key={s.id} className="border-t border-slate-700/40 hover:bg-slate-700/20 transition-colors">
                            <td className="py-2.5 pr-4 text-[#818cf8] text-xs font-bold">{s.id}</td>
                            <td className="py-2.5 pr-4">
                              <p className="text-slate-200 text-xs font-semibold">{s.name}</p>
                              <p className="text-slate-500 text-[10px]">Joined {s.joined}</p>
                            </td>
                            <td className="py-2.5 pr-4 text-slate-400 text-xs">{s.course}</td>
                            <td className="py-2.5 pr-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-[#6366f1]"
                                    style={{ width: `${s.progress}%` }}
                                  />
                                </div>
                                <span className="text-slate-400 text-[10px] w-8 shrink-0">{s.progress}%</span>
                              </div>
                            </td>
                            <td className="py-2.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[s.status]}`}>
                                {s.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* ── Quick Actions ── */}
            <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-white font-bold text-sm mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { icon: "➕", label: "Add Student"    },
                  { icon: "📋", label: "New Enquiry"    },
                  { icon: "📅", label: "Schedule Event" },
                  { icon: "📤", label: "Send Email"     },
                  { icon: "📝", label: "Write Post"     },
                  { icon: "📊", label: "View Reports"   },
                  { icon: "🎓", label: "Issue Cert"     },
                  { icon: "⚙️", label: "Settings"       },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="flex flex-col items-center gap-2 bg-[#0f172a] border border-slate-700 hover:border-[#6366f1]/50 rounded-xl py-4 px-2 transition-all duration-200 group hover:bg-[#6366f1]/5"
                  >
                    <span className="text-2xl">{a.icon}</span>
                    <span className="text-slate-400 text-[10px] font-semibold group-hover:text-[#818cf8] transition-colors text-center leading-tight">
                      {a.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-slate-700 text-xs pb-4">
              IRTC Admin Panel · v1.0 · {new Date().getFullYear()} Nanonova Research & Training Centre
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}