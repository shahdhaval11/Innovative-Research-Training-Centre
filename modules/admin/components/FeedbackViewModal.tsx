"use client";

import { X } from "lucide-react";
import StarRating from "@/components/common/StarRating";
import type { Feedback } from "@/lib/redux/slices/feedbackSlice";

const STATUS_BADGE: Record<Feedback["status"], { label: string; className: string }> = {
  new: { label: "New", className: "bg-amber-100 text-amber-700" },
  approved: { label: "Approved", className: "bg-primary-50 text-primary-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
};

export function FeedbackStatusBadge({ status }: { status: Feedback["status"] }) {
  const { label, className } = STATUS_BADGE[status];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{label}</span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">{label}</p>
      <div className="mt-0.5 text-sm text-secondary-800">{children}</div>
    </div>
  );
}

export default function FeedbackViewModal({
  feedback,
  busy,
  onApprove,
  onReject,
  onClose,
}: {
  feedback: Feedback;
  busy: boolean;
  onApprove: () => void;
  onReject: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={busy ? undefined : onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">Feedback Details</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Name">{feedback.name}</Field>
            <Field label="Designation">{feedback.designation}</Field>
            <Field label="Email">
              <a href={`mailto:${feedback.email}`} className="text-primary-700 hover:underline">
                {feedback.email}
              </a>
            </Field>
            <Field label="Submitted">
              {new Date(feedback.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Field>
            <Field label="Rating">
              <StarRating value={feedback.rating} className="h-5 w-5" />
            </Field>
            <Field label="Status">
              <FeedbackStatusBadge status={feedback.status} />
            </Field>
          </div>
          <Field label="Message">
            <p className="whitespace-pre-line [overflow-wrap:anywhere]">{feedback.message}</p>
          </Field>
        </div>

        <div className="flex shrink-0 justify-end gap-3 border-t border-secondary-100 px-6 py-4">
          <button
            type="button"
            onClick={onReject}
            disabled={busy}
            className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={busy}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}
