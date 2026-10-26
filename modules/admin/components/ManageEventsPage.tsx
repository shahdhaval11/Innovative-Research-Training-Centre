"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  setEventStatus,
  updateEvent,
  type ManagedEvent,
} from "@/lib/redux/slices/eventsSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EventFormModal, { type EventFormValues } from "./EventFormModal";
import EventViewModal from "./EventViewModal";
import { formatEventDateTime, formatEventFees } from "./eventFormat";

export default function ManageEventsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.events);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedEvent | null>(null);
  const [saving, setSaving] = useState(false);
  const [viewing, setViewing] = useState<ManagedEvent | null>(null);
  const [deleting, setDeleting] = useState<ManagedEvent | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  function openForm(event: ManagedEvent | null) {
    setEditing(event);
    setFormOpen(true);
  }

  async function handleSave(values: EventFormValues) {
    const formData = new FormData();
    formData.set("type", values.type);
    formData.set("title", values.title);
    formData.set("description", values.description);
    // datetime-local values are in the browser's timezone; send an absolute instant.
    formData.set("startAt", new Date(values.startAt).toISOString());
    formData.set("endAt", new Date(values.endAt).toISOString());
    formData.set("fees", values.fees);
    if (values.bannerFile) formData.set("banner", values.bannerFile);
    if (values.brochureFile) formData.set("brochure", values.brochureFile);

    setSaving(true);
    try {
      if (editing) {
        await dispatch(updateEvent({ id: editing.id, formData })).unwrap();
        toast.success("Event updated.");
      } else {
        await dispatch(createEvent(formData)).unwrap();
        toast.success("Event added.");
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(item: ManagedEvent) {
    const next = item.status === "active" ? "inactive" : "active";
    setTogglingId(item.id);
    try {
      await dispatch(setEventStatus({ id: item.id, status: next })).unwrap();
      toast.success(`Event marked ${next}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update event status.");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!deleting) return;

    setDeletingBusy(true);
    try {
      await dispatch(deleteEvent(deleting.id)).unwrap();
      toast.success("Event deleted.");
      setDeleting(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete event.");
    } finally {
      setDeletingBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-secondary-800">
            Manage Events &amp; Workshop
          </h1>
          <p className="mt-1 text-sm text-secondary-500">
            Add, edit, activate or deactivate the events and workshops shown on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openForm(null)}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add Event / Workshop
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-sm">
        {status === "loading" && <p className="p-6 text-sm text-secondary-500">Loading events…</p>}

        {status === "failed" && (
          <p className="p-6 text-sm text-red-600">{error ?? "Failed to load events."}</p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary-400">
            <CalendarDays className="h-8 w-8" />
            <p className="text-sm">No event or workshop found.</p>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-secondary-100 bg-secondary-50 text-xs tracking-wide text-secondary-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Banner</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Starts</th>
                  <th className="px-5 py-3 font-semibold">Ends</th>
                  <th className="px-5 py-3 font-semibold">Fees</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {items.map((item) => {
                  const enabled = item.status === "active";
                  return (
                    <tr key={item.id} className="hover:bg-secondary-50">
                      <td className="px-5 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.banner} alt="" className="h-10 w-16 rounded object-cover" />
                      </td>
                      <td className="px-5 py-3 text-secondary-600">{item.type}</td>
                      <td className="px-5 py-3 font-medium text-secondary-800">{item.title}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-secondary-600">
                        {formatEventDateTime(item.startAt)}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-secondary-600">
                        {formatEventDateTime(item.endAt)}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-secondary-600">
                        {formatEventFees(item.fees)}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            aria-label={`${enabled ? "Deactivate" : "Activate"} ${item.title}`}
                            disabled={togglingId === item.id}
                            onClick={() => handleToggle(item)}
                            className={clsx(
                              "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-60",
                              enabled ? "bg-primary-600" : "bg-secondary-300",
                            )}
                          >
                            <span
                              className={clsx(
                                "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
                                enabled ? "translate-x-4.5" : "translate-x-0.5",
                              )}
                            />
                          </button>
                          <span className="text-xs text-secondary-600">
                            {enabled ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setViewing(item)}
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-secondary-600 hover:bg-secondary-100"
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
                          onClick={() => setDeleting(item)}
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
        <EventFormModal
          event={editing}
          onSave={handleSave}
          saving={saving}
          onClose={() => setFormOpen(false)}
        />
      )}

      {viewing && <EventViewModal event={viewing} onClose={() => setViewing(null)} />}

      {deleting && (
        <ConfirmDeleteModal
          title="Delete event?"
          message={`"${deleting.title}" will be permanently removed.`}
          busy={deletingBusy}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
