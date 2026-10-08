"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import {
  INTERNSHIP_DOMAINS,
  DEFAULT_INTERNSHIP_IMAGE,
  INTERNSHIP_DURATIONS,
  INTERNSHIP_MODES,
  formatFee,
  slugify,
  type ManagedInternship,
} from "../constData/internshipManage";
import RichTextEditor from "./RichTextEditor";

type FormState = Omit<ManagedInternship, "id" | "slug">;

const EMPTY: FormState = {
  internshipDomain: "",
  mode: "",
  track: "",
  description: "",
  image: "",
  duration: "",
};

const FIELD =
  "w-full rounded-md border border-secondary-200 px-3 py-2 text-sm text-secondary-800 outline-none focus:border-primary-600";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-semibold text-secondary-600">{children}</label>;
}

export default function InternshipFormModal({
  internship,
  onSave,
  saving = false,
  onClose,
}: {
  internship: ManagedInternship | null;
  onSave: (data: FormState & { slug: string }, imageFile: File | null) => void;
  saving?: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(internship ?? EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const slug = slugify(form.track);
  const fee = INTERNSHIP_DURATIONS.find((d) => d.value === form.duration)?.fee;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.internshipDomain) next.internshipDomain = "Select a domain.";
    if (!form.mode) next.mode = "Select a mode.";
    if (!slug) next.track = "Enter a track title.";
    if (!form.description.replace(/<[^>]*>/g, "").trim()) next.description = "Enter a description.";
    if (!form.duration) next.duration = "Select a duration.";
    setErrors(next);
    if (Object.keys(next).length === 0)
      onSave({ ...form, track: form.track.trim(), slug }, imageFile);
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
        className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">
            {internship ? "Edit Internship" : "Add Internship"}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Internship Domain</Label>
              <select
                value={form.internshipDomain}
                onChange={(e) => set("internshipDomain", e.target.value)}
                className={FIELD}
              >
                <option value="">Select domain</option>
                {INTERNSHIP_DOMAINS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              {err("internshipDomain")}
            </div>

            <div>
              <Label>Duration</Label>
              <select
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                className={FIELD}
              >
                <option value="">Select duration</option>
                {INTERNSHIP_DURATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label} — {formatFee(d.fee)}
                  </option>
                ))}
              </select>
              {fee !== undefined && (
                <p className="mt-1 text-xs text-secondary-500">
                  Special student fee: <strong>{formatFee(fee)}</strong>. Taxes and project-specific
                  expenses may be additional.
                </p>
              )}
              {err("duration")}
            </div>
          </div>

          <div>
            <Label>Mode</Label>
            <select
              value={form.mode}
              onChange={(e) => set("mode", e.target.value)}
              className={FIELD}
            >
              <option value="">Select mode</option>
              {INTERNSHIP_MODES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            {err("mode")}
          </div>

          <div>
            <Label>Track (Title)</Label>
            <input
              type="text"
              value={form.track}
              placeholder="e.g. Foundation Internship"
              onChange={(e) => set("track", e.target.value)}
              className={FIELD}
            />
            {slug && (
              <p className="mt-1 text-xs text-secondary-500">
                Slug: <span className="font-mono">{slug}</span>
              </p>
            )}
            {err("track")}
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor
              value={form.description}
              onChange={(html) => set("description", html)}
            />
            {err("description")}
          </div>

          <div>
            <Label>Image (optional)</Label>
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.image || DEFAULT_INTERNSHIP_IMAGE}
                alt=""
                className="h-16 w-24 rounded-md object-cover"
              />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-secondary-300 px-4 py-2 text-sm font-medium text-secondary-600 hover:border-primary-600 hover:text-primary-700">
                <Upload className="h-4 w-4" />
                {form.image ? "Change image" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      set("image", URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>
            {!form.image && (
              <p className="mt-1 text-xs text-secondary-500">
                A default image is used if none is uploaded.
              </p>
            )}
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
            {saving ? "Saving…" : internship ? "Save Changes" : "Add Internship"}
          </button>
        </div>
      </form>
    </div>
  );
}
