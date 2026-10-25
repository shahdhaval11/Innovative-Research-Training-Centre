"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { CheckCircle2, Star, X } from "lucide-react";

type FormState = {
  name: string;
  designation: string;
  email: string;
  message: string;
  rating: number;
};

const EMPTY: FormState = { name: "", designation: "", email: "", message: "", rating: 0 };

const FIELD =
  "w-full rounded-md border border-secondary-200 px-3 py-2.5 text-sm text-secondary-800 outline-none focus:border-primary-600";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.designation.trim()) next.designation = "Please enter your designation.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please write your feedback.";
    if (form.rating < 1) next.rating = "Please select a rating.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message ?? "Failed to submit feedback.");
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  }

  const err = (key: keyof FormState) =>
    errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>;

  const activeRating = hoverRating || form.rating;

  return createPortal(
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-secondary-900/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share your feedback"
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0 bg-linear-to-br from-secondary-800 to-secondary-600 px-6 py-5 text-white">
          <h2 className="font-heading text-xl font-extrabold">Share Your Feedback</h2>
          <p className="mt-1 text-sm text-secondary-100">
            Tell us about your experience with NanoNova.
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <CheckCircle2 className="h-14 w-14 text-primary-600" />
            <h3 className="font-heading text-lg font-bold text-secondary-800">Thank you!</h3>
            <p className="max-w-xs text-sm text-secondary-500">
              Your feedback has been submitted.
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-2">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-secondary-600">Name</label>
                  <input
                    value={form.name}
                    maxLength={100}
                    onChange={(e) => set("name", e.target.value)}
                    className={FIELD}
                  />
                  {err("name")}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-secondary-600">
                    Designation
                  </label>
                  <input
                    value={form.designation}
                    maxLength={150}
                    onChange={(e) => set("designation", e.target.value)}
                    className={FIELD}
                  />
                  {err("designation")}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-secondary-600">Email</label>
                <input
                  type="email"
                  value={form.email}
                  maxLength={150}
                  onChange={(e) => set("email", e.target.value)}
                  className={FIELD}
                />
                {err("email")}
              </div>

              <div>
                <span className="mb-1 block text-xs font-semibold text-secondary-600">Rating</span>
                <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      onMouseEnter={() => setHoverRating(n)}
                      onClick={() => set("rating", n)}
                      className="rounded p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          n <= activeRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-secondary-200"
                        }`}
                      />
                    </button>
                  ))}
                  {activeRating > 0 && (
                    <span className="ml-2 text-sm font-medium text-secondary-500">
                      {RATING_LABELS[activeRating]}
                    </span>
                  )}
                </div>
                {err("rating")}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-secondary-600">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  maxLength={2000}
                  onChange={(e) => set("message", e.target.value)}
                  className={FIELD}
                />
                {err("message")}
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-secondary-100 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm font-semibold text-secondary-600 hover:bg-secondary-100"
              >
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                {submitting ? "Submitting…" : "Submit Feedback"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
