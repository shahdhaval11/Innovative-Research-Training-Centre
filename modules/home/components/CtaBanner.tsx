import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="section-py">
      <div className="container-app">
        <Reveal className="relative overflow-hidden rounded-2xl bg-linear-to-r from-secondary-800 to-accent-700 px-8 py-9 text-center sm:px-14 sm:text-left">
          <div
            aria-hidden
            className="animate-float absolute top-1/2 -right-15 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-white/5 sm:block"
          />
          <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Have a Research Idea or Career Goal?
              </h2>
              <p className="mt-2 text-sm text-secondary-200 sm:text-base">
                Let&apos;s turn it into a practical learning journey together.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contactus" className="btn-white">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/knowledge-hub" className="btn-outline-light">
                <Download className="h-4 w-4" />
                Download Brochure
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
