import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { getDb } from "@/lib/mongodb";

const COLLECTION_NAME = "student_cource_registration";
const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "payment", "internship");
const PUBLIC_PATH_PREFIX = "/images/payment/internship";

export type RegisterInternshipApplicationInput = {
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
  paymentScreenshot: File;
};

function buildScreenshotFileName(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const safeExt = /^\.[a-z0-9]+$/.test(ext) ? ext : ".jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
}

async function savePaymentScreenshot(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const fileName = buildScreenshotFileName(file.name || "");
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, fileName), buffer);
  return `${PUBLIC_PATH_PREFIX}/${fileName}`;
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
