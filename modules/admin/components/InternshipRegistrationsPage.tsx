"use client";

import { useEffect, useState } from "react";
import { Eye, Image as ImageIcon, Trash2, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchInternshipRegistrations,
  deleteInternshipRegistration,
  type InternshipRegistration,
} from "@/lib/redux/slices/internshipRegistrationsSlice";
import InternshipRegistrationViewModal from "./InternshipRegistrationViewModal";
import PaymentScreenshotModal from "./PaymentScreenshotModal";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InternshipRegistrationsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.internshipRegistrations);
  const [selected, setSelected] = useState<InternshipRegistration | null>(null);
  const [screenshotOf, setScreenshotOf] = useState<InternshipRegistration | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchInternshipRegistrations());
  }, [dispatch]);

  async function handleDelete(registration: InternshipRegistration) {
    if (!window.confirm(`Delete the application from "${registration.fullName}"?`)) return;

    setDeletingId(registration.id);
    try {
      await dispatch(deleteInternshipRegistration(registration.id)).unwrap();
      toast.success("Registration deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete registration.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-secondary-800">
          Internship Registrations
        </h1>
        <p className="mt-1 text-sm text-secondary-500">
          Students who have applied for internship programs on the website.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-sm">
        {status === "loading" && (
          <p className="p-6 text-sm text-secondary-500">Loading registrations…</p>
        )}

        {status === "failed" && (
          <p className="p-6 text-sm text-red-600">{error ?? "Failed to load registrations."}</p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary-400">
            <GraduationCap className="h-8 w-8" />
            <p className="text-sm">No internship registrations yet.</p>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-secondary-100 bg-secondary-50 text-xs tracking-wide text-secondary-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Mobile</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Internship</th>
                  <th className="px-5 py-3 font-semibold">Mode</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {items.map((registration) => (
                  <tr key={registration.id} className="hover:bg-secondary-50">
                    <td className="px-5 py-3 font-medium text-secondary-800">
                      {registration.fullName}
                    </td>
                    <td className="px-5 py-3 text-secondary-600">{registration.mobile}</td>
                    <td className="px-5 py-3 text-secondary-600">{registration.email}</td>
                    <td className="px-5 py-3 text-secondary-600">{registration.internshipName}</td>
                    <td className="px-5 py-3 text-secondary-600">
                      {registration.programMode ?? "-"}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-secondary-500">
                      {formatDate(registration.createdAt)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelected(registration)}
                          aria-label="View details"
                          title="View details"
                          className="inline-flex items-center rounded-md p-1.5 text-primary-700 hover:bg-primary-50"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setScreenshotOf(registration)}
                          aria-label="View payment screenshot"
                          title="View payment screenshot"
                          className="inline-flex items-center rounded-md p-1.5 text-secondary-600 hover:bg-secondary-100"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(registration)}
                          disabled={deletingId === registration.id}
                          aria-label="Delete registration"
                          title="Delete registration"
                          className="inline-flex items-center rounded-md p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <InternshipRegistrationViewModal
          registration={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {screenshotOf && (
        <PaymentScreenshotModal registration={screenshotOf} onClose={() => setScreenshotOf(null)} />
      )}
    </div>
  );
}
