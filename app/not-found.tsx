import type { Metadata } from "next";
import Link from "next/link";
import { Home, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "This page is currently under construction and will be available soon.",
};

export default function NotFound() {
  return (
    <section className="section-py flex min-h-[70vh] items-center">
      <div className="container-app">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl bg-linear-to-r from-secondary-800 to-accent-700 px-8 py-14 text-center sm:px-14">
          <div
            aria-hidden
            className="animate-float absolute top-1/2 -right-15 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-white/5 sm:block"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary-200">
              <Sparkles className="h-3.5 w-3.5" />
              Coming Soon
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              This page is on its way
            </h1>
            <p className="mt-3 text-sm text-secondary-200 sm:text-base">
              We&apos;re currently building this page. Please check back soon, or head
              back home in the meantime.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className="btn-white">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
              <Link href="/contactus" className="btn-outline-light">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
