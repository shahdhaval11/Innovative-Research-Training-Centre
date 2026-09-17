"use client";

import { X, Calendar } from "lucide-react";
import type { InternshipRegistration } from "@/lib/redux/slices/internshipRegistrationsSlice";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Field({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">{label}</p>
      <p className="mt-0.5 text-sm text-secondary-800">{value ?? "-"}</p>
    </div>
  );
}

export default function InternshipRegistrationViewModal({
  registration,
  onClose,
}: {
  registration: InternshipRegistration;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">
            Internship Registration Details
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

        <div className="overflow-y-auto px-6 py-5">
          <span className="eyebrow">Program</span>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Internship" value={registration.internshipName} />
            <Field label="Mode" value={registration.programMode} />
            <Field label="Status" value={registration.status} />
            <Field label="Type" value={registration.type} />
          </div>

          <hr className="my-5 border-secondary-100" />

          <span className="eyebrow">Personal Details</span>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={registration.fullName} />
            <Field label="Date of Birth" value={registration.dob} />
            <Field label="Gender" value={registration.gender} />
            <Field label="Mobile" value={registration.mobile} />
            <Field label="Email" value={registration.email} />
            <Field label="City" value={registration.city} />
            <Field label="State" value={registration.state} />
          </div>

          <hr className="my-5 border-secondary-100" />

          <span className="eyebrow">Academic / Professional Details</span>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Current Status"
              value={registration.currentStatus}
            />
            <Field label="Current Status (Other)" value={registration.currentStatusOther} />
            <Field label="Highest Qualification" value={registration.highestQualification} />
            <Field
              label="Highest Qualification (Other)"
              value={registration.highestQualificationOther}
            />
            <Field label="Subject / Specialization" value={registration.subject} />
            <Field label="Year / Passout" value={registration.yearOrPassout} />
            <Field label="College / Organization" value={registration.college} />
            <Field label="Affiliation / Department" value={registration.affiliation} />
            <Field label="Consent Given" value={registration.consent ? "Yes" : "No"} />
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-secondary-100 pt-4 text-xs text-secondary-400">
            <Calendar className="h-3.5 w-3.5" />
            Applied on {formatDate(registration.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
