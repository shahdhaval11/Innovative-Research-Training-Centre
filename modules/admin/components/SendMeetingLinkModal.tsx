"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { toast } from "react-toastify";
import type { ManagedEvent } from "@/lib/redux/slices/eventsSlice";

const FIELD =
  "w-full rounded-md border border-secondary-200 px-3 py-2 text-sm text-secondary-800 outline-none focus:border-primary-600";

export default function SendMeetingLinkModal({
  events,
  onClose,
}: {
  events: ManagedEvent[];
  onClose: () => void;
}) {
  const [eventId, setEventId] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    setSending(true);
    try {
      const res = await fetch(`/api/admin/events/${eventId}/send-meeting-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message ?? "Failed to send meeting link.");

      // Emails are sent in the background, so there is nothing to wait for.
      toast.success("Email submitted. Registered users will receive the meeting link shortly.");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send meeting link.");
      setSending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">Send Meeting Link</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-xs font-semibold text-secondary-600">
              Event / Workshop
            </label>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} className={FIELD}>
              <option value="">Select event / workshop</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} ({event.type})
                </option>
              ))}
            </select>
            {events.length === 0 && (
              <p className="mt-1 text-xs text-secondary-400">No active event or workshop found.</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-secondary-600">
              Meeting link
            </label>
            <input
              type="url"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              placeholder="https://meet.google.com/..."
              className={FIELD}
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-secondary-100 px-6 py-4">
          <button
            type="button"
            onClick={handleSend}
            disabled={!eventId || !meetingUrl.trim() || sending}
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
