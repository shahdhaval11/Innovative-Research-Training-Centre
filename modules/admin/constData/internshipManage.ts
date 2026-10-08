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

export const INTERNSHIP_DURATIONS = [
  { value: "1-week", label: "1 Week", fee: 750 },
  { value: "15-days", label: "15 Days", fee: 1550 },
  { value: "1-month", label: "1 Month", fee: 3750 },
  // Two 3-month tiers exist (Advanced Research Internship / Premium Research Fellowship)
  { value: "3-months", label: "3 Months", fee: 11250 },
  { value: "3-months-premium", label: "3 Months", fee: 17500 },
];

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
  duration: string; // INTERNSHIP_DURATIONS value
};
