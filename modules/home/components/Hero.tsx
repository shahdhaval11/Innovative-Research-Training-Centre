import Link from "next/link";
import { ArrowRight, Search, MessageCircle, Users, GraduationCap, Star } from "lucide-react";
import InquiryForm from "./InquiryForm";
import Reveal from "@/components/ui/Reveal";
import HeroBackdrop from "@/components/ui/HeroBackdrop";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-50/60 via-white to-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-secondary-800) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden
        className="animate-float absolute -top-10 -right-10 h-105 w-105 rounded-full bg-primary-100/60 blur-3xl"
      />
      <div
        aria-hidden
        style={{ animationDelay: "-3.5s" }}
        className="animate-float absolute -bottom-15 -left-10 h-105 w-105 rounded-full bg-accent-50 blur-3xl"
      />
      <div className="container-app relative grid grid-cols-1 items-center gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:py-14">
        <Reveal className="lg:col-span-7">
          <span className="eyebrow rounded-full border border-primary-100 bg-primary-50 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
            Welcome to NanoNova Research Training Centre
          </span>

          <h1 className="mt-5 font-heading text-4xl leading-[1.1] font-extrabold text-secondary-800 sm:text-5xl lg:text-6xl">
            Learn. Research.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                Innovate.
              </span>
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-primary-300"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9.5C40 2.5 160 2.5 198 9.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Grow.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary-500 sm:text-lg">
            Industry-oriented training, research guidance and hands-on laboratory experience in{" "}
            <span className="font-semibold text-secondary-700">
              Microbiology, Biotechnology, Bioinformatics, Medical Laboratory Science
            </span>{" "}
            and Pharmaceutical Sciences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link href="/programs" className="btn-primary shadow-lg shadow-primary-600/20">
              Explore Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/research-dissertation" className="btn-outline">
              <Search className="h-4 w-4" />
              Start Your Research
            </Link>
            <Link href="/contactus" className="btn text-secondary-700 hover:text-primary-700">
              <MessageCircle className="h-4 w-4" />
              Talk to an Expert
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-secondary-100 pt-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-600/20">
                <Users className="h-5.5 w-5.5" />
              </span>
              <div>
                <p className="font-heading text-xl font-extrabold text-secondary-800">2500+</p>
                <p className="text-xs text-secondary-500">Students Trained</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-accent-500 to-accent-700 text-white shadow-md shadow-accent-600/20">
                <GraduationCap className="h-5.5 w-5.5" />
              </span>
              <div>
                <p className="font-heading text-xl font-extrabold text-secondary-800">150+</p>
                <p className="text-xs text-secondary-500">Programs Conducted</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative lg:col-span-5">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-br from-primary-200/40 via-transparent to-accent-200/40 blur-xl"
          />
          <InquiryForm />

          <HeroBackdrop
            opacity={0.65}
            className="pointer-events-none absolute top-1/2 left-full ml-4 hidden h-56 w-40 -translate-y-1/2 -rotate-6 lg:block lg:h-[80vh] lg:w-96 xl:w-104"
          />

          {/* <div className="absolute -bottom-6 -left-6 hidden items-center gap-2.5 rounded-2xl border border-secondary-100 bg-white px-4 py-3 shadow-soft sm:flex">
            <div className="flex -space-x-2">
              {["RS", "AP", "ND"].map((initials) => (
                <span
                  key={initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-100 text-[10px] font-bold text-primary-700"
                >
                  {initials}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <p className="text-[11px] font-semibold text-secondary-600">2500+ learners trained</p>
            </div>
          </div> */}
        </Reveal>
      </div>
    </section>
  );
}
