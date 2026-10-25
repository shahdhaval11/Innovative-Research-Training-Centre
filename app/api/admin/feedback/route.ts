import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getFeedbacks } from "@/modules/admin/services/feedbackService";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const feedbacks = await getFeedbacks();
  return NextResponse.json({ feedbacks });
}
