import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/mongodb";
import Event from "@/lib/models/Event";

function toEvent(doc: any) {
  return {
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
    bannerPath:      doc.bannerPath ?? "",
    broucherPath:    doc.broucherPath ?? "",
    attendees:       doc.attendees ?? 0,
    createdAt:       doc.createdAt instanceof Date
                       ? doc.createdAt.toISOString().split("T")[0]
                       : String(doc.createdAt ?? ""),
  };
}

async function deleteFile(publicPath: string) {
  if (!publicPath) return;
  try {
    const abs = path.join(process.cwd(), "public", publicPath);
    await unlink(abs);
  } catch {
    // file may not exist — ignore
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const doc = await Event.findById(id).lean() as any;
    if (!doc) return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    return NextResponse.json({ success: true, event: toEvent(doc) });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // If banner changed, delete the old one
    const existing = await Event.findById(id).lean() as any;
    if (existing) {
      if (body.bannerPath && body.bannerPath !== existing.bannerPath) {
        await deleteFile(existing.bannerPath);
      }
      if (body.broucherPath && body.broucherPath !== existing.broucherPath) {
        await deleteFile(existing.broucherPath);
      }
    }

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
        pdfName:         body.pdfName         ?? "",
        bannerPath:      body.bannerPath      ?? "",
        broucherPath:    body.broucherPath    ?? "",
      },
      { new: true }
    ).lean() as any;

    if (!doc) return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    return NextResponse.json({ success: true, event: toEvent(doc) });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const doc = await Event.findByIdAndDelete(id).lean() as any;
    if (!doc) return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });

    // Delete associated files from public folder
    await deleteFile(doc.bannerPath);
    await deleteFile(doc.broucherPath);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete event" }, { status: 500 });
  }
}
