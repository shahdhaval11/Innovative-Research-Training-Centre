"use client";

import { useEffect } from "react";

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
  createdAt: string;
  attendees: number;
  venue: string;
  registrationUrl: string;
}

interface Props {
  event: EventRecord;
  onClose: () => void;
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

const statusColor: Record<string, string> = {
  Upcoming: "bg-blue-50 text-blue-700 border border-blue-200",
  Ongoing: "bg-green-50 text-green-700 border border-green-200",
  Completed: "bg-gray-100 text-gray-600 border border-gray-200",
  Cancelled: "bg-red-50 text-red-600 border border-red-200",
};

function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

export default function EventDetailModal({ event, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const timeLabel =
    event.startTime && event.endTime
      ? `${formatTime(event.startTime)} – ${formatTime(event.endTime)}`
      : event.startTime
      ? formatTime(event.startTime)
      : "";

  const dateLabel =
    event.endDate && event.endDate !== event.startDate
      ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
      : formatDate(event.startDate);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header image */}
        {event.imagePreview ? (
          <div className="relative h-56 rounded-t-3xl overflow-hidden">
            <img
              src={event.imagePreview}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#003049] rounded-full w-9 h-9 flex items-center justify-center shadow transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="relative h-32 rounded-t-3xl bg-gradient-to-br from-[#003049] to-[#02223a] flex items-center justify-center text-5xl">
            📅
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-7">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColor[event.eventType] || "bg-gray-100 text-gray-600"}`}>
              {event.eventType}
            </span>
            {event.status && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[event.status] || "bg-gray-100 text-gray-600"}`}>
                {event.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black text-[#003049] leading-snug mb-4">{event.title}</h2>

          {/* Meta grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {dateLabel && (
              <div className="flex items-start gap-2.5 bg-[#f7f9fb] rounded-xl p-3">
                <span className="text-lg mt-0.5">📅</span>
                <div>
                  <p className="text-xs text-[#003049]/50 font-semibold uppercase tracking-wide">Date</p>
                  <p className="text-sm text-[#003049] font-semibold">{dateLabel}</p>
                </div>
              </div>
            )}
            {timeLabel && (
              <div className="flex items-start gap-2.5 bg-[#f7f9fb] rounded-xl p-3">
                <span className="text-lg mt-0.5">🕐</span>
                <div>
                  <p className="text-xs text-[#003049]/50 font-semibold uppercase tracking-wide">Time</p>
                  <p className="text-sm text-[#003049] font-semibold">{timeLabel}</p>
                </div>
              </div>
            )}
            {event.venue && (
              <div className="flex items-start gap-2.5 bg-[#f7f9fb] rounded-xl p-3">
                <span className="text-lg mt-0.5">📍</span>
                <div>
                  <p className="text-xs text-[#003049]/50 font-semibold uppercase tracking-wide">Venue</p>
                  <p className="text-sm text-[#003049] font-semibold">{event.venue}</p>
                </div>
              </div>
            )}
            {event.attendees > 0 && (
              <div className="flex items-start gap-2.5 bg-[#f7f9fb] rounded-xl p-3">
                <span className="text-lg mt-0.5">👥</span>
                <div>
                  <p className="text-xs text-[#003049]/50 font-semibold uppercase tracking-wide">Attendees</p>
                  <p className="text-sm text-[#003049] font-semibold">{event.attendees}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#003049]/50 uppercase tracking-widest mb-2">About this Event</h3>
              <p className="text-[#003049]/80 text-sm leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F4A261] hover:bg-[#e8924e] text-white font-bold px-6 py-3 rounded-full transition-colors duration-200"
              >
                Register Now
                <span className="text-base">→</span>
              </a>
            )}
            {event.pdfName && (
              <a
                href={event.pdfName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#003049] hover:bg-[#02223a] text-white font-bold px-6 py-3 rounded-full transition-colors duration-200"
              >
                📄 View Brochure
              </a>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 border border-[#003049]/20 text-[#003049]/70 hover:bg-[#003049]/5 font-semibold px-6 py-3 rounded-full transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
