import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InternshipListPage from "@/modules/internship/components/InternshipListPage";
import { INTERNSHIPS_BY_MODE, INTERNSHIP_MODE_LABEL } from "@/modules/internship/constData";
import type { InternshipMode } from "@/modules/internship/types";

const VALID_MODES: InternshipMode[] = ["online", "offline"];

function isInternshipMode(value: string): value is InternshipMode {
  return (VALID_MODES as string[]).includes(value);
}

export function generateStaticParams() {
  return VALID_MODES.map((type) => ({ type }));
}

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

  return <InternshipListPage mode={type} internships={INTERNSHIPS_BY_MODE[type]} />;
}
