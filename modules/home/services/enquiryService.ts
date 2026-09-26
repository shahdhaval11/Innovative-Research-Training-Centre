import { getDb } from "@/lib/mongodb";

const COLLECTION_NAME = "nano_enquiries";

export type CreateEnquiryInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string | null;
  message: string | null;
};

export async function createEnquiry(input: CreateEnquiryInput): Promise<{ id: string }> {
  const now = new Date();
  const doc = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    service: input.service ?? "",
    message: input.message ?? "",
    status: "unseen" as const,
    createdAt: now,
    updatedAt: now,
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne(doc);

  return { id: result.insertedId.toString() };
}
