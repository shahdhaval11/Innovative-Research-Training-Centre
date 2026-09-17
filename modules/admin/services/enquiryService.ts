import type { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

type EnquiryDocument = {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
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
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const db = await getDb();
  const docs = await db
    .collection<EnquiryDocument>("nano_enquiries")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toEnquiry);
}
