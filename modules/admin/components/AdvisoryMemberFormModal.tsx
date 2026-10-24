"use client";

import { useState } from "react";
import { X, Upload, User } from "lucide-react";
import type { AdvisoryMember } from "@/lib/redux/slices/advisoryMembersSlice";

type FormState = Omit<AdvisoryMember, "id">;

const EMPTY: FormState = {
  name: "",
  designation: "",
  affiliation: "",
  email: "",
  phone: "",
  photo: "",
};

const FIELD =
  "w-full rounded-md border border-secondary-200 px-3 py-2 text-sm text-secondary-800 outline-none focus:border-primary-600";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-semibold text-secondary-600">{children}</label>;
}

export default function AdvisoryMemberFormModal({
  member,
  onSave,
  saving = false,
  onClose,
}: {
  member: AdvisoryMember | null;
  onSave: (data: FormState, photoFile: File | null) => void;
  saving?: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(member ?? EMPTY);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Enter the name.";
    if (!form.designation.trim()) next.designation = "Enter the designation.";
    if (!form.affiliation.trim()) next.affiliation = "Enter the affiliation.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!/^\+?\d{7,15}$/.test(form.phone.replace(/[\s\-()]/g, "")))
      next.phone = "Enter a valid phone number.";
    setErrors(next);
    if (Object.keys(next).length === 0) onSave(form, photoFile);
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
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">
            {member ? "Edit Advisory Member" : "Add Advisory Member"}
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
            <Label>Name</Label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={FIELD}
            />
            {err("name")}
          </div>

          <div>
            <Label>Designation</Label>
            <input
              value={form.designation}
              onChange={(e) => set("designation", e.target.value)}
              className={FIELD}
            />
            {err("designation")}
          </div>

          <div>
            <Label>Affiliation</Label>
            <input
              value={form.affiliation}
              onChange={(e) => set("affiliation", e.target.value)}
              className={FIELD}
            />
            {err("affiliation")}
          </div>

          <div>
            <Label>Email</Label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={FIELD}
            />
            {err("email")}
          </div>

          <div>
            <Label>Phone Number</Label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={FIELD}
            />
            {err("phone")}
          </div>

          <div>
            <Label>Photograph (optional)</Label>
            <div className="flex items-center gap-4">
              {form.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.photo} alt="" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100 text-secondary-400">
                  <User className="h-8 w-8" />
                </span>
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-secondary-300 px-4 py-2 text-sm font-medium text-secondary-600 hover:border-primary-600 hover:text-primary-700">
                <Upload className="h-4 w-4" />
                {form.photo ? "Change photograph" : "Upload photograph"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhotoFile(file);
                      set("photo", URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>
            <p className="mt-1 text-xs text-secondary-500">JPG, PNG or WebP, up to 5 MB.</p>
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
            {saving ? "Saving…" : member ? "Save Changes" : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
