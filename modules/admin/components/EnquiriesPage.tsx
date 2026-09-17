"use client";

import { useEffect, useState } from "react";
import { Eye, Inbox } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchEnquiries, type Enquiry } from "@/lib/redux/slices/enquiriesSlice";
import EnquiryViewModal from "./EnquiryViewModal";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function EnquiriesPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.enquiries);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    dispatch(fetchEnquiries());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-secondary-800">Enquiries</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Enquiries submitted by visitors through the website contact form.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-sm">
        {status === "loading" && (
          <p className="p-6 text-sm text-secondary-500">Loading enquiries…</p>
        )}

        {status === "failed" && (
          <p className="p-6 text-sm text-red-600">{error ?? "Failed to load enquiries."}</p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary-400">
            <Inbox className="h-8 w-8" />
            <p className="text-sm">No enquiries yet.</p>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-secondary-100 bg-secondary-50 text-xs tracking-wide text-secondary-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {items.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-secondary-50">
                    <td className="px-5 py-3 font-medium text-secondary-800">{enquiry.name}</td>
                    <td className="px-5 py-3 text-secondary-600">{enquiry.email}</td>
                    <td className="px-5 py-3 text-secondary-600">{enquiry.phone}</td>
                    <td className="px-5 py-3 text-secondary-600">{enquiry.service}</td>
                    <td className="px-5 py-3 text-secondary-500">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(enquiry)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <EnquiryViewModal enquiry={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
