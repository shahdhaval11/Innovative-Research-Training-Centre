import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const ENQUIRIES_COLLECTION_NAME = "nano_enquiries";

export type EnquiryStatus = "unseen" | "seen";

type EnquiryDocument = {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  status?: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

function toEnquiry(doc: EnquiryDocument): Enquiry {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    subject: doc.subject,
    service: doc.service,
    message: doc.message,
    status: doc.status ?? "unseen",
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const db = await getDb();
  const docs = await db
    .collection<EnquiryDocument>(ENQUIRIES_COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toEnquiry);
}

export async function getUnseenEnquiriesCount(): Promise<number> {
  const db = await getDb();
  return db.collection<EnquiryDocument>(ENQUIRIES_COLLECTION_NAME).countDocuments({
    status: { $ne: "seen" },
  });
}

export async function markEnquiryAsSeen(id: string): Promise<Enquiry | null> {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDb();
  const collection = db.collection<EnquiryDocument>(ENQUIRIES_COLLECTION_NAME);
  const objectId = new ObjectId(id);

  const result = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: { status: "seen", updatedAt: new Date() } },
    { returnDocument: "after" },
  );

  return result ? toEnquiry(result) : null;
}
