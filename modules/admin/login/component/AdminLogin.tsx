"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SESSION_KEY, DEMO_ACCOUNTS } from "@/modules/admin/login/constData/const";

export default function AdminLogin() {
  const router = useRouter();

  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [demoOpen,   setDemoOpen]   = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) router.replace("/admin/dashboard");
  }, [router]);

  const handleLogin = async () => {
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password)      { setError("Please enter your password.");      return; }

    setLoading(true);
    try {
      const res  = await fetch("/api/admin/auth", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        router.push("/admin/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  const fillDemo = (acc: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setDemoOpen(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e293b] flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#6366f1]/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6366f1]/8 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#818cf8]/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-[#6366f1] flex items-center justify-center font-black text-white text-base">
              NR
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide">Nanonova Research</p>
              <p className="text-[#818cf8] text-xs tracking-widest uppercase">& Training Centre</p>
            </div>
          </div>
        </div>

        {/* Main brand copy */}
        <div className="relative z-10">
          <div className="w-14 h-1 bg-[#6366f1] rounded-full mb-6" />
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Admin <span className="text-[#818cf8]">Control</span> Panel
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm">
            Manage students, services, publications, enquiries, and all platform
            content from one unified dashboard.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "🎓", label: "Student Management" },
              { icon: "📊", label: "Analytics & Reports" },
              { icon: "📝", label: "Content Management" },
              { icon: "💬", label: "Enquiry & Support" },
              { icon: "📰", label: "Publication Tracker" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center text-sm">
                  {f.icon}
                </div>
                <span className="text-slate-300 text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative z-10">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} NRTC Admin Panel · Restricted Access
          </p>
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#6366f1] flex items-center justify-center font-black text-white">
            NR
          </div>
          <div>
            <p className="text-white font-bold text-sm">Nanonova Research</p>
            <p className="text-[#818cf8] text-xs tracking-widest uppercase">& Training Centre</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center text-2xl mb-4">
                🔐
              </div>
              <h2 className="text-white font-black text-2xl mb-1">Welcome back</h2>
              <p className="text-slate-400 text-sm">Sign in to access your admin dashboard</p>
            </div>

            {/* Error alert */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
                <span className="text-red-400 text-base shrink-0 mt-0.5">⚠</span>
                <p className="text-red-400 text-sm leading-relaxed">{error}</p>
              </div>
            )}

            {/* Fields */}
            <div className="flex flex-col gap-4 mb-6">
              {/* Email */}
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">📧</span>
                  <input
                    type="email"
                    placeholder="admin@irtcentre.in"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔑</span>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-10 pr-12 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 accent-[#6366f1]" />
                <span className="text-slate-400 text-xs">Remember me</span>
              </label>
              <a href="#" className="text-[#818cf8] text-xs hover:text-[#6366f1] transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full font-black py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg ${
                loading
                  ? "bg-[#6366f1]/50 text-white/50 cursor-not-allowed"
                  : "bg-[#6366f1] text-white hover:bg-[#4f46e5] active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In to Dashboard →"
              )}
            </button>

            {/* Demo accounts */}
            <div className="mt-6 border-t border-slate-700/50 pt-5">
              <button
                onClick={() => setDemoOpen(!demoOpen)}
                className="w-full text-center text-slate-500 text-xs hover:text-slate-300 transition-colors font-medium flex items-center justify-center gap-1"
              >
                <span>🔍</span>
                <span>Demo Credentials</span>
                <span className={`transition-transform duration-200 ${demoOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              {demoOpen && (
                <div className="mt-3 flex flex-col gap-2">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      onClick={() => fillDemo(acc)}
                      className="flex items-center justify-between bg-[#0f172a] border border-slate-700 hover:border-[#6366f1]/50 rounded-xl px-4 py-3 text-left transition-all duration-200 group"
                    >
                      <div>
                        <p className="text-white text-xs font-bold group-hover:text-[#818cf8] transition-colors">
                          {acc.label}
                        </p>
                        <p className="text-slate-500 text-xs">{acc.email}</p>
                      </div>
                      <span className="text-[#6366f1] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Use →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Security note */}
          <div className="mt-5 flex items-center justify-center gap-2 text-slate-600 text-xs">
            <span>🔒</span>
            <span>Secure admin access · Authorised personnel only</span>
          </div>
        </div>
      </div>
    </div>
  );
}