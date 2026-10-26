import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { EVENT_REGISTRATION_COLLECTION_NAME } from "@/modules/events/services/eventRegistrationService";
import { SCREENSHOT_COLLECTION_NAME } from "@/modules/internship/services/internshipRegistrationService";

type EventRegistrationDocument = {
  _id: ObjectId;
  type: string; // "Event" | "Workshop"
  eventId: string;
  eventName: string;
  fees: number;
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
  paymentScreenshotPath: string | null; // null for free events
  created_at: Date;
  status: string;
};

export type EventRegistration = Omit<EventRegistrationDocument, "_id" | "created_at"> & {
  id: string;
  createdAt: string;
};

function toRegistration({ _id, created_at, ...rest }: EventRegistrationDocument): EventRegistration {
  return { ...rest, id: _id.toString(), createdAt: new Date(created_at).toISOString() };
}

export async function getEventRegistrations(): Promise<EventRegistration[]> {
  const docs = await (await getDb())
    .collection<EventRegistrationDocument>(EVENT_REGISTRATION_COLLECTION_NAME)
    .find({})
    .sort({ created_at: -1 })
    .toArray();

  return docs.map(toRegistration);
}

export async function deleteEventRegistration(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const db = await getDb();
  const deleted = await db
    .collection<EventRegistrationDocument>(EVENT_REGISTRATION_COLLECTION_NAME)
    .findOneAndDelete({ _id: new ObjectId(id) });
  if (!deleted) return false;

  const storedId = deleted.paymentScreenshotPath?.match(
    /^\/api\/internship\/screenshot\/([a-f0-9]{24})$/,
  )?.[1];
  if (storedId) {
    await db
      .collection(SCREENSHOT_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(storedId) })
      .catch(() => {});
  }

  return true;
}
