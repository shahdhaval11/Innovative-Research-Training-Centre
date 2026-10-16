// Hard-coded until the internship API exists.
export const INTERNSHIP_DOMAINS = [
  "Bioinformatics",
  "Biotechnology",
  "Clinical Microbiology",
  "Drug Discovery",
  "Environmental Science",
  "Food Microbiology",
  "Microbiology",
  "Molecular Biology",
  "Pharmaceutical Microbiology",
  "Research Methodology",
  "Molecular Sciences",
  "Computational Biology",
];

// Used when no image is uploaded.
export const DEFAULT_INTERNSHIP_IMAGE = "/internship/microbiology.svg";

export const INTERNSHIP_MODES = ["Online", "Offline"];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatFee(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export type ManagedInternship = {
  id: string;
  internshipDomain: string;
  mode: string;
  track: string;
  slug: string;
  description: string;
  image: string; // object URL for now
  duration: string; // _id of the linked document in the `duration` collection
  durationLabel: string | null; // resolved from the linked duration; null if unlinked
  durationAmount: number | null;
};

// Label and fee of the linked duration, or undefined when not linked yet.
export function getInternshipDuration(
  internship: Pick<ManagedInternship, "durationLabel" | "durationAmount">,
): { label: string; fee: number } | undefined {
  if (internship.durationLabel === null || internship.durationAmount === null) return undefined;
  return { label: internship.durationLabel, fee: internship.durationAmount };
}
