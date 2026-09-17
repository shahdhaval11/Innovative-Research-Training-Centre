import Link from "next/link";
import { ArrowRight, Clock, BadgeCheck, Flame } from "lucide-react";
import { POPULAR_PROGRAMS } from "../constData/const";
import Reveal from "@/components/ui/Reveal";

export default function PopularPrograms() {
  return (
    <section className="section-py">
      <div className="container-app">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Popular Programs</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
              Industry-Ready Certificate Programs
            </h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            View All Programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_PROGRAMS.map((program, index) => (
            <Reveal key={program.title} delay={(index % 3) * 100}>
            <div className="group overflow-hidden rounded-2xl border border-secondary-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative flex h-32 items-center justify-center overflow-hidden bg-linear-to-br from-secondary-800 via-secondary-700 to-primary-700">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                {index === 0 && (
                  <span className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-wide text-primary-700 uppercase">
                    <Flame className="h-3 w-3" />
                    Trending
                  </span>
                )}
                <program.icon
                  className="relative h-12 w-12 text-white/90 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  strokeWidth={1.5}
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-secondary-800">
                  {program.title}
                </h3>
                <div className="mt-2.5 flex items-center gap-4 text-xs text-secondary-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {program.tag}
                  </span>
                </div>
                <Link
                  href={program.href}
                  className="group/btn mt-4 flex w-full items-center justify-center gap-1.5 rounded-md border border-secondary-800 py-2.5 text-xs font-semibold text-secondary-800 transition-colors hover:bg-secondary-800 hover:text-white"
                >
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
