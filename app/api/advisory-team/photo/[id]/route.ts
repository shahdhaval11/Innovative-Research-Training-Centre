import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { PHOTO_COLLECTION_NAME } from "@/modules/admin/services/advisoryMemberService";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new Response("Not found", { status: 404 });

  const db = await getDb();
  const doc = await db.collection(PHOTO_COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
  if (!doc) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(doc.data.buffer), {
    headers: {
      "Content-Type": doc.contentType ?? "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
