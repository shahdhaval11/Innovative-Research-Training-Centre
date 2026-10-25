"use client";

import { useEffect, useState } from "react";
import { Eye, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import StarRating from "@/components/common/StarRating";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  deleteFeedback,
  fetchFeedbacks,
  setFeedbackStatus,
  type Feedback,
} from "@/lib/redux/slices/feedbackSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import FeedbackViewModal, { FeedbackStatusBadge } from "./FeedbackViewModal";

export default function ManageFeedbackPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.feedback);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState<Feedback | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  // Read from the store so the open modal reflects the latest status.
  const viewing = items.find((item) => item.id === viewingId) ?? null;

  async function review(status: "approved" | "rejected") {
    if (!viewing) return;

    setUpdating(true);
    try {
      await dispatch(setFeedbackStatus({ id: viewing.id, status })).unwrap();
      toast.success(status === "approved" ? "Feedback approved." : "Feedback rejected.");
      if (status === "rejected") setViewingId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update feedback.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleting) return;

    setDeletingBusy(true);
    try {
      await dispatch(deleteFeedback(deleting.id)).unwrap();
      toast.success("Feedback deleted.");
      setDeleting(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete feedback.");
    } finally {
      setDeletingBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-secondary-800">Feedback</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Review feedback submitted from the website. New feedback is marked New until you approve or reject it.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-secondary-100 bg-white shadow-sm">
        {status === "loading" && <p className="p-6 text-sm text-secondary-500">Loading feedback…</p>}

        {status === "failed" && (
          <p className="p-6 text-sm text-red-600">{error ?? "Failed to load feedback."}</p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary-400">
            <MessageSquare className="h-8 w-8" />
            <p className="text-sm">No feedback found.</p>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-secondary-100 bg-secondary-50 text-xs tracking-wide text-secondary-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Designation</th>
                  <th className="px-5 py-3 font-semibold">Rating</th>
                  <th className="px-5 py-3 font-semibold">Message</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary-50">
                    <td className="px-5 py-3 font-medium text-secondary-800">{item.name}</td>
                    <td className="px-5 py-3 text-secondary-600">{item.designation}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <StarRating value={item.rating} />
                    </td>
                    <td className="max-w-xs truncate px-5 py-3 text-secondary-600">{item.message}</td>
                    <td className="px-5 py-3">
                      <FeedbackStatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-secondary-600">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setViewingId(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
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

      {viewing && (
        <FeedbackViewModal
          feedback={viewing}
          busy={updating}
          onApprove={() => review("approved")}
          onReject={() => review("rejected")}
          onClose={() => setViewingId(null)}
        />
      )}

      {deleting && (
        <ConfirmDeleteModal
          title="Delete feedback?"
          message={`The feedback from "${deleting.name}" will be permanently removed.`}
          busy={deletingBusy}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
