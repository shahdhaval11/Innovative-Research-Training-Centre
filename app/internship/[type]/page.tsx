import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InternshipListPage from "@/modules/internship/components/InternshipListPage";
import { INTERNSHIP_MODE_LABEL } from "@/modules/internship/constData";
import { getInternships } from "@/modules/admin/services/internshipService";
import type { InternshipMode } from "@/modules/internship/types";

const VALID_MODES: InternshipMode[] = ["online", "offline"];

function isInternshipMode(value: string): value is InternshipMode {
  return (VALID_MODES as string[]).includes(value);
}

// Internships are managed from the admin panel, so render on every request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/internship/[type]">): Promise<Metadata> {
  const { type } = await params;
  if (!isInternshipMode(type)) return {};

  const label = INTERNSHIP_MODE_LABEL[type];
  return {
    title: `${label} Internship Programs`,
    description: `Explore ${label.toLowerCase()} internship tracks across microbiology, biotechnology, molecular biology, bioinformatics and more.`,
  };
}

export default async function Page({ params }: PageProps<"/internship/[type]">) {
  const { type } = await params;
  if (!isInternshipMode(type)) notFound();

  const internships = await getInternships(INTERNSHIP_MODE_LABEL[type]);

  return <InternshipListPage mode={type} internships={internships} />;
}
