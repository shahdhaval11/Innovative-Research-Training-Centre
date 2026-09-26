import { NextResponse } from "next/server";
import { createEnquiry } from "@/modules/home/services/enquiryService";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";

  if (!name || !phone || !email) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  try {
    const result = await createEnquiry({
      name,
      email,
      phone,
      subject: "Free Consultation Request",
      service: service || null,
      message: service ? `Interested in: ${service}` : null,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to save enquiry:", error);
    return NextResponse.json(
      { message: "Something went wrong while submitting your enquiry." },
      { status: 500 },
    );
  }
}
