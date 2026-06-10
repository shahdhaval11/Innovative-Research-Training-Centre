import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/lib/models/Event";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const doc = await Event.findById(id).lean() as any;
    if (!doc) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }
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
      venue:           doc.venue ?? "",
      registrationUrl: doc.registrationUrl ?? "",
      imageName:       doc.imageName ?? "",
      imagePreview:    doc.imagePreview ?? "",
      pdfName:         doc.pdfName ?? "",
      attendees:       doc.attendees ?? 0,
      createdAt:       doc.createdAt instanceof Date
                         ? doc.createdAt.toISOString().split("T")[0]
                         : String(doc.createdAt ?? ""),
    };
    return NextResponse.json({ success: true, event });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const doc = await Event.findByIdAndUpdate(
      id,
      {
        title:           body.title,
        description:     body.description,
        startDate:       body.startDate,
        endDate:         body.endDate,
        startTime:       body.startTime,
        endTime:         body.endTime,
        eventType:       body.eventType,
        venue:           body.venue           ?? "",
        registrationUrl: body.registrationUrl ?? "",
        imageName:       body.imageName       ?? "",
        imagePreview:    body.imagePreview    ?? "",
        pdfName:         body.pdfName         ?? "",
      },
      { new: true }
    ).lean() as any;

    if (!doc) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

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
      venue:           doc.venue ?? "",
      registrationUrl: doc.registrationUrl ?? "",
      imageName:       doc.imageName ?? "",
      imagePreview:    doc.imagePreview ?? "",
      pdfName:         doc.pdfName ?? "",
      attendees:       doc.attendees ?? 0,
      createdAt:       doc.createdAt instanceof Date
                         ? doc.createdAt.toISOString().split("T")[0]
                         : String(doc.createdAt ?? ""),
    };
    return NextResponse.json({ success: true, event });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const doc = await Event.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete event" }, { status: 500 });
  }
}
