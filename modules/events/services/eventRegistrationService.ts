import { getDb } from "@/lib/mongodb";
import {
  DuplicateRegistrationError,
  findDuplicateRegistration,
  savePaymentScreenshot,
} from "@/modules/internship/services/internshipRegistrationService";
import type { ManagedEvent } from "@/modules/admin/services/eventService";

export const EVENT_REGISTRATION_COLLECTION_NAME = "event_registration";

export function findDuplicateEventRegistration(eventId: string, email: string, mobile: string) {
  return findDuplicateRegistration(EVENT_REGISTRATION_COLLECTION_NAME, { eventId }, email, mobile);
}

export type RegisterEventApplicationInput = {
  event: ManagedEvent;
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
  paymentScreenshot: File | null; // null for free events
};

export async function registerEventApplication(
  input: RegisterEventApplicationInput,
): Promise<{ id: string; paymentScreenshotPath: string | null }> {
  const duplicate = await findDuplicateEventRegistration(
    input.event.id,
    input.email,
    input.mobile,
  );
  if (duplicate) throw new DuplicateRegistrationError(duplicate);

  const paymentScreenshotPath = input.paymentScreenshot
    ? await savePaymentScreenshot(input.paymentScreenshot)
    : null;

  const doc = {
    type: input.event.type, // "Event" | "Workshop"
    eventId: input.event.id,
    eventName: input.event.title,
    // Taken from the database, never from the client.
    fees: input.event.fees,
    fullName: input.fullName,
    dob: input.dob ?? null,
    gender: input.gender,
    mobile: input.mobile,
    email: input.email,
    city: input.city,
    state: input.state,
    currentStatus: input.currentStatus,
    currentStatusOther: input.currentStatusOther ?? null,
    highestQualification: input.highestQualification,
    highestQualificationOther: input.highestQualificationOther ?? null,
    subject: input.subject,
    yearOrPassout: input.yearOrPassout ?? null,
    college: input.college,
    affiliation: input.affiliation ?? null,
    consent: input.consent,
    paymentScreenshotPath,
    created_at: new Date(),
    status: "Active",
  };

  const db = await getDb();
  const result = await db.collection(EVENT_REGISTRATION_COLLECTION_NAME).insertOne(doc);

  return { id: result.insertedId.toString(), paymentScreenshotPath };
}
