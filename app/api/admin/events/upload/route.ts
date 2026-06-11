import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file      = formData.get("file")       as File   | null;
    const eventTitle = formData.get("eventTitle") as string | null;
    const fileType   = formData.get("fileType")  as "banner" | "broucher" | null;

    if (!file || !eventTitle || !fileType) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Sanitize event title: strip non-ASCII (emoji, special chars) and filesystem-unsafe chars,
    // collapse whitespace to underscores, add timestamp for uniqueness
    const safeName = eventTitle
      .replace(/[^\x00-\x7F]/g, "")   // remove all non-ASCII (emoji, accented chars, etc.)
      .replace(/[/\\:*?"<>|]/g, "")   // remove filesystem-unsafe chars
      .trim()
      .replace(/\s+/g, "_")
      .replace(/^_+|_+$/g, "")        // trim leading/trailing underscores
      || "event";                       // fallback if title becomes empty after sanitization
    const uniqueName = `${safeName}_${Date.now()}`;

    const ext = fileType === "banner"
      ? (file.name.split(".").pop()?.toLowerCase() || "jpg")
      : "pdf";

    const dir = path.join(process.cwd(), "public", "event", fileType);
    await mkdir(dir, { recursive: true });

    const filename = `${uniqueName}.${ext}`;
    const filepath = path.join(dir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    return NextResponse.json({
      success: true,
      path: `/event/${fileType}/${filename}`,
    });
  } catch {
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
