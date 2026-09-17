import path from "path";
import { unlink } from "fs/promises";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

const COLLECTION_NAME = "student_cource_registration";

type InternshipRegistrationDocument = {
  _id: ObjectId;
  type: string;
  internshipId: number;
  internshipName: string;
  programMode: string | null;
  fullName: string;
  dob: string | null;
  gender: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  currentStatus: string;
  currentStatusOther: string | null;
  highestQualification: string;
  highestQualificationOther: string | null;
  subject: string;
  yearOrPassout: string | null;
  college: string;
  affiliation: string | null;
  consent: boolean;
  paymentScreenshotPath: string;
  created_at: Date;
  status: string;
};

export type InternshipRegistration = {
  id: string;
  type: string;
  internshipId: number;
  internshipName: string;
  programMode: string | null;
  fullName: string;
  dob: string | null;
  gender: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  currentStatus: string;
  currentStatusOther: string | null;
  highestQualification: string;
  highestQualificationOther: string | null;
  subject: string;
  yearOrPassout: string | null;
  college: string;
  affiliation: string | null;
  consent: boolean;
  paymentScreenshotPath: string;
  createdAt: string;
  status: string;
};

function toRegistration(doc: InternshipRegistrationDocument): InternshipRegistration {
  return {
    id: doc._id.toString(),
    type: doc.type,
    internshipId: doc.internshipId,
    internshipName: doc.internshipName,
    programMode: doc.programMode,
    fullName: doc.fullName,
    dob: doc.dob,
    gender: doc.gender,
    mobile: doc.mobile,
    email: doc.email,
    city: doc.city,
    state: doc.state,
    currentStatus: doc.currentStatus,
    currentStatusOther: doc.currentStatusOther,
    highestQualification: doc.highestQualification,
    highestQualificationOther: doc.highestQualificationOther,
    subject: doc.subject,
    yearOrPassout: doc.yearOrPassout,
    college: doc.college,
    affiliation: doc.affiliation,
    consent: doc.consent,
    paymentScreenshotPath: doc.paymentScreenshotPath,
    createdAt: new Date(doc.created_at).toISOString(),
    status: doc.status,
  };
}

export async function getInternshipRegistrations(): Promise<InternshipRegistration[]> {
  const db = await getDb();
  const docs = await db
    .collection<InternshipRegistrationDocument>(COLLECTION_NAME)
    .find({})
    .sort({ created_at: -1 })
    .toArray();

  return docs.map(toRegistration);
}

export async function deleteInternshipRegistration(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const db = await getDb();
  const collection = db.collection<InternshipRegistrationDocument>(COLLECTION_NAME);
  const objectId = new ObjectId(id);

  const doc = await collection.findOne({ _id: objectId });
  if (!doc) return false;

  await collection.deleteOne({ _id: objectId });

  if (doc.paymentScreenshotPath) {
    const filePath = path.join(process.cwd(), "public", doc.paymentScreenshotPath);
    await unlink(filePath).catch(() => {});
  }

  return true;
}
