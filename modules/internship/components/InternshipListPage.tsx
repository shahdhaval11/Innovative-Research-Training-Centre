"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import {
  INTERNSHIP_DURATIONS,
  formatFee,
  type ManagedInternship,
} from "@/modules/admin/constData/internshipManage";
import ApplyNowModal from "@/components/common/ApplyNowModal";
import InternshipDetailModal from "./InternshipDetailModal";
import { INTERNSHIP_MODE_LABEL } from "../constData";
import type { InternshipMode } from "../types";

const MODES: InternshipMode[] = ["online", "offline"];

// Descriptions are rich-text HTML; cards show a plain-text preview.
function toPlainText(html: string): string {
  return html
    .replace(/<\/(p|div|li|h[1-6])>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export default function InternshipListPage({
  mode,
  internships,
}: {
  mode: InternshipMode;
  internships: ManagedInternship[];
}) {
  const [detailOf, setDetailOf] = useState<ManagedInternship | null>(null);
  const [applyFor, setApplyFor] = useState<ManagedInternship | null>(null);

  return (
    <section className="section-py">
      <div className="container-app">
        <div className="mb-8">
          <span className="eyebrow">Internship Programs</span>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            {INTERNSHIP_MODE_LABEL[mode]} Internships
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-secondary-500">
            Choose from our life-science internship tracks designed to build practical,
            industry-ready skills.
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

        {internships.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-secondary-200 p-10 text-center text-sm text-secondary-500">
            No {INTERNSHIP_MODE_LABEL[mode].toLowerCase()} internships available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {internships.map((item, index) => {
              const duration = INTERNSHIP_DURATIONS.find((d) => d.value === item.duration);
              return (
                <Reveal key={item.id} delay={(index % 3) * 100}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-secondary-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.internshipDomain}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {duration && (
                        <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-wide text-secondary-800 uppercase">
                          {duration.label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="eyebrow">{item.internshipDomain}</span>
                      <h3 className="mt-1.5 font-heading text-base font-bold text-secondary-800">
                        {item.track}
                      </h3>
                      <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-secondary-500">
                        {toPlainText(item.description)}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        {duration && (
                          <span className="font-heading text-lg font-extrabold text-secondary-800">
                            {formatFee(duration.fee)}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => setDetailOf(item)}
                          className="rounded-md border border-secondary-800 px-4 py-2 text-xs font-semibold text-secondary-800 transition-colors hover:bg-secondary-800 hover:text-white"
                        >
                          Show Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {detailOf && (
        <InternshipDetailModal
          internship={detailOf}
          onClose={() => setDetailOf(null)}
          onApply={() => {
            setApplyFor(detailOf);
            setDetailOf(null);
          }}
        />
      )}

      {applyFor && (
        <ApplyNowModal
          open
          onClose={() => setApplyFor(null)}
          internshipId={applyFor.id}
          programName={applyFor.track}
          programMode={applyFor.mode}
          amount={INTERNSHIP_DURATIONS.find((d) => d.value === applyFor.duration)?.fee}
        />
      )}
    </section>
  );
}
