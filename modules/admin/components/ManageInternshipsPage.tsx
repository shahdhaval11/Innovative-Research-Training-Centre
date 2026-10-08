"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  createInternship,
  fetchInternships,
  updateInternship,
} from "@/lib/redux/slices/internshipsSlice";
import {
  INTERNSHIP_DURATIONS,
  formatFee,
  type ManagedInternship,
} from "../constData/internshipManage";
import InternshipFormModal from "./InternshipFormModal";
import InternshipViewModal from "./InternshipViewModal";

export default function ManageInternshipsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.internships);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedInternship | null>(null);
  const [viewing, setViewing] = useState<ManagedInternship | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchInternships());
  }, [dispatch]);

  function openForm(internship: ManagedInternship | null) {
    setEditing(internship);
    setFormOpen(true);
  }

  async function handleSave(data: Omit<ManagedInternship, "id">, imageFile: File | null) {
    const formData = new FormData();
    formData.set("internshipDomain", data.internshipDomain);
    formData.set("mode", data.mode);
    formData.set("track", data.track);
    formData.set("slug", data.slug);
    formData.set("description", data.description);
    formData.set("duration", data.duration);
    if (imageFile) formData.set("image", imageFile);

    setSaving(true);
    try {
      if (editing) {
        await dispatch(updateInternship({ id: editing.id, formData })).unwrap();
        toast.success("Internship updated.");
      } else {
        await dispatch(createInternship(formData)).unwrap();
        toast.success("Internship added.");
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save internship.");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    // Delete API is not built yet.
    toast.info("Deleting will be available once the delete API is ready.");
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-secondary-800">
            Manage Internship
          </h1>
          <p className="mt-1 text-sm text-secondary-500">
            Add, edit and remove the internships shown on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openForm(null)}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add New Internship
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-sm">
        {status === "loading" && (
          <p className="p-6 text-sm text-secondary-500">Loading internships…</p>
        )}

        {status === "failed" && (
          <p className="p-6 text-sm text-red-600">{error ?? "Failed to load internships."}</p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary-400">
            <GraduationCap className="h-8 w-8" />
            <p className="text-sm">No internship found.</p>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-secondary-100 bg-secondary-50 text-xs tracking-wide text-secondary-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Image</th>
                  <th className="px-5 py-3 font-semibold">Track</th>
                  <th className="px-5 py-3 font-semibold">Domain</th>
                  <th className="px-5 py-3 font-semibold">Mode</th>
                  <th className="px-5 py-3 font-semibold">Duration</th>
                  <th className="px-5 py-3 font-semibold">Fee</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {items.map((item) => {
                  const duration = INTERNSHIP_DURATIONS.find((d) => d.value === item.duration);
                  return (
                    <tr key={item.id} className="hover:bg-secondary-50">
                      <td className="px-5 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt="" className="h-10 w-16 rounded object-cover" />
                      </td>
                      <td className="px-5 py-3 font-medium text-secondary-800">{item.track}</td>
                      <td className="px-5 py-3 text-secondary-600">{item.internshipDomain}</td>
                      <td className="px-5 py-3 text-secondary-600">{item.mode}</td>
                      <td className="px-5 py-3 text-secondary-600">{duration?.label}</td>
                      <td className="px-5 py-3 text-secondary-600">
                        {duration && formatFee(duration.fee)}
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setViewing(item)}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-50"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openForm(item)}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-secondary-600 hover:bg-secondary-100"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={handleDelete}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && (
        <InternshipFormModal
          internship={editing}
          onSave={handleSave}
          saving={saving}
          onClose={() => setFormOpen(false)}
        />
      )}
      {viewing && <InternshipViewModal internship={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}
