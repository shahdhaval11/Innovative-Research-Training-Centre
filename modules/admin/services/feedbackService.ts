import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const FEEDBACK_COLLECTION_NAME = "feedback";

export const FEEDBACK_STATUSES = ["new", "approved", "rejected"] as const;
export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

// An admin review can only move feedback to one of these; "new" is the initial state.
export const REVIEW_STATUSES = ["approved", "rejected"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export const DEFAULT_FEEDBACK_STATUS: FeedbackStatus = "new";

type FeedbackDocument = {
  _id: ObjectId;
  name: string;
  designation: string;
  email: string;
  message: string;
  rating: number;
  status: FeedbackStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type Feedback = {
  id: string;
  name: string;
  designation: string;
  email: string;
  message: string;
  rating: number;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateFeedbackInput = {
  name: string;
  designation: string;
  email: string;
  message: string;
  rating: number;
};

function toFeedback(doc: FeedbackDocument): Feedback {
  return {
    id: doc._id.toString(),
    name: doc.name,
    designation: doc.designation,
    email: doc.email,
    message: doc.message,
    rating: doc.rating,
    status: doc.status,
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
}

export function isReviewStatus(value: unknown): value is ReviewStatus {
  return typeof value === "string" && (REVIEW_STATUSES as readonly string[]).includes(value);
}

async function collection() {
  return (await getDb()).collection<FeedbackDocument>(FEEDBACK_COLLECTION_NAME);
}

export async function createFeedback(input: CreateFeedbackInput): Promise<Feedback> {
  const now = new Date();
  const doc: FeedbackDocument = {
    _id: new ObjectId(),
    ...input,
    status: DEFAULT_FEEDBACK_STATUS,
    createdAt: now,
    updatedAt: now,
  };
  await (await collection()).insertOne(doc);
  return toFeedback(doc);
}

export async function getFeedbacks(): Promise<Feedback[]> {
  const docs = await (await collection()).find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toFeedback);
}

export async function getFeedbackById(id: string): Promise<Feedback | null> {
  if (!ObjectId.isValid(id)) return null;
  const doc = await (await collection()).findOne({ _id: new ObjectId(id) });
  return doc ? toFeedback(doc) : null;
}

export async function updateFeedbackStatus(
  id: string,
  status: ReviewStatus,
): Promise<Feedback | null> {
  if (!ObjectId.isValid(id)) return null;
  const updated = await (
    await collection()
  ).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  return updated ? toFeedback(updated) : null;
}

export async function deleteFeedback(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const result = await (await collection()).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
