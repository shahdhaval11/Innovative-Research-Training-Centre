"use client";

import { useState } from "react";
import { X, Upload, FileText } from "lucide-react";
import type { EventType, ManagedEvent } from "@/lib/redux/slices/eventsSlice";
import { toLocalInputValue } from "./eventFormat";

type FormState = {
  type: EventType;
  title: string;
  description: string;
  startAt: string; // datetime-local value
  endAt: string;
};

const EMPTY: FormState = { type: "Event", title: "", description: "", startAt: "", endAt: "" };

const FIELD =
  "w-full rounded-md border border-secondary-200 px-3 py-2 text-sm text-secondary-800 outline-none focus:border-primary-600";

const UPLOAD_BUTTON =
  "inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-secondary-300 px-4 py-2 text-sm font-medium text-secondary-600 hover:border-primary-600 hover:text-primary-700";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-semibold text-secondary-600">{children}</label>;
}

export type EventFormValues = FormState & {
  bannerFile: File | null;
  brochureFile: File | null;
};

export default function EventFormModal({
  event,
  onSave,
  saving = false,
  onClose,
}: {
  event: ManagedEvent | null;
  onSave: (values: EventFormValues) => void;
  saving?: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(
    event
      ? {
          type: event.type,
          title: event.title,
          description: event.description,
          startAt: toLocalInputValue(event.startAt),
          endAt: toLocalInputValue(event.endAt),
        }
      : EMPTY,
  );
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState(event?.banner ?? "");
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "banner", string>>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const brochureLabel = brochureFile?.name || event?.brochureName || (event?.brochure ? "Current file" : "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.title.trim()) next.title = "Enter the title.";
    if (!form.description.trim()) next.description = "Enter the description.";
    if (!form.startAt) next.startAt = "Select the start date and time.";
    if (!form.endAt) next.endAt = "Select the end date and time.";
    if (form.startAt && form.endAt && new Date(form.endAt) <= new Date(form.startAt))
      next.endAt = "End must be after the start.";
    if (!bannerPreview) next.banner = "Upload a banner image.";
    setErrors(next);
    if (Object.keys(next).length === 0) onSave({ ...form, bannerFile, brochureFile });
  }

  const err = (key: keyof typeof errors) =>
    errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">
            {event ? "Edit Event / Workshop" : "Add Event / Workshop"}
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

        <div className="min-h-0 space-y-4 overflow-y-auto px-6 py-5">
          <div>
            <Label>Type</Label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value as EventType)}
              className={FIELD}
            >
              <option value="Event">Event</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div>
            <Label>Title</Label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={FIELD}
            />
            {err("title")}
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={FIELD}
            />
            {err("description")}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Start date &amp; time</Label>
              <input
                type="datetime-local"
                value={form.startAt}
                onChange={(e) => set("startAt", e.target.value)}
                className={FIELD}
              />
              {err("startAt")}
            </div>
            <div>
              <Label>End date &amp; time</Label>
              <input
                type="datetime-local"
                value={form.endAt}
                min={form.startAt || undefined}
                onChange={(e) => set("endAt", e.target.value)}
                className={FIELD}
              />
              {err("endAt")}
            </div>
          </div>

          <div>
            <Label>Banner image</Label>
            {bannerPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={bannerPreview}
                alt=""
                className="mb-2 h-32 w-full rounded-md object-cover"
              />
            )}
            <label className={UPLOAD_BUTTON}>
              <Upload className="h-4 w-4" />
              {bannerPreview ? "Change banner" : "Upload banner"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setBannerFile(file);
                    setBannerPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
            <p className="mt-1 text-xs text-secondary-500">JPG, PNG or WebP, up to 5 MB.</p>
            {err("banner")}
          </div>

          <div>
            <Label>Brochure / Flyer (optional)</Label>
            {brochureLabel && (
              <p className="mb-2 flex items-center gap-2 text-sm text-secondary-600">
                <FileText className="h-4 w-4 shrink-0" />
                <span className="truncate">{brochureLabel}</span>
              </p>
            )}
            <label className={UPLOAD_BUTTON}>
              <Upload className="h-4 w-4" />
              {brochureLabel ? "Change file" : "Upload file"}
              <input
                type="file"
                accept="application/pdf,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setBrochureFile(file);
                }}
              />
            </label>
            <p className="mt-1 text-xs text-secondary-500">PDF, JPG, PNG or WebP, up to 10 MB.</p>
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
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
