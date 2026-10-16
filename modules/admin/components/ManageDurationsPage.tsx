"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { createDuration, fetchDurations } from "@/lib/redux/slices/durationsSlice";
import { formatFee } from "../constData/internshipManage";
import DurationFormModal from "./DurationFormModal";

export default function ManageDurationsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.durations);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchDurations("internship"));
  }, [dispatch]);

  async function handleSave(data: { duration: string; amount: string }) {
    setSaving(true);
    try {
      await dispatch(createDuration({ ...data, type: "internship" })).unwrap();
      toast.success("Duration added.");
      setFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add duration.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Link
        href="/admin/internships"
        className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-500 hover:text-secondary-800"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Manage Internship
      </Link>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-secondary-800">
            Manage Duration
          </h1>
          <p className="mt-1 text-sm text-secondary-500">
            Add the durations and fees available for internships.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add Duration
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-sm">
        {status === "loading" && (
          <p className="p-6 text-sm text-secondary-500">Loading durations…</p>
        )}

        {status === "failed" && (
          <p className="p-6 text-sm text-red-600">{error ?? "Failed to load durations."}</p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary-400">
            <Clock className="h-8 w-8" />
            <p className="text-sm">No duration found.</p>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-secondary-100 bg-secondary-50 text-xs tracking-wide text-secondary-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">#</th>
                  <th className="px-5 py-3 font-semibold">Duration</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {items.map((item, i) => (
                  <tr key={item.id} className="hover:bg-secondary-50">
                    <td className="px-5 py-3 text-secondary-500">{i + 1}</td>
                    <td className="px-5 py-3 font-medium text-secondary-800">
                      {item.duration}
                    </td>
                    <td className="px-5 py-3 text-secondary-600">{formatFee(Number(item.amount))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && (
        <DurationFormModal
          onClose={() => setFormOpen(false)}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
