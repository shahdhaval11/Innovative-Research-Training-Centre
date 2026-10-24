import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getImageExtension } from "./internshipService";

export const ADVISORY_TEAM_COLLECTION_NAME = "advisory_team";

export const PHOTO_COLLECTION_NAME = "advisory_team_photos";
export const PHOTO_URL_PREFIX = "/api/advisory-team/photo";
const PHOTO_CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

type AdvisoryMemberDocument = {
  _id: ObjectId;
  name: string;
  designation: string;
  affiliation: string;
  email: string;
  phone: string;
  photo: string; // PHOTO_URL_PREFIX/<id>, or "" when none was uploaded
  createdAt: Date;
  updatedAt: Date;
};

export type AdvisoryMember = {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  email: string;
  phone: string;
  photo: string;
};

export type AdvisoryMemberInput = {
  name: string;
  designation: string;
  affiliation: string;
  email: string;
  phone: string;
  photo: File | null;
};

function toAdvisoryMember(doc: AdvisoryMemberDocument): AdvisoryMember {
  return {
    id: doc._id.toString(),
    name: doc.name,
    designation: doc.designation,
    affiliation: doc.affiliation,
    email: doc.email ?? "",
    phone: doc.phone ?? "",
    photo: doc.photo,
  };
}

// Photos live in MongoDB rather than on disk, like internship images.
async function savePhoto(file: File): Promise<string> {
  const ext = getImageExtension(file);
  if (!ext) throw new Error("Unsupported image type.");

  const db = await getDb();
  const result = await db.collection(PHOTO_COLLECTION_NAME).insertOne({
    data: Buffer.from(await file.arrayBuffer()),
    contentType: PHOTO_CONTENT_TYPES[ext] ?? "image/jpeg",
    created_at: new Date(),
  });
  return `${PHOTO_URL_PREFIX}/${result.insertedId.toString()}`;
}

async function removePhoto(photoUrl: string): Promise<void> {
  if (!photoUrl.startsWith(`${PHOTO_URL_PREFIX}/`)) return;
  const id = photoUrl.slice(PHOTO_URL_PREFIX.length + 1);
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();
  await db
    .collection(PHOTO_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) })
    .catch(() => undefined);
}

export async function getAdvisoryMembers(): Promise<AdvisoryMember[]> {
  const db = await getDb();
  const docs = await db
    .collection<AdvisoryMemberDocument>(ADVISORY_TEAM_COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toAdvisoryMember);
}

export async function createAdvisoryMember(input: AdvisoryMemberInput): Promise<AdvisoryMember> {
  const photo = input.photo ? await savePhoto(input.photo) : "";

  const now = new Date();
  const doc: AdvisoryMemberDocument = {
    _id: new ObjectId(),
    name: input.name,
    designation: input.designation,
    affiliation: input.affiliation,
    email: input.email,
    phone: input.phone,
    photo,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await (await getDb())
      .collection<AdvisoryMemberDocument>(ADVISORY_TEAM_COLLECTION_NAME)
      .insertOne(doc);
  } catch (error) {
    await removePhoto(photo);
    throw error;
  }

  return toAdvisoryMember(doc);
}

export async function updateAdvisoryMember(
  id: string,
  input: AdvisoryMemberInput,
): Promise<AdvisoryMember | null> {
  if (!ObjectId.isValid(id)) return null;

  const collection = (await getDb()).collection<AdvisoryMemberDocument>(
    ADVISORY_TEAM_COLLECTION_NAME,
  );
  const _id = new ObjectId(id);

  const current = await collection.findOne({ _id });
  if (!current) return null;

  const photo = input.photo ? await savePhoto(input.photo) : current.photo;

  let updated;
  try {
    updated = await collection.findOneAndUpdate(
      { _id },
      {
        $set: {
          name: input.name,
          designation: input.designation,
          affiliation: input.affiliation,
          email: input.email,
          phone: input.phone,
          photo,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );
  } catch (error) {
    if (photo !== current.photo) await removePhoto(photo);
    throw error;
  }

  if (!updated) {
    if (photo !== current.photo) await removePhoto(photo);
    return null;
  }

  if (photo !== current.photo) await removePhoto(current.photo);

  return toAdvisoryMember(updated);
}

export async function deleteAdvisoryMember(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const deleted = await (await getDb())
    .collection<AdvisoryMemberDocument>(ADVISORY_TEAM_COLLECTION_NAME)
    .findOneAndDelete({ _id: new ObjectId(id) });
  if (!deleted) return false;

  await removePhoto(deleted.photo);
  return true;
}
