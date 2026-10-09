"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import {
  INTERNSHIP_DURATIONS,
  formatFee,
  type ManagedInternship,
} from "@/modules/admin/constData/internshipManage";

export default function InternshipDetailModal({
  internship,
  onClose,
  onApply,
}: {
  internship: ManagedInternship;
  onClose: () => void;
  onApply: () => void;
}) {
  const duration = INTERNSHIP_DURATIONS.find((d) => d.value === internship.duration);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Portal to <body> so no ancestor stacking context / transform can clip or overlap the modal.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-secondary-900/50 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={internship.track}
        className="flex max-h-[92vh] max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-36 shrink-0 sm:h-56">
          <Image
            src={internship.image}
            alt={internship.internshipDomain}
            fill
            sizes="(min-width: 768px) 672px, 100vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 rounded-full bg-white/95 p-2 text-secondary-600 hover:text-secondary-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          <span className="eyebrow">
            {internship.internshipDomain} · {internship.mode}
          </span>
          <h2 className="mt-1.5 font-heading text-xl font-extrabold text-secondary-800">
            {internship.track}
          </h2>

          {duration && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary-50 p-3">
                <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                  Duration
                </p>
                <p className="mt-0.5 text-sm font-semibold text-secondary-800">{duration.label}</p>
              </div>
              <div className="rounded-lg bg-secondary-50 p-3">
                <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                  Special Student Fee
                </p>
                <p className="mt-0.5 text-sm font-semibold text-secondary-800">
                  {formatFee(duration.fee)}
                </p>
              </div>
            </div>
          )}

          <div
            className="mt-5 text-sm leading-relaxed [overflow-wrap:anywhere] text-secondary-600 [&_*]:static! [&_*]:h-auto! [&_*]:max-w-full! [&_*]:leading-relaxed! [&_*]:float-none! [&_img]:h-auto [&_table]:block [&_table]:overflow-x-auto [&_h1]:mt-4 [&_h1]:font-heading [&_h1]:text-lg [&_h1]:font-bold [&_h2]:mt-4 [&_h2]:font-heading [&_h2]:text-base [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:font-bold [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: internship.description }}
          />
          <p className="mt-4 text-xs text-secondary-400">
            Special student promotional fees. Applicable taxes, specialized consumables, external
            testing or project-specific expenses may be additional, wherever applicable.
          </p>
        </div>

        <div className="flex shrink-0 gap-3 border-t border-secondary-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:justify-end sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-secondary-200 px-4 py-2.5 text-sm font-semibold text-secondary-600 sm:flex-none sm:border-0 hover:bg-secondary-100"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 rounded-md bg-primary-600 px-5 py-2.5 sm:flex-none text-sm font-semibold text-white hover:bg-primary-700"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
