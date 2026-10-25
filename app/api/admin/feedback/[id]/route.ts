import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import {
  deleteFeedback,
  getFeedbackById,
  isReviewStatus,
  updateFeedbackStatus,
} from "@/modules/admin/services/feedbackService";

export async function GET(_request: Request, ctx: RouteContext<"/api/admin/feedback/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  const feedback = await getFeedbackById(id);

  if (!feedback) {
    return NextResponse.json({ message: "Feedback not found." }, { status: 404 });
  }

  return NextResponse.json({ feedback });
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/feedback/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!isReviewStatus(body?.status)) {
    return NextResponse.json({ message: "Invalid status." }, { status: 400 });
  }

  const { id } = await ctx.params;

  try {
    const feedback = await updateFeedbackStatus(id, body.status);

    if (!feedback) {
      return NextResponse.json({ message: "Feedback not found." }, { status: 404 });
    }

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Failed to update feedback:", error);
    return NextResponse.json({ message: "Failed to update feedback." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/feedback/[id]">) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;

  try {
    const deleted = await deleteFeedback(id);

    if (!deleted) {
      return NextResponse.json({ message: "Feedback not found." }, { status: 404 });
    }

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to delete feedback:", error);
    return NextResponse.json({ message: "Failed to delete feedback." }, { status: 500 });
  }
}
