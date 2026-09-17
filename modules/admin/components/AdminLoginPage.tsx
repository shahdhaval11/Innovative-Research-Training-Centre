import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import DnaMotif from "@/components/ui/DnaMotif";
import Logo from "@/components/layout/Logo";
import AdminLoginForm from "./AdminLoginForm";

const HIGHLIGHTS = [
  "Manage student & workshop enquiries",
  "Update programs, courses & content",
  "Review registrations at a glance",
];

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-secondary-800 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <DnaMotif
          segments={10}
          className="pointer-events-none absolute top-1/2 right-[-2rem] h-[140%] w-auto -translate-y-1/2 text-primary-400/10"
        />

        <Logo variant="dark" />

        <div className="relative">
          <span className="eyebrow text-primary-300">Admin Console</span>
          <h1 className="mt-3 font-heading text-3xl font-extrabold text-white">
            Run NanoNova&apos;s back office, all in one place.
          </h1>
          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-secondary-200">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-secondary-400">
          &copy; {new Date().getFullYear()} NanoNova Research Training Centre
        </p>
      </section>

      <section className="flex items-center justify-center bg-white px-5 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary-500 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </Link>

          <div className="mt-8 lg:hidden">
            <Logo />
          </div>

          <div className="mt-6">
            <span className="eyebrow">Admin Login</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm text-secondary-500">
              Sign in with your admin credentials to continue.
            </p>
          </div>

          <AdminLoginForm />
        </div>
      </section>
    </div>
  );
}
