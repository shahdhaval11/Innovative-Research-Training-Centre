"use client";

import { useState } from "react";
import { X } from "lucide-react";

type InputMode = "fixed" | "dateRange";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type FormState = {
  type: InputMode;
  label: string;
  startDate: string;
  endDate: string;
  amount: string;
};

const FIELD =
  "w-full rounded-md border border-secondary-200 px-3 py-2 text-sm text-secondary-800 outline-none focus:border-primary-600";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-semibold text-secondary-600">{children}</label>;
}

export default function DurationFormModal({
  onSave,
  saving = false,
  onClose,
}: {
  onSave: (data: { duration: string; amount: string }) => void;
  saving?: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    type: "fixed",
    label: "",
    startDate: "",
    endDate: "",
    amount: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.type === "fixed") {
      if (!form.label.trim()) next.label = "Enter a duration, e.g. 1 Month.";
    } else {
      if (!form.startDate) next.startDate = "Select a start date.";
      if (!form.endDate) next.endDate = "Select an end date.";
      else if (form.startDate && form.endDate < form.startDate)
        next.endDate = "End date must be after start date.";
    }
    const amount = Number(form.amount);
    if (!form.amount || Number.isNaN(amount) || amount < 0) next.amount = "Enter a valid amount.";
    setErrors(next);
    if (Object.keys(next).length === 0)
      onSave({
        duration:
          form.type === "fixed"
            ? form.label.trim()
            : `${formatDate(form.startDate)} - ${formatDate(form.endDate)}`,
        amount: String(amount),
      });
  }

  const err = (key: keyof FormState) =>
    errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex max-h-[90vh] w-full max-w-md flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">Add Duration</h2>
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
          <div>
            <Label>Duration Type</Label>
            <div className="inline-flex w-full rounded-md border border-secondary-200 p-1">
              {(
                [
                  ["fixed", "Fixed Period"],
                  ["dateRange", "Date Range"],
                ] as const
              ).map(([value, text]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set("type", value)}
                  className={`flex-1 rounded px-3 py-1.5 text-sm font-semibold transition-colors ${
                    form.type === value
                      ? "bg-secondary-800 text-white"
                      : "text-secondary-600 hover:bg-secondary-50"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          {form.type === "fixed" ? (
            <div>
              <Label>Duration</Label>
              <input
                value={form.label}
                onChange={(e) => set("label", e.target.value)}
                placeholder="e.g. 1 Day, 3 Weeks, 1 Month"
                className={FIELD}
              />
              {err("label")}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => set("startDate", e.target.value)}
                  className={FIELD}
                />
                {err("startDate")}
              </div>
              <div>
                <Label>End Date</Label>
                <input
                  type="date"
                  value={form.endDate}
                  min={form.startDate || undefined}
                  onChange={(e) => set("endDate", e.target.value)}
                  className={FIELD}
                />
                {err("endDate")}
              </div>
            </div>
          )}

          <div>
            <Label>Amount (₹)</Label>
            <input
              type="number"
              min={0}
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              placeholder="e.g. 5000"
              className={FIELD}
            />
            {err("amount")}
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-secondary-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-secondary-200 px-4 py-2 text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Duration"}
          </button>
        </div>
      </form>
    </div>
  );
}
