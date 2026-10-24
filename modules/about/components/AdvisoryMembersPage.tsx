"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import DnaMotif from "@/components/ui/DnaMotif";

type AdvisoryMember = {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  photo: string;
};

function initialsOf(name: string): string {
  return name
    .replace(/\b(dr|prof|mr|mrs|ms)\.?\s/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function MemberCard({ member }: { member: AdvisoryMember }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-secondary-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl">
      <div className="relative aspect-4/5 overflow-hidden bg-linear-to-br from-secondary-700 via-secondary-600 to-primary-700">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-heading text-6xl font-extrabold text-white/80">
              {initialsOf(member.name)}
            </span>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-secondary-900/50 to-transparent"
        />
      </div>

      <div className="relative flex flex-1 flex-col px-5 pt-5 pb-6 text-center">
        <span
          aria-hidden
          className="absolute -top-px left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-full bg-linear-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-24"
        />
        <h3 className="font-heading text-lg font-bold text-secondary-800">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold text-primary-600">{member.designation}</p>
        <p className="mt-3 inline-flex items-start justify-center gap-1.5 text-sm leading-snug text-secondary-500">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary-300" />
          <span>{member.affiliation}</span>
        </p>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-secondary-100 bg-white">
      <div className="aspect-4/5 bg-secondary-100" />
      <div className="space-y-3 px-5 py-6">
        <div className="mx-auto h-4 w-2/3 rounded bg-secondary-100" />
        <div className="mx-auto h-3 w-1/2 rounded bg-secondary-100" />
        <div className="mx-auto h-3 w-3/4 rounded bg-secondary-100" />
      </div>
    </div>
  );
}

export default function AdvisoryMembersPage() {
  const [members, setMembers] = useState<AdvisoryMember[]>([]);
  const [status, setStatus] = useState<"loading" | "succeeded" | "failed">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/advisory-team")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!cancelled) {
          setMembers(data.members as AdvisoryMember[]);
          setStatus("succeeded");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-secondary-800 via-secondary-700 to-secondary-600 py-14 text-white sm:py-16">
        <DnaMotif
          segments={7}
          className="pointer-events-none absolute top-0 -right-8 h-full w-32 text-white opacity-[0.07] sm:w-44"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"
        />
        <div className="container-app relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-primary-200 uppercase">
              About Us
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold sm:text-4xl">
              Our Advisory Members
              <span className="text-primary-400">.</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-secondary-100 sm:text-base">
              Distinguished academicians, scientists and industry leaders who guide our programs
              and uphold the quality of research training at NanoNova.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-py">
        <div className="container-app">
          {status === "loading" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {status === "failed" && (
            <p className="rounded-2xl border border-dashed border-secondary-200 p-10 text-center text-sm text-secondary-500">
              We couldn&apos;t load our advisory members right now. Please try again shortly.
            </p>
          )}

          {status === "succeeded" && members.length === 0 && (
            <p className="rounded-2xl border border-dashed border-secondary-200 p-10 text-center text-sm text-secondary-500">
              Our advisory members will be announced soon.
            </p>
          )}

          {status === "succeeded" && members.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((member, index) => (
                <Reveal key={member.id} delay={(index % 4) * 100} className="h-full">
                  <MemberCard member={member} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
