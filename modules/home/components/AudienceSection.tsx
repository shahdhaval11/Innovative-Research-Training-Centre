import Link from "next/link";
import { ArrowUpRight, CircleCheckBig, Sparkles } from "lucide-react";
import { AUDIENCE_OPTIONS, WHY_NANONOVA } from "../constData/const";
import Reveal from "@/components/ui/Reveal";
import DnaMotif from "@/components/ui/DnaMotif";

export default function AudienceSection() {
  return (
    <section className="section-py relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-24 left-1/2 h-125 w-225 -translate-x-1/2 rounded-full bg-primary-50/70 blur-3xl"
      />
      <DnaMotif
        segments={7}
        className="pointer-events-none absolute top-0 -left-8 h-full w-32 text-primary-600 opacity-[0.05] sm:w-40"
      />

      <div className="container-app relative">
        <div className="mb-9 text-center">
          <span className="eyebrow justify-center">Find Your Path</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            I am looking for<span className="text-primary-600">...</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {AUDIENCE_OPTIONS.map((option, index) => (
            <Reveal
              key={option.title}
              delay={index * 90}
              className={`lg:col-span-2 ${index === 3 ? "lg:col-start-2" : index === 4 ? "lg:col-start-4" : ""}`}
            >
              <Link
                href={option.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-secondary-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-xl ${option.glow}`}
              >
                <div
                  aria-hidden
                  className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-linear-to-br opacity-10 transition-transform duration-500 group-hover:scale-150 ${option.gradient}`}
                />

                <span
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-md ${option.gradient}`}
                >
                  <option.icon className="h-7 w-7" />
                </span>

                <p className="relative mt-4 font-heading text-base font-bold text-secondary-800">
                  {option.title}
                </p>
                <p className="relative mt-1.5 text-sm leading-relaxed text-secondary-500">
                  {option.description}
                </p>

                <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-secondary-400 transition-colors group-hover:text-primary-700">
                  Explore
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mt-10 overflow-hidden rounded-3xl bg-linear-to-br from-secondary-800 via-secondary-800 to-primary-800 px-7 py-8 sm:px-12">
          <div
            aria-hidden
            className="absolute top-1/2 -right-20 h-72 w-72 -translate-y-1/2 rounded-full bg-primary-500/10 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-25 -left-15 h-64 w-64 rounded-full bg-accent-500/10 blur-2xl"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xs shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-primary-300 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Why NanoNova
              </span>
              <h3 className="mt-3 font-heading text-xl font-extrabold text-white sm:text-2xl">
                Why Choose NanoNova?
              </h3>
              <p className="mt-2 text-sm text-secondary-300">
                Everything built around real, practical outcomes.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {WHY_NANONOVA.map((point) => (
                <li key={point.text} className="flex items-center gap-3 text-sm font-medium text-secondary-100">
                  <CircleCheckBig className="h-4 w-4 shrink-0 text-primary-400" />
                  {point.text}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
