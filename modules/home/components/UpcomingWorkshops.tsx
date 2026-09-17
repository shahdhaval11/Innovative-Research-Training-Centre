import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { UPCOMING_WORKSHOPS } from "../constData/const";
import Reveal from "@/components/ui/Reveal";

export default function UpcomingWorkshops() {
  return (
    <section className="section-py bg-primary-50/40">
      <div className="container-app">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Workshops & Events</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
              Upcoming Workshops
            </h2>
          </div>
          <Link
            href="/workshops-events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {UPCOMING_WORKSHOPS.map((event, index) => (
            <Reveal key={event.title} delay={index * 100}>
            <div className="flex gap-4 rounded-xl border border-secondary-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary-800 text-white">
                <span className="font-heading text-lg leading-none font-extrabold">{event.day}</span>
                <span className="mt-1 text-[10px] font-semibold tracking-wide">{event.month}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-sm leading-snug font-bold text-secondary-800">
                  {event.title}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 truncate text-xs text-secondary-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {event.venue}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-secondary-500">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {event.time}
                </p>
                <Link
                  href={event.href}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800"
                >
                  Register Now
                  <ArrowRight className="h-3 w-3" />
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
