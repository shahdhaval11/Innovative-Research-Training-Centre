import { getDb } from "@/lib/mongodb";
import { ENQUIRIES_COLLECTION_NAME, getUnseenEnquiriesCount } from "./enquiryService";
import { INTERNSHIP_REGISTRATIONS_COLLECTION_NAME } from "./internshipRegistrationService";

export type KpiStat = {
  key: string;
  title: string;
  count: number;
  // An optional secondary count shown inside the same card, e.g. how many
  // of the total are still unseen.
  secondary?: {
    label: string;
    count: number;
  };
};

// Add an entry here whenever a new collection should show up as a KPI card
// on the admin dashboard.
const KPI_DEFINITIONS = [
  { key: "enquiries", title: "Enquiries", collection: ENQUIRIES_COLLECTION_NAME },
  {
    key: "internshipRegistrations",
    title: "Internship Registrations",
    collection: INTERNSHIP_REGISTRATIONS_COLLECTION_NAME,
  },
] as const;

export async function getDashboardStats(): Promise<KpiStat[]> {
  const db = await getDb();

  const [counts, unseenEnquiriesCount] = await Promise.all([
    Promise.all(
      KPI_DEFINITIONS.map((definition) => db.collection(definition.collection).countDocuments()),
    ),
    getUnseenEnquiriesCount(),
  ]);

  return KPI_DEFINITIONS.map((definition, index) => {
    const stat: KpiStat = {
      key: definition.key,
      title: definition.title,
      count: counts[index],
    };

    if (definition.key === "enquiries") {
      stat.secondary = { label: "Unseen", count: unseenEnquiriesCount };
    }

    return stat;
  });
}
