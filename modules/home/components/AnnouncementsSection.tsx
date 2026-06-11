"use client";

import { useEffect, useState } from "react";
import EventDetailModal from "./EventDetailModal";

interface EventRecord {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
  status: string;
  imageName: string;
  imagePreview: string;
  pdfName: string;
  bannerPath: string;
  broucherPath: string;
  createdAt: string;
  attendees: number;
  venue: string;
  registrationUrl: string;
}

const tagColor: Record<string, string> = {
  Webinar: "bg-blue-100 text-blue-800",
  Workshop: "bg-green-100 text-green-800",
  Seminar: "bg-yellow-100 text-yellow-800",
  Conference: "bg-pink-100 text-pink-800",
  "Certificate Course": "bg-purple-100 text-purple-800",
  "Field Training": "bg-emerald-100 text-emerald-800",
  Other: "bg-gray-100 text-gray-600",
};

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function AnnouncementsSection() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);

  useEffect(() => {
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((data) => { if (data.success) setEvents(data.events); })
      .catch(() => {});
  }, []);

  if (events.length === 0) return null;

  return (
    <>
    {selectedEvent && (
      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    )}
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">
        {/* Heading col */}
        <div className="lg:col-span-1">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Stay Updated</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2 mb-4 leading-tight">
            Upcoming Events & Programs
          </h2>
          <p className="text-[#003049]/60 text-base leading-relaxed mb-6">
            Enrich your skills through our webinars, workshops, and certificate courses curated for
            research scholars.
          </p>
          <a
            href="#"
            className="inline-block bg-[#003049] text-white font-bold px-7 py-3 rounded-full hover:bg-[#02223a] transition-colors duration-200"
          >
            View All Events
          </a>
        </div>

        {/* Cards col */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {events.map((event) => {
            const d = new Date(event.startDate);
            const month = d.toLocaleString("en-US", { month: "short" });
            const day = d.getDate();
            const year = d.getFullYear();
            const timeLabel =
              event.startTime && event.endTime
                ? `${formatTime(event.startTime)} – ${formatTime(event.endTime)}`
                : event.startTime
                ? formatTime(event.startTime)
                : "";

            return (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="flex gap-5 items-start bg-[#f7f9fb] border border-[#003049]/8 rounded-2xl p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
              >
                {/* Thumbnail + Date stacked */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  {(event.bannerPath || event.imagePreview) ? (
                    <img
                      src={encodeURI(event.bannerPath || event.imagePreview)}
                      alt={event.title}
                      className="w-20 h-20 rounded-xl object-cover border border-[#003049]/10"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-[#003049]/5 border border-[#003049]/10 flex items-center justify-center text-3xl">
                      📅
                    </div>
                  )}
                  <div className="text-center">
                    {/* <p className="text-[#003049] font-black text-lg leading-none">{day}</p> */}
                    <p className="text-[#003049]/50 text-xs font-semibold uppercase">{day} {month} {year}</p>
                  </div>
                </div>

                <div className="w-px self-stretch bg-[#003049]/10" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      tagColor[event.eventType] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {event.eventType}
                  </span>
                  <h4 className="text-[#003049] font-bold mt-1.5 group-hover:text-[#F4A261] transition-colors line-clamp-1">
                    {event.title}
                  </h4>
                  <p className="text-[#003049]/60 text-sm mt-1 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                  {timeLabel && (
                    <p className="text-[#003049]/40 text-xs mt-2 font-medium">
                      🕐 {timeLabel}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}

export default AnnouncementsSection;
