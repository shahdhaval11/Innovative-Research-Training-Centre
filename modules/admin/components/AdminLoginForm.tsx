"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputClass =
    "w-full rounded-md border border-secondary-200 bg-white py-3 pl-10 pr-10 text-sm text-secondary-800 placeholder:text-secondary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message ?? "Invalid email or password.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-secondary-600">
          Email Address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-secondary-400" />
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="admin@nanonova.in"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-secondary-600">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-secondary-400" />
          <input
            required
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 text-sm">
        <label className="flex items-center gap-2 text-secondary-600">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={() => toast.info("Please contact the system administrator to reset your password.")}
          className="font-semibold text-primary-700 hover:text-primary-800"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-2 w-full disabled:opacity-70"
      >
        {submitting ? "Signing in..." : "Sign In"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
