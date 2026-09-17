"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ApplyNowModal from "@/components/common/ApplyNowModal";
import { INTERNSHIP_MODE_LABEL } from "../constData";
import type { Internship, InternshipFee, InternshipMode } from "../types";

const FEE_OPTIONS: { label: string; value: InternshipFee | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

const MODES: InternshipMode[] = ["online", "offline"];

export default function InternshipListPage({
  mode,
  internships,
}: {
  mode: InternshipMode;
  internships: Internship[];
}) {
  const [feeFilter, setFeeFilter] = useState<InternshipFee | "all">("all");
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const filtered = useMemo(
    () =>
      feeFilter === "all"
        ? internships
        : internships.filter((item) => item.fee === feeFilter),
    [internships, feeFilter],
  );

  return (
    <section className="section-py">
      <div className="container-app">
        <div className="mb-8">
          <span className="eyebrow">Internship Programs</span>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            {INTERNSHIP_MODE_LABEL[mode]} Internships
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-secondary-500">
            Choose from {internships.length}+ life-science internship tracks designed to build
            practical, industry-ready skills.
          </p>

          <div className="mt-5 inline-flex rounded-lg border border-secondary-100 bg-white p-1">
            {MODES.map((m) => (
              <Link
                key={m}
                href={`/internship/${m}`}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  m === mode
                    ? "bg-secondary-800 text-white"
                    : "text-secondary-600 hover:bg-secondary-50"
                }`}
              >
                {INTERNSHIP_MODE_LABEL[m]}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl border border-secondary-100 bg-white p-5 lg:sticky lg:top-24">
            <h2 className="font-heading text-sm font-bold text-secondary-800">Filters</h2>
            <div className="mt-4">
              <label
                htmlFor="fee-filter"
                className="mb-1.5 block text-xs font-semibold tracking-wide text-secondary-500 uppercase"
              >
                Internship Fee
              </label>
              <div className="relative">
                <select
                  id="fee-filter"
                  value={feeFilter}
                  onChange={(e) => setFeeFilter(e.target.value as InternshipFee | "all")}
                  className="w-full appearance-none rounded-md border border-secondary-200 bg-white py-2.5 pr-8 pl-3 text-sm font-medium text-secondary-800 focus:border-primary-500 focus:outline-none"
                >
                  {FEE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              </div>
            </div>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-secondary-200 p-10 text-center text-sm text-secondary-500">
                No internships match the selected filter.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item, index) => (
                  <Reveal key={item.slug} delay={(index % 3) * 100}>
                    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-secondary-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.internshipDomain}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span
                          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${
                            item.fee === "free"
                              ? "bg-primary-500 text-white"
                              : "bg-white/95 text-secondary-800"
                          }`}
                        >
                          {item.fee}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="eyebrow">{item.internshipDomain}</span>
                        <h3 className="mt-1.5 font-heading text-base font-bold text-secondary-800">
                          {item.track}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary-500">
                          {item.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedInternship(item)}
                          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md border border-secondary-800 py-2.5 text-xs font-semibold text-secondary-800 transition-colors hover:bg-secondary-800 hover:text-white"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedInternship && (
        <ApplyNowModal
          open
          onClose={() => setSelectedInternship(null)}
          internshipId={selectedInternship.id}
          programName={selectedInternship.track}
          programMode={INTERNSHIP_MODE_LABEL[mode]}
        />
      )}
    </section>
  );
}
