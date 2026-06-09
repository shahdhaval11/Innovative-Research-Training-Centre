import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/lib/models/Enquiry";

const PAGE_LIMIT = 15;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const skip = (page - 1) * PAGE_LIMIT;

    await connectDB();

    const [docs, total] = await Promise.all([
      Enquiry.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_LIMIT)
        .lean(),
      Enquiry.countDocuments({}),
    ]);

    const enquiries = docs.map((e: any) => ({
      id:        e._id.toString(),
      name:      e.name,
      email:     e.email,
      phone:     e.phone,
      subject:   e.subject,
      service:   e.service,
      message:   e.message,
      createdAt: e.createdAt instanceof Date ? e.createdAt.toISOString() : String(e.createdAt ?? ""),
    }));

    return NextResponse.json({
      success: true,
      enquiries,
      pagination: {
        page,
        limit:      PAGE_LIMIT,
        total,
        totalPages: Math.ceil(total / PAGE_LIMIT),
        hasNext:    page < Math.ceil(total / PAGE_LIMIT),
        hasPrev:    page > 1,
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch enquiries" }, { status: 500 });
  }
}
