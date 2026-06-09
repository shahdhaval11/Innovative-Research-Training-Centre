"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SESSION_KEY } from "@/modules/admin/login/constData/const";
import SidebarAdmin from "@/components/SidebarAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminUser {
  id: string; name: string; email: string; role: string; avatar: string;
}

interface EnquiryRecord {
  id:        string;
  name:      string;
  email:     string;
  phone:     string;
  subject:   string;
  service:   string;
  message:   string;
  createdAt: string;
}

interface Pagination {
  page:       number;
  limit:      number;
  total:      number;
  totalPages: number;
  hasNext:    boolean;
  hasPrev:    boolean;
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ user, onMenuToggle }: { user: AdminUser; onMenuToggle: () => void }) {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" :
    now.getHours() < 17 ? "Good afternoon" : "Good evening";
  return (
    <header className="bg-[#1e293b] border-b border-slate-700/50 px-6 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="md:hidden text-slate-400 hover:text-white text-xl">☰</button>
        <div>
          <p className="text-white font-bold text-sm">{greeting}, {user.name.split(" ")[0]}! 👋</p>
          <p className="text-slate-500 text-xs">
            {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#6366f1] flex items-center justify-center font-black text-white text-sm">
          {user.avatar}
        </div>
      </div>
    </header>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────
function EnquiryModal({ enquiry, onClose }: { enquiry: EnquiryRecord; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const formatDate = (iso: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        })
      : "—";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-[#1e293b] border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center text-lg">
              💬
            </div>
            <div>
              <h2 className="text-white font-black text-lg leading-tight">Enquiry Details</h2>
              <p className="text-slate-500 text-xs">{enquiry.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          {/* Sender info */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name",   value: enquiry.name    },
              { label: "Email",       value: enquiry.email   },
              { label: "Phone",       value: enquiry.phone   },
              { label: "Received On", value: formatDate(enquiry.createdAt) },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide">{f.label}</p>
                <p className="text-slate-200 text-sm font-medium break-all">{f.value || "—"}</p>
              </div>
            ))}
          </div>

          {/* Service + Subject */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide">Service</p>
              <span className="inline-block bg-[#6366f1]/15 text-[#818cf8] border border-[#6366f1]/25 text-xs font-bold px-3 py-1 rounded-full w-fit">
                {enquiry.service || "—"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide">Subject</p>
              <p className="text-slate-200 text-sm font-medium">{enquiry.subject || "—"}</p>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide">Message</p>
            <div className="bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-4 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {enquiry.message || "—"}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-700/50 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="animate-spin w-6 h-6 text-[#6366f1]" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Enquiries() {
  const router = useRouter();

  const [user,       setUser]      = useState<AdminUser | null>(null);
  const [collapsed,  setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu]= useState(false);
  const [enquiries,  setEnquiries] = useState<EnquiryRecord[]>([]);
  const [pagination, setPagination]= useState<Pagination | null>(null);
  const [loading,    setLoading]   = useState(false);
  const [viewTarget, setViewTarget]= useState<EnquiryRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Auth guard
  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) { router.replace("/admin/login"); return; }
    try { setUser(JSON.parse(raw)); } catch { router.replace("/admin/login"); }
  }, [router]);

  // Fetch enquiries when user or page changes
  useEffect(() => {
    if (!user) return;
    fetchPage(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentPage]);

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/enquiries?page=${page}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        setPagination(data.pagination);
      } else {
        toast.error("Failed to load enquiries.");
      }
    } catch {
      toast.error("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (iso: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-IN", {
          day: "numeric", month: "short", year: "numeric",
        })
      : "—";

  const formatTime = (iso: string) =>
    iso
      ? new Date(iso).toLocaleTimeString("en-IN", {
          hour: "2-digit", minute: "2-digit",
        })
      : "";

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    localStorage.removeItem(SESSION_KEY);
    router.push("/admin/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Pagination page numbers (window of 5)
  const buildPageNumbers = (): (number | "…")[] => {
    if (!pagination) return [];
    const { totalPages } = pagination;
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) {
      pages.push(p);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = buildPageNumbers();

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      <div className="flex flex-1 overflow-hidden" style={{ height: "100vh" }}>

        {/* Sidebar — desktop */}
        <div className="hidden md:flex flex-col shrink-0">
          <SidebarAdmin
            user={user}
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            onLogout={handleLogout}
          />
        </div>

        {/* Sidebar — mobile overlay */}
        {mobileMenu && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setMobileMenu(false)}>
            <div className="w-60 h-full" onClick={(e) => e.stopPropagation()}>
              <SidebarAdmin
                user={user}
                collapsed={false}
                onToggle={() => setMobileMenu(false)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar user={user} onMenuToggle={() => setMobileMenu(true)} />

          <main className="flex-1 overflow-y-auto text-white">

            {/* Page header */}
            <div className="bg-[#1e293b] border-b border-slate-700/50 px-6 py-5">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <span>Admin</span><span>›</span><span className="text-[#818cf8]">Enquiries</span>
                </div>
                <h1 className="text-white font-black text-2xl">Enquiries</h1>
                <p className="text-slate-400 text-sm mt-0.5">All contact form submissions, sorted by latest first.</p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

              {/* Stats strip */}
              {pagination && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Total Enquiries",   value: pagination.total,      icon: "💬", color: "bg-[#6366f1]" },
                    { label: "This Page",         value: enquiries.length,      icon: "📄", color: "bg-[#0ea5e9]" },
                    { label: "Total Pages",       value: pagination.totalPages, icon: "📑", color: "bg-[#10b981]" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl shrink-0`}>
                        {s.icon}
                      </div>
                      <div>
                        <p className="text-white font-black text-2xl leading-none">{s.value}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table card */}
              <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl overflow-hidden">

                {loading ? (
                  <div className="flex items-center justify-center py-20 gap-3">
                    <Spinner />
                    <p className="text-slate-400 text-sm">Loading enquiries...</p>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-700/30 flex items-center justify-center text-4xl">📭</div>
                    <div className="text-center">
                      <p className="text-white font-bold text-base">No enquiries yet</p>
                      <p className="text-slate-500 text-sm mt-1">Enquiries submitted via the contact form will appear here.</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-700/50">
                          {["#", "Name", "Email", "Phone", "Service", "Subject", "Message", "Date & Time", "Action"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.map((enq, idx) => {
                          const rowNum = (currentPage - 1) * 15 + idx + 1;
                          return (
                            <tr
                              key={enq.id}
                              className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors group"
                            >
                              {/* # */}
                              <td className="px-4 py-3.5 text-slate-500 text-xs shrink-0">{rowNum}</td>

                              {/* Name */}
                              <td className="px-4 py-3.5 min-w-[130px]">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-[#6366f1]/20 border border-[#6366f1]/25 flex items-center justify-center text-[#818cf8] font-black text-xs shrink-0">
                                    {enq.name.charAt(0).toUpperCase()}
                                  </div>
                                  <p className="text-white font-semibold text-sm leading-tight whitespace-nowrap">{enq.name}</p>
                                </div>
                              </td>

                              {/* Email */}
                              <td className="px-4 py-3.5 min-w-[180px]">
                                <a
                                  href={`mailto:${enq.email}`}
                                  className="text-[#818cf8] text-xs hover:text-[#6366f1] transition-colors"
                                >
                                  {enq.email}
                                </a>
                              </td>

                              {/* Phone */}
                              <td className="px-4 py-3.5 text-slate-300 text-xs whitespace-nowrap">
                                {enq.phone}
                              </td>

                              {/* Service */}
                              <td className="px-4 py-3.5 min-w-[140px]">
                                <span className="bg-[#6366f1]/15 text-[#818cf8] border border-[#6366f1]/25 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                                  {enq.service}
                                </span>
                              </td>

                              {/* Subject */}
                              <td className="px-4 py-3.5 min-w-[160px]">
                                <p className="text-slate-200 text-xs font-medium line-clamp-1">{enq.subject}</p>
                              </td>

                              {/* Message preview */}
                              <td className="px-4 py-3.5 min-w-[200px] max-w-[220px]">
                                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{enq.message}</p>
                              </td>

                              {/* Date & Time */}
                              <td className="px-4 py-3.5 min-w-[110px]">
                                <p className="text-slate-200 text-xs font-medium">{formatDate(enq.createdAt)}</p>
                                <p className="text-slate-500 text-[10px] mt-0.5">{formatTime(enq.createdAt)}</p>
                              </td>

                              {/* Action */}
                              <td className="px-4 py-3.5">
                                <button
                                  onClick={() => setViewTarget(enq)}
                                  title="View full enquiry"
                                  className="w-8 h-8 rounded-lg bg-slate-700/40 hover:bg-[#6366f1]/20 border border-transparent hover:border-[#6366f1]/30 text-slate-400 hover:text-[#818cf8] flex items-center justify-center text-sm transition-all"
                                >
                                  👁️
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Table footer + pagination */}
                {pagination && enquiries.length > 0 && (
                  <div className="px-5 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Record count */}
                    <p className="text-slate-500 text-xs">
                      Showing{" "}
                      <span className="text-slate-300 font-semibold">
                        {(currentPage - 1) * 15 + 1}–{Math.min(currentPage * 15, pagination.total)}
                      </span>{" "}
                      of{" "}
                      <span className="text-slate-300 font-semibold">{pagination.total}</span>{" "}
                      enquiries
                    </p>

                    {/* Pagination controls */}
                    <div className="flex items-center gap-1.5">
                      {/* Prev */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.hasPrev || loading}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-xs font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ← Prev
                      </button>

                      {/* Page numbers */}
                      {pageNumbers.map((p, i) =>
                        p === "…" ? (
                          <span key={`ellipsis-${i}`} className="px-2 text-slate-600 text-xs select-none">…</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => handlePageChange(p as number)}
                            disabled={loading}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all disabled:cursor-not-allowed ${
                              p === currentPage
                                ? "bg-[#6366f1] text-white border border-[#6366f1]"
                                : "border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}

                      {/* Next */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.hasNext || loading}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-xs font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* View modal */}
      {viewTarget && (
        <EnquiryModal enquiry={viewTarget} onClose={() => setViewTarget(null)} />
      )}

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}
