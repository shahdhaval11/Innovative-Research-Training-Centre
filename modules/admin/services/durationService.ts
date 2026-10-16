import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const DURATION_COLLECTION_NAME = "duration";

export const DURATION_TYPES = ["internship", "course"] as const;
export type DurationType = (typeof DURATION_TYPES)[number];

type DurationDocument = {
  _id: ObjectId;
  duration: string;
  amount: string;
  type: DurationType;
  createdAt: Date;
};

export type Duration = {
  id: string;
  duration: string;
  amount: string;
  type: DurationType;
  createdAt: string;
};

function toDuration(doc: DurationDocument): Duration {
  return {
    id: doc._id.toString(),
    duration: doc.duration,
    amount: doc.amount,
    type: doc.type,
    createdAt: new Date(doc.createdAt).toISOString(),
  };
}

export function isDurationType(value: unknown): value is DurationType {
  return typeof value === "string" && (DURATION_TYPES as readonly string[]).includes(value);
}

export async function getDurations(type?: DurationType): Promise<Duration[]> {
  const db = await getDb();
  const docs = await db
    .collection<DurationDocument>(DURATION_COLLECTION_NAME)
    .find(type ? { type } : {})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toDuration);
}

export async function createDuration(data: {
  duration: string;
  amount: string;
  type: DurationType;
}): Promise<Duration> {
  const db = await getDb();
  const doc: DurationDocument = { _id: new ObjectId(), ...data, createdAt: new Date() };
  await db.collection<DurationDocument>(DURATION_COLLECTION_NAME).insertOne(doc);
  return toDuration(doc);
}

export async function internshipDurationExists(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const found = await db
    .collection<DurationDocument>(DURATION_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id), type: "internship" }, { projection: { _id: 1 } });
  return found !== null;
}
