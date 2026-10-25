import path from "node:path";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const EVENTS_COLLECTION_NAME = "nano_events";

export const FILE_COLLECTION_NAME = "nano_event_files";
export const FILE_URL_PREFIX = "/api/events/file";

export const EVENT_TYPES = ["Event", "Workshop"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_STATUSES = ["active", "inactive"] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

export const MAX_BANNER_BYTES = 5 * 1024 * 1024;
export const MAX_BROCHURE_BYTES = 10 * 1024 * 1024;

const BANNER_CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};
const BROCHURE_CONTENT_TYPES: Record<string, string> = {
  ...BANNER_CONTENT_TYPES,
  ".pdf": "application/pdf",
};

type EventDocument = {
  _id: ObjectId;
  type: EventType;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  banner: string; // FILE_URL_PREFIX/<id>
  brochure: string; // FILE_URL_PREFIX/<id>, or "" when none was uploaded
  brochureName: string;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ManagedEvent = {
  id: string;
  type: EventType;
  title: string;
  description: string;
  startAt: string; // ISO
  endAt: string; // ISO
  banner: string;
  brochure: string;
  brochureName: string;
  status: EventStatus;
};

export type EventInput = {
  type: EventType;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  banner: File | null;
  brochure: File | null;
};

function toManagedEvent(doc: EventDocument): ManagedEvent {
  return {
    id: doc._id.toString(),
    type: doc.type,
    title: doc.title,
    description: doc.description,
    startAt: doc.startAt.toISOString(),
    endAt: doc.endAt.toISOString(),
    banner: doc.banner,
    brochure: doc.brochure,
    brochureName: doc.brochureName ?? "",
    status: doc.status,
  };
}

export function getFileExtension(file: File, allowed: Record<string, string>): string | null {
  const ext = path.extname(file.name || "").toLowerCase();
  return ext in allowed ? ext : null;
}

export const getBannerExtension = (file: File) => getFileExtension(file, BANNER_CONTENT_TYPES);
export const getBrochureExtension = (file: File) => getFileExtension(file, BROCHURE_CONTENT_TYPES);

// Files live in MongoDB rather than on disk, like internship images.
async function saveFile(file: File, contentTypes: Record<string, string>): Promise<string> {
  const ext = getFileExtension(file, contentTypes);
  if (!ext) throw new Error("Unsupported file type.");

  const db = await getDb();
  const result = await db.collection(FILE_COLLECTION_NAME).insertOne({
    data: Buffer.from(await file.arrayBuffer()),
    contentType: contentTypes[ext],
    name: file.name,
    created_at: new Date(),
  });
  return `${FILE_URL_PREFIX}/${result.insertedId.toString()}`;
}

async function removeFile(fileUrl: string): Promise<void> {
  if (!fileUrl.startsWith(`${FILE_URL_PREFIX}/`)) return;
  const id = fileUrl.slice(FILE_URL_PREFIX.length + 1);
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();
  await db
    .collection(FILE_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) })
    .catch(() => undefined);
}

export async function getEvents(): Promise<ManagedEvent[]> {
  const db = await getDb();
  const docs = await db
    .collection<EventDocument>(EVENTS_COLLECTION_NAME)
    .find({})
    .sort({ startAt: -1 })
    .toArray();

  return docs.map(toManagedEvent);
}

export async function createEvent(input: EventInput): Promise<ManagedEvent> {
  if (!input.banner) throw new Error("Banner image is required.");

  const banner = await saveFile(input.banner, BANNER_CONTENT_TYPES);
  let brochure = "";

  try {
    brochure = input.brochure ? await saveFile(input.brochure, BROCHURE_CONTENT_TYPES) : "";

    const now = new Date();
    const doc: EventDocument = {
      _id: new ObjectId(),
      type: input.type,
      title: input.title,
      description: input.description,
      startAt: input.startAt,
      endAt: input.endAt,
      banner,
      brochure,
      brochureName: input.brochure?.name ?? "",
      status: "active",
      createdAt: now,
      updatedAt: now,
    };

    await (await getDb()).collection<EventDocument>(EVENTS_COLLECTION_NAME).insertOne(doc);
    return toManagedEvent(doc);
  } catch (error) {
    await removeFile(banner);
    await removeFile(brochure);
    throw error;
  }
}

export async function updateEvent(id: string, input: EventInput): Promise<ManagedEvent | null> {
  if (!ObjectId.isValid(id)) return null;

  const collection = (await getDb()).collection<EventDocument>(EVENTS_COLLECTION_NAME);
  const _id = new ObjectId(id);

  const current = await collection.findOne({ _id });
  if (!current) return null;

  const banner = input.banner ? await saveFile(input.banner, BANNER_CONTENT_TYPES) : current.banner;
  const newBanner = banner !== current.banner;
  let brochure = current.brochure;
  let newBrochure = false;

  try {
    if (input.brochure) {
      brochure = await saveFile(input.brochure, BROCHURE_CONTENT_TYPES);
      newBrochure = true;
    }

    const updated = await collection.findOneAndUpdate(
      { _id },
      {
        $set: {
          type: input.type,
          title: input.title,
          description: input.description,
          startAt: input.startAt,
          endAt: input.endAt,
          banner,
          brochure,
          brochureName: newBrochure ? input.brochure!.name : current.brochureName,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    if (!updated) {
      if (newBanner) await removeFile(banner);
      if (newBrochure) await removeFile(brochure);
      return null;
    }

    if (newBanner) await removeFile(current.banner);
    if (newBrochure) await removeFile(current.brochure);

    return toManagedEvent(updated);
  } catch (error) {
    if (newBanner) await removeFile(banner);
    if (newBrochure) await removeFile(brochure);
    throw error;
  }
}

export async function setEventStatus(id: string, status: EventStatus): Promise<ManagedEvent | null> {
  if (!ObjectId.isValid(id)) return null;

  const updated = await (await getDb())
    .collection<EventDocument>(EVENTS_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: "after" },
    );

  return updated ? toManagedEvent(updated) : null;
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const deleted = await (await getDb())
    .collection<EventDocument>(EVENTS_COLLECTION_NAME)
    .findOneAndDelete({ _id: new ObjectId(id) });
  if (!deleted) return false;

  await removeFile(deleted.banner);
  await removeFile(deleted.brochure);
  return true;
}

// Public queries for the website: only active events, and only those that have not ended.
export async function getUpcomingActiveEvents(): Promise<ManagedEvent[]> {
  const docs = await (await getDb())
    .collection<EventDocument>(EVENTS_COLLECTION_NAME)
    .find({ status: "active", endAt: { $gte: new Date() } })
    .sort({ startAt: 1 })
    .toArray();

  return docs.map(toManagedEvent);
}

export async function getActiveEventById(id: string): Promise<ManagedEvent | null> {
  if (!ObjectId.isValid(id)) return null;

  const doc = await (await getDb())
    .collection<EventDocument>(EVENTS_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id), status: "active" });

  return doc ? toManagedEvent(doc) : null;
}
