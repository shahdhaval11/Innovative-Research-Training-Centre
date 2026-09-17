"use client";

import { X, Mail, Phone, Tag, Layers, Calendar } from "lucide-react";
import type { Enquiry } from "@/lib/redux/slices/enquiriesSlice";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function EnquiryViewModal({
  enquiry,
  onClose,
}: {
  enquiry: Enquiry;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-secondary-100 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-secondary-800">Enquiry Details</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
              Name
            </p>
            <p className="mt-0.5 text-sm font-medium text-secondary-800">{enquiry.name}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <div>
                <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                  Email
                </p>
                <p className="mt-0.5 text-sm text-secondary-800">{enquiry.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <div>
                <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                  Phone
                </p>
                <p className="mt-0.5 text-sm text-secondary-800">{enquiry.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Tag className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <div>
                <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                  Subject
                </p>
                <p className="mt-0.5 text-sm text-secondary-800">{enquiry.subject}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <div>
                <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
                  Service
                </p>
                <p className="mt-0.5 text-sm text-secondary-800">{enquiry.service}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-secondary-400 uppercase">
              Message
            </p>
            <p className="mt-1 rounded-md bg-secondary-50 p-3 text-sm whitespace-pre-wrap text-secondary-700">
              {enquiry.message}
            </p>
          </div>

          <div className="flex items-center gap-2 border-t border-secondary-100 pt-4 text-xs text-secondary-400">
            <Calendar className="h-3.5 w-3.5" />
            Submitted on {formatDate(enquiry.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
