"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { CheckCircle2, Star } from "lucide-react";

type FormState = {
  name: string;
  designation: string;
  email: string;
  message: string;
  rating: number;
};

const EMPTY: FormState = { name: "", designation: "", email: "", message: "", rating: 0 };

const FIELD =
  "w-full rounded-md border border-secondary-200 px-3 py-2.5 text-base sm:text-sm text-secondary-800 outline-none focus:border-primary-600";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export default function FeedbackForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary-600" />
        <h2 className="font-heading text-xl font-bold text-secondary-800">Thank you!</h2>
        <p className="max-w-xs text-sm text-secondary-500">
          Your feedback has been submitted. We really appreciate you taking the time.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setErrors({});
              setSubmitted(false);
            }}
            className="btn-outline"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 px-6 py-7 sm:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fb-name" className="mb-1 block text-xs font-semibold text-secondary-600">
            Name
          </label>
          <input
            id="fb-name"
            value={form.name}
            maxLength={100}
            onChange={(e) => set("name", e.target.value)}
            className={FIELD}
          />
          {err("name")}
        </div>
        <div>
          <label
            htmlFor="fb-designation"
            className="mb-1 block text-xs font-semibold text-secondary-600"
          >
            Designation
          </label>
          <input
            id="fb-designation"
            value={form.designation}
            maxLength={150}
            onChange={(e) => set("designation", e.target.value)}
            className={FIELD}
          />
          {err("designation")}
        </div>
      </div>

      <div>
        <label htmlFor="fb-email" className="mb-1 block text-xs font-semibold text-secondary-600">
          Email
        </label>
        <input
          id="fb-email"
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
                className={`h-9 w-9 ${
                  n <= activeRating ? "fill-amber-400 text-amber-400" : "text-secondary-200"
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
        <label htmlFor="fb-message" className="mb-1 block text-xs font-semibold text-secondary-600">
          Message
        </label>
        <textarea
          id="fb-message"
          rows={5}
          value={form.message}
          maxLength={2000}
          onChange={(e) => set("message", e.target.value)}
          className={FIELD}
        />
        {err("message")}
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Submitting…" : "Submit Feedback"}
      </button>
    </form>
  );
}
