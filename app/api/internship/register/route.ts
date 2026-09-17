import { NextResponse } from "next/server";
import { registerInternshipApplication } from "@/modules/internship/services/internshipRegistrationService";

function readString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const internshipIdRaw = readString(formData, "internshipId");
  const internshipId = internshipIdRaw !== null ? Number(internshipIdRaw) : null;
  const internshipName = readString(formData, "internshipName");
  const fullName = readString(formData, "fullName");
  const gender = readString(formData, "gender");
  const mobile = readString(formData, "mobile");
  const email = readString(formData, "email");
  const city = readString(formData, "city");
  const state = readString(formData, "state");
  const currentStatus = readString(formData, "currentStatus");
  const highestQualification = readString(formData, "highestQualification");
  const subject = readString(formData, "subject");
  const college = readString(formData, "college");
  const consent = formData.get("consent") === "true";
  const paymentScreenshot = formData.get("paymentScreenshot");

  if (
    internshipId === null ||
    !Number.isFinite(internshipId) ||
    !internshipName ||
    !fullName ||
    !gender ||
    !mobile ||
    !email ||
    !city ||
    !state ||
    !currentStatus ||
    !highestQualification ||
    !subject ||
    !college ||
    !consent ||
    !(paymentScreenshot instanceof File)
  ) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  try {
    const result = await registerInternshipApplication({
      internshipId,
      internshipName,
      programMode: readString(formData, "programMode"),
      fullName,
      dob: readString(formData, "dob"),
      gender,
      mobile,
      email,
      city,
      state,
      currentStatus,
      currentStatusOther: readString(formData, "currentStatusOther"),
      highestQualification,
      highestQualificationOther: readString(formData, "highestQualificationOther"),
      subject,
      yearOrPassout: readString(formData, "yearOrPassout"),
      college,
      affiliation: readString(formData, "affiliation"),
      consent,
      paymentScreenshot,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to save internship registration:", error);
    return NextResponse.json(
      { message: "Something went wrong while submitting your application." },
      { status: 500 },
    );
  }
}
