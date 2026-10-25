import { NextResponse } from "next/server";
import { createFeedback } from "@/modules/admin/services/feedbackService";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

// Public: submit feedback. It is saved as "new" until an admin approves or rejects it.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = readString(body, "name");
  const designation = readString(body, "designation");
  const email = readString(body, "email");
  const message = readString(body, "message");
  const rating = body.rating;

  if (!name || !designation || !message || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ message: "Missing or invalid fields." }, { status: 400 });
  }
  if (name.length > 100 || designation.length > 150 || email.length > 150 || message.length > 2000) {
    return NextResponse.json({ message: "One or more fields are too long." }, { status: 400 });
  }
  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ message: "Rating must be between 1 and 5." }, { status: 400 });
  }

  try {
    await createFeedback({ name, designation, email, message, rating });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save feedback:", error);
    return NextResponse.json(
      { message: "Something went wrong while submitting your feedback." },
      { status: 500 },
    );
  }
}
