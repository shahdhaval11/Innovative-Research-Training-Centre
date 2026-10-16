import path from "path";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { DEFAULT_INTERNSHIP_IMAGE, type ManagedInternship } from "../constData/internshipManage";

export const INTERNSHIP_COLLECTION_NAME = "internship";

export const IMAGE_COLLECTION_NAME = "internship_images";
export const IMAGE_URL_PREFIX = "/api/internship/image";
const IMAGE_CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

type InternshipDocument = {
  _id: ObjectId;
  internshipDomain: string;
  mode: string;
  track: string;
  slug: string;
  description: string;
  image: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateInternshipInput = {
  internshipDomain: string;
  mode: string;
  track: string;
  slug: string;
  description: string;
  duration: string;
  image: File | null;
};

function toInternship(doc: InternshipDocument): ManagedInternship {
  return {
    id: doc._id.toString(),
    internshipDomain: doc.internshipDomain,
    mode: doc.mode,
    track: doc.track,
    slug: doc.slug,
    description: doc.description,
    image: doc.image,
    duration: doc.duration,
  };
}

export class DuplicateSlugError extends Error {}

export function getImageExtension(file: File): string | null {
  const ext = path.extname(file.name || "").toLowerCase();
  return ALLOWED_IMAGE_EXTENSIONS.includes(ext) ? ext : null;
}

// Images live in MongoDB rather than on disk: files added to public/ at runtime
// are not served by the production server, and the host filesystem may be ephemeral.
async function saveImage(file: File, ext: string): Promise<string> {
  const db = await getDb();
  const result = await db.collection(IMAGE_COLLECTION_NAME).insertOne({
    data: Buffer.from(await file.arrayBuffer()),
    contentType: IMAGE_CONTENT_TYPES[ext] ?? "image/jpeg",
    created_at: new Date(),
  });
  return `${IMAGE_URL_PREFIX}/${result.insertedId.toString()}`;
}

// Only remove images this module stored; never the shared default image.
async function removeUploadedImage(publicPath: string): Promise<void> {
  if (!publicPath.startsWith(`${IMAGE_URL_PREFIX}/`)) return;
  const id = publicPath.slice(IMAGE_URL_PREFIX.length + 1);
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();
  await db
    .collection(IMAGE_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) })
    .catch(() => undefined);
}

export async function getInternships(mode?: string): Promise<ManagedInternship[]> {
  const db = await getDb();
  const docs = await db
    .collection<InternshipDocument>(INTERNSHIP_COLLECTION_NAME)
    .find(mode ? { mode } : {})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toInternship);
}

export async function createInternship(input: CreateInternshipInput): Promise<ManagedInternship> {
  // Check first so a rejected duplicate doesn't leave an orphaned upload behind.
  const existing = await (
    await getDb()
  )
    .collection(INTERNSHIP_COLLECTION_NAME)
    .findOne({ slug: input.slug }, { projection: { _id: 1 } });
  if (existing) throw new DuplicateSlugError();

  let image = DEFAULT_INTERNSHIP_IMAGE;
  if (input.image) {
    const ext = getImageExtension(input.image);
    if (!ext) throw new Error("Unsupported image type.");
    image = await saveImage(input.image, ext);
  }

  const now = new Date();
  const doc: Omit<InternshipDocument, "_id"> = {
    internshipDomain: input.internshipDomain,
    mode: input.mode,
    track: input.track,
    slug: input.slug,
    description: input.description,
    image,
    duration: input.duration,
    createdAt: now,
    updatedAt: now,
  };

  const db = await getDb();
  const collection = db.collection<Omit<InternshipDocument, "_id">>(INTERNSHIP_COLLECTION_NAME);
  await collection.createIndex({ slug: 1 }, { unique: true, sparse: true });

  let result;
  try {
    result = await collection.insertOne(doc);
  } catch (error) {
    if ((error as { code?: number }).code === 11000) throw new DuplicateSlugError();
    throw error;
  }

  return toInternship({ _id: result.insertedId, ...doc });
}

export async function updateInternship(
  id: string,
  input: CreateInternshipInput,
): Promise<ManagedInternship | null> {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDb();
  const collection = db.collection<InternshipDocument>(INTERNSHIP_COLLECTION_NAME);
  const _id = new ObjectId(id);

  const current = await collection.findOne({ _id });
  if (!current) return null;

  // Check first so a rejected duplicate doesn't leave an orphaned upload behind.
  const clash = await collection.findOne(
    { slug: input.slug, _id: { $ne: _id } },
    { projection: { _id: 1 } },
  );
  if (clash) throw new DuplicateSlugError();

  let image = current.image;
  if (input.image) {
    const ext = getImageExtension(input.image);
    if (!ext) throw new Error("Unsupported image type.");
    image = await saveImage(input.image, ext);
  }

  let updated;
  try {
    updated = await collection.findOneAndUpdate(
      { _id },
      {
        $set: {
          internshipDomain: input.internshipDomain,
          mode: input.mode,
          track: input.track,
          slug: input.slug,
          description: input.description,
          duration: input.duration,
          image,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );
  } catch (error) {
    if (image !== current.image) await removeUploadedImage(image);
    if ((error as { code?: number }).code === 11000) throw new DuplicateSlugError();
    throw error;
  }

  if (!updated) {
    if (image !== current.image) await removeUploadedImage(image);
    return null;
  }

  if (image !== current.image) await removeUploadedImage(current.image);

  return toInternship(updated);
}
