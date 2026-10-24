import { NextResponse } from "next/server";
import { getAdvisoryMembers } from "@/modules/admin/services/advisoryMemberService";

// Public list for the website. Email and phone are admin-only and never returned here.
export async function GET() {
  try {
    const members = await getAdvisoryMembers();
    return NextResponse.json(
      {
        members: members.map(({ id, name, designation, affiliation, photo }) => ({
          id,
          name,
          designation,
          affiliation,
          photo,
        })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to load advisory team:", error);
    return NextResponse.json({ message: "Failed to load advisory team." }, { status: 500 });
  }
}
