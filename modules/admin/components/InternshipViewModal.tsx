"use client";

import { X } from "lucide-react";
import {
  INTERNSHIP_DURATIONS,
  formatFee,
  type ManagedInternship,
} from "../constData/internshipManage";

export default function InternshipViewModal({
  internship,
  onClose,
}: {
  internship: ManagedInternship;
  onClose: () => void;
}) {
  const duration = INTERNSHIP_DURATIONS.find((d) => d.value === internship.duration);

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
          <h2 className="font-heading text-lg font-bold text-secondary-800">Internship Details</h2>
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
          <img src={internship.image} alt="" className="h-44 w-full rounded-md object-cover" />
          <div>
            <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
              Track
            </p>
            <p className="mt-0.5 text-sm font-medium text-secondary-800">{internship.track}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                Domain &amp; Mode
              </p>
              <p className="mt-0.5 text-sm text-secondary-800">
                {internship.internshipDomain} · {internship.mode}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                Duration &amp; Fee
              </p>
              <p className="mt-0.5 text-sm text-secondary-800">
                {duration?.label} · {duration && formatFee(duration.fee)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
              Description
            </p>
            <div
              className="mt-1 max-h-64 overflow-y-auto rounded-md bg-secondary-50 p-3 text-sm leading-relaxed [overflow-wrap:anywhere] text-secondary-700 [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: internship.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
