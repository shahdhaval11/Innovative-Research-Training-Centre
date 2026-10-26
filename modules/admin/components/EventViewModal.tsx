"use client";

import { ExternalLink, X } from "lucide-react";
import type { ManagedEvent } from "@/lib/redux/slices/eventsSlice";
import { formatEventDateTime, formatEventFees } from "./eventFormat";

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">{label}</p>
      <div className="mt-0.5 text-sm text-secondary-800">{children}</div>
    </div>
  );
}

export default function EventViewModal({
  event,
  onClose,
}: {
  event: ManagedEvent;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">
            {event.type} Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-w-0 space-y-4 px-6 py-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.banner} alt="" className="h-44 w-full rounded-md object-cover" />
          <Detail label="Title">{event.title}</Detail>
          <Detail label="Description">
            <p className="whitespace-pre-line">{event.description}</p>
          </Detail>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Starts">{formatEventDateTime(event.startAt)}</Detail>
            <Detail label="Ends">{formatEventDateTime(event.endAt)}</Detail>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Fees">{formatEventFees(event.fees)}</Detail>
            <Detail label="Type">{event.type}</Detail>
            <Detail label="Status">
              {event.status === "active" ? "Active" : "Inactive"}
            </Detail>
          </div>
          {event.brochure && (
            <Detail label="Brochure / Flyer">
              <a
                href={event.brochure}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary-700 hover:underline"
              >
                {event.brochureName || "Open file"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Detail>
          )}
        </div>
      </div>
    </div>
  );
}
