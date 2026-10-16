import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import {
  createDuration,
  getDurations,
  isDurationType,
} from "@/modules/admin/services/durationService";

export async function GET(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const type = new URL(request.url).searchParams.get("type");
  if (type !== null && !isDurationType(type)) {
    return NextResponse.json({ message: "Invalid type." }, { status: 400 });
  }

  const durations = await getDurations(type ?? undefined);
  return NextResponse.json({ durations });
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const duration = typeof body?.duration === "string" ? body.duration.trim() : "";
  const amount = typeof body?.amount === "string" ? body.amount.trim() : "";

  if (!duration) {
    return NextResponse.json({ message: "Duration is required." }, { status: 400 });
  }
  if (!amount || Number.isNaN(Number(amount)) || Number(amount) < 0) {
    return NextResponse.json({ message: "A valid amount is required." }, { status: 400 });
  }
  if (!isDurationType(body?.type)) {
    return NextResponse.json({ message: "Invalid type." }, { status: 400 });
  }

  try {
    const created = await createDuration({ duration, amount, type: body.type });
    return NextResponse.json({ duration: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create duration:", error);
    return NextResponse.json({ message: "Failed to create duration." }, { status: 500 });
  }
}
