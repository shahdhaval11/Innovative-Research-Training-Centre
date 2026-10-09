import { getDb } from "@/lib/mongodb";

const COLLECTION_NAME = "student_internship_registrations";

export type RegisterInternshipApplicationInput = {
  internshipId: number | string;
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
  paymentScreenshot: File;
};

export const SCREENSHOT_COLLECTION_NAME = "internship_payment_screenshots";
export const SCREENSHOT_URL_PREFIX = "/api/internship/screenshot";

// Screenshots live in MongoDB rather than on disk: the host's filesystem may be
// read-only or ephemeral, and files added to public/ at runtime are not served.
async function savePaymentScreenshot(file: File): Promise<string> {
  const db = await getDb();
  const result = await db.collection(SCREENSHOT_COLLECTION_NAME).insertOne({
    data: Buffer.from(await file.arrayBuffer()),
    contentType: file.type.startsWith("image/") ? file.type : "image/jpeg",
    created_at: new Date(),
  });
  return `${SCREENSHOT_URL_PREFIX}/${result.insertedId.toString()}`;
}

export async function registerInternshipApplication(
  input: RegisterInternshipApplicationInput,
): Promise<{ id: string; paymentScreenshotPath: string }> {
  const paymentScreenshotPath = await savePaymentScreenshot(input.paymentScreenshot);

  const doc = {
    type: "Internship",
    internshipId: input.internshipId,
    internshipName: input.internshipName,
    programMode: input.programMode ?? null,
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
  const result = await db.collection(COLLECTION_NAME).insertOne(doc);

  return { id: result.insertedId.toString(), paymentScreenshotPath };
}
