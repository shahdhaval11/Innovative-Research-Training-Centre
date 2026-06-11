import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/lib/models/Event";

export async function GET() {
  try {
    await connectDB();
    const docs = await Event.find({}).sort({ createdAt: -1 }).lean();
    const events = docs.map((e: any) => ({
      id:              e._id.toString(),
      title:           e.title,
      description:     e.description,
      startDate:       e.startDate,
      endDate:         e.endDate,
      startTime:       e.startTime,
      endTime:         e.endTime,
      eventType:       e.eventType,
      status:          e.status,
      venue:           e.venue ?? "",
      registrationUrl: e.registrationUrl ?? "",
      imageName:       e.imageName ?? "",
      imagePreview:    e.imagePreview ?? "",
      pdfName:         e.pdfName ?? "",
      bannerPath:      e.bannerPath ?? "",
      broucherPath:    e.broucherPath ?? "",
      attendees:       e.attendees ?? 0,
      createdAt:       e.createdAt instanceof Date
                         ? e.createdAt.toISOString().split("T")[0]
                         : String(e.createdAt ?? ""),
    }));
    return NextResponse.json({ success: true, events });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const doc = await Event.create({
      title:           body.title,
      description:     body.description,
      startDate:       body.startDate,
      endDate:         body.endDate,
      startTime:       body.startTime,
      endTime:         body.endTime,
      eventType:       body.eventType,
      status:          "Upcoming",
      venue:           body.venue           ?? "",
      registrationUrl: body.registrationUrl ?? "",
      imageName:       body.imageName       ?? "",
      imagePreview:    "",
      pdfName:         body.pdfName         ?? "",
      bannerPath:      body.bannerPath      ?? "",
      broucherPath:    body.broucherPath    ?? "",
      attendees:       0,
    });
    const event = {
      id:              doc._id.toString(),
      title:           doc.title,
      description:     doc.description,
      startDate:       doc.startDate,
      endDate:         doc.endDate,
      startTime:       doc.startTime,
      endTime:         doc.endTime,
      eventType:       doc.eventType,
      status:          doc.status,
      venue:           doc.venue,
      registrationUrl: doc.registrationUrl,
      imageName:       doc.imageName,
      imagePreview:    doc.imagePreview,
      pdfName:         doc.pdfName,
      bannerPath:      doc.bannerPath,
      broucherPath:    doc.broucherPath,
      attendees:       doc.attendees,
      createdAt:       (doc as any).createdAt instanceof Date
                         ? (doc as any).createdAt.toISOString().split("T")[0]
                         : new Date().toISOString().split("T")[0],
    };
    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create event" }, { status: 500 });
  }
}
