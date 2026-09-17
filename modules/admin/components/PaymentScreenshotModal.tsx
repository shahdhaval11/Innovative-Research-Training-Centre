"use client";

import Image from "next/image";
import { X } from "lucide-react";
import type { InternshipRegistration } from "@/lib/redux/slices/internshipRegistrationsSlice";

export default function PaymentScreenshotModal({
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
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-secondary-100 px-6 py-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-secondary-800">
              Payment Screenshot
            </h2>
            <p className="mt-0.5 text-sm text-secondary-500">{registration.fullName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-md border border-secondary-100 bg-secondary-50">
            <Image
              src={registration.paymentScreenshotPath}
              alt={`Payment screenshot uploaded by ${registration.fullName}`}
              fill
              sizes="(min-width: 640px) 448px, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
