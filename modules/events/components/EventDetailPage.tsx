import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Download,
  FileText,
  Hourglass,
  MessageCircle,
} from "lucide-react";
import type { ManagedEvent } from "@/modules/admin/services/eventService";
import {
  formatDuration,
  formatLongDate,
  formatTime,
} from "../format";

function getTiming(event: ManagedEvent): { label: string; className: string } {
  const now = Date.now();
  if (now < +new Date(event.startAt))
    return { label: "Upcoming", className: "bg-primary-500 text-white" };
  if (now <= +new Date(event.endAt))
    return { label: "Happening now", className: "bg-amber-400 text-secondary-900" };
  return { label: "Ended", className: "bg-secondary-300 text-secondary-900" };
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold tracking-wider text-secondary-400 uppercase">
          {label}
        </p>
        <div className="mt-0.5 text-sm font-semibold text-secondary-800">{children}</div>
      </div>
    </div>
  );
}

export default function EventDetailPage({ event }: { event: ManagedEvent }) {
  const timing = getTiming(event);
  const sameDay = formatLongDate(event.startAt) === formatLongDate(event.endAt);

  return (
    <>
      {/* Hero: banner with title overlaid */}
      <section className="relative isolate overflow-hidden bg-secondary-800">
        {/* Blurred copy fills the hero for any aspect ratio; the sharp copy is never cropped. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.banner}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-2xl"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.banner}
          alt={event.title}
          className="absolute inset-0 -z-10 h-full w-full object-contain"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-secondary-900 via-secondary-900/70 to-secondary-900/20" />

        <div className="container-app flex min-h-72 flex-col justify-between gap-16 py-6 sm:min-h-96 sm:py-8 lg:min-h-112">
          <Link
            href="/workshops-events"
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Workshops &amp; Events
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wide text-primary-700 uppercase">
                {event.type}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${timing.className}`}>
                {timing.label}
              </span>
            </div>
            <h1 className="mt-4 font-heading text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-white/85 sm:text-base">
              <CalendarDays className="h-4 w-4 shrink-0" />
              {formatLongDate(event.startAt)}
              {!sameDay && <> – {formatLongDate(event.endAt)}</>}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-py bg-secondary-50/50">
        <div className="container-app grid gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm sm:p-8">
              <span className="eyebrow">About this {event.type.toLowerCase()}</span>
              <h2 className="mt-2 font-heading text-xl font-extrabold text-secondary-800 sm:text-2xl">
                What to expect
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary-500" />
              <p className="mt-5 text-[15px] leading-7 whitespace-pre-line text-secondary-600">
                {event.description}
              </p>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="space-y-5 rounded-2xl border border-secondary-100 bg-white p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-heading text-lg font-extrabold text-secondary-800">
                Event Information
              </h2>

              <InfoRow icon={CalendarDays} label="Starts">
                <p>{formatLongDate(event.startAt)}</p>
                <p className="font-medium text-secondary-500">{formatTime(event.startAt)}</p>
              </InfoRow>
              <InfoRow icon={Clock} label="Ends">
                <p>{formatLongDate(event.endAt)}</p>
                <p className="font-medium text-secondary-500">{formatTime(event.endAt)}</p>
              </InfoRow>
              <InfoRow icon={Hourglass} label="Duration">
                {formatDuration(event.startAt, event.endAt)}
              </InfoRow>

              <div className="space-y-3 border-t border-secondary-100 pt-5">
                {event.brochure && (
                  <a
                    href={event.brochure}
                    download={event.brochureName || true}
                    className="btn-primary w-full"
                  >
                    <Download className="h-4 w-4" />
                    Download Brochure
                  </a>
                )}
                {event.brochure && event.brochureName && (
                  <p className="flex items-center justify-center gap-1.5 truncate text-xs text-secondary-400">
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{event.brochureName}</span>
                  </p>
                )}
                <Link href="/contactus" className="btn-outline w-full">
                  <MessageCircle className="h-4 w-4" />
                  Have a question? Contact us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
