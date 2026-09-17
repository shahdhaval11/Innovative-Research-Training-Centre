export type InternshipMode = "online" | "offline";

export type InternshipFee = "free" | "paid";

export type Internship = {
  id: number;
  slug: string;
  internshipDomain: string;
  track: string;
  description: string;
  image: string;
  fee: InternshipFee;
};
