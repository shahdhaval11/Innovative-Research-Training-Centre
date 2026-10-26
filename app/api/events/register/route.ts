import { NextResponse } from "next/server";
import { getActiveEventById } from "@/modules/admin/services/eventService";
import { DuplicateRegistrationError } from "@/modules/internship/services/internshipRegistrationService";
import { registerEventApplication } from "@/modules/events/services/eventRegistrationService";

function readString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const eventId = readString(formData, "eventId");
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
  const screenshotValue = formData.get("paymentScreenshot");
  const paymentScreenshot = screenshotValue instanceof File && screenshotValue.size > 0 ? screenshotValue : null;

  if (
    !eventId ||
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
    !consent
  ) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  try {
    const event = await getActiveEventById(eventId);
    if (!event) {
      return NextResponse.json({ message: "This event is no longer available." }, { status: 404 });
    }
    if (new Date(event.endAt) < new Date()) {
      return NextResponse.json({ message: "Registration for this event has closed." }, { status: 400 });
    }
    // Payment is only required when the event has a fee.
    if (event.fees > 0 && !paymentScreenshot) {
      return NextResponse.json({ message: "Payment screenshot is required." }, { status: 400 });
    }

    const result = await registerEventApplication({
      event,
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
      paymentScreenshot: event.fees > 0 ? paymentScreenshot : null,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof DuplicateRegistrationError) {
      return NextResponse.json(
        { message: error.message, fields: error.fields },
        { status: 409 },
      );
    }
    console.error("Failed to save event registration:", error);
    return NextResponse.json(
      { message: "Something went wrong while submitting your registration." },
      { status: 500 },
    );
  }
}
