"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, User, Users } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  createAdvisoryMember,
  deleteAdvisoryMember,
  fetchAdvisoryMembers,
  updateAdvisoryMember,
  type AdvisoryMember,
} from "@/lib/redux/slices/advisoryMembersSlice";
import AdvisoryMemberFormModal from "./AdvisoryMemberFormModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function ManageAdvisoryMembersPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.advisoryMembers);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdvisoryMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<AdvisoryMember | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  useEffect(() => {
    dispatch(fetchAdvisoryMembers());
  }, [dispatch]);

  function openForm(member: AdvisoryMember | null) {
    setEditing(member);
    setFormOpen(true);
  }

  // Suggested order for a new member: one after the highest in use.
  const nextOrder = items.reduce((max, item) => Math.max(max, (item.order ?? -1) + 1), 0);

  async function handleSave(data: Omit<AdvisoryMember, "id" | "order"> & { order: string }, photoFile: File | null) {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("designation", data.designation);
    formData.set("affiliation", data.affiliation);
    formData.set("email", data.email);
    formData.set("phone", data.phone);
    formData.set("order", data.order.trim());
    if (photoFile) formData.set("photo", photoFile);

    setSaving(true);
    try {
      if (editing) {
        await dispatch(updateAdvisoryMember({ id: editing.id, formData })).unwrap();
        toast.success("Advisory member updated.");
      } else {
        await dispatch(createAdvisoryMember(formData)).unwrap();
        toast.success("Advisory member added.");
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save advisory member.");
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleting) return;

    setDeletingBusy(true);
    try {
      await dispatch(deleteAdvisoryMember(deleting.id)).unwrap();
      toast.success("Advisory member deleted.");
      setDeleting(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete advisory member.");
    } finally {
      setDeletingBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-secondary-800">
            Manage Advisory Member
          </h1>
          <p className="mt-1 text-sm text-secondary-500">
            Add, edit and remove the members of the advisory team.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openForm(null)}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add Advisory Member
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-sm">
        {status === "loading" && (
          <p className="p-6 text-sm text-secondary-500">Loading advisory members…</p>
        )}

        {status === "failed" && (
          <p className="p-6 text-sm text-red-600">
            {error ?? "Failed to load advisory members."}
          </p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary-400">
            <Users className="h-8 w-8" />
            <p className="text-sm">No advisory member found.</p>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-secondary-100 bg-secondary-50 text-xs tracking-wide text-secondary-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-5 py-3 font-semibold">Photo</th>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Designation</th>
                  <th className="px-5 py-3 font-semibold">Affiliation</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary-50">
                    <td className="px-5 py-3 font-medium text-secondary-800">
                      {item.order ?? "-"}
                    </td>
                    <td className="px-5 py-3">
                      {item.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.photo}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-400">
                          <User className="h-5 w-5" />
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-secondary-800">{item.name}</td>
                    <td className="px-5 py-3 text-secondary-600">{item.designation}</td>
                    <td className="px-5 py-3 text-secondary-600">{item.affiliation}</td>
                    <td className="px-5 py-3 text-secondary-600">{item.email}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-secondary-600">{item.phone}</td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
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
                        onClick={() => setDeleting(item)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && (
        <AdvisoryMemberFormModal
          member={editing}
          nextOrder={nextOrder}
          onSave={handleSave}
          saving={saving}
          onClose={() => setFormOpen(false)}
        />
      )}

      {deleting && (
        <ConfirmDeleteModal
          title="Delete advisory member?"
          message={`"${deleting.name}" will be permanently removed.`}
          busy={deletingBusy}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
