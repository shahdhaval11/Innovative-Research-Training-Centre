import { getDb } from "@/lib/mongodb";
import { ENQUIRIES_COLLECTION_NAME, getUnseenEnquiriesCount } from "./enquiryService";
import { INTERNSHIP_COLLECTION_NAME } from "./internshipService";
import { INTERNSHIP_REGISTRATIONS_COLLECTION_NAME } from "./internshipRegistrationService";
import { EVENT_REGISTRATION_COLLECTION_NAME } from "@/modules/events/services/eventRegistrationService";

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
  // Optional per-category counts shown below the total, e.g. Online / Offline.
  breakdown?: {
    label: string;
    count: number;
  }[];
};

// Add an entry here whenever a new collection should show up as a KPI card
// on the admin dashboard.
const KPI_DEFINITIONS = [
  { key: "enquiries", title: "Enquiries", collection: ENQUIRIES_COLLECTION_NAME },
  { key: "internships", title: "Internships", collection: INTERNSHIP_COLLECTION_NAME },
  {
    key: "internshipRegistrations",
    title: "Internship Registrations",
    collection: INTERNSHIP_REGISTRATIONS_COLLECTION_NAME,
  },
  {
    key: "eventRegistrations",
    title: "Event & Workshop Registrations",
    collection: EVENT_REGISTRATION_COLLECTION_NAME,
  },
] as const;

export async function getDashboardStats(): Promise<KpiStat[]> {
  const db = await getDb();

  const eventRegistrations = db.collection(EVENT_REGISTRATION_COLLECTION_NAME);

  const [counts, unseenEnquiriesCount, onlineCount, offlineCount, eventCount, workshopCount] =
    await Promise.all([
      Promise.all(
        KPI_DEFINITIONS.map((definition) => db.collection(definition.collection).countDocuments()),
      ),
      getUnseenEnquiriesCount(),
      db.collection(INTERNSHIP_COLLECTION_NAME).countDocuments({ mode: "Online" }),
      db.collection(INTERNSHIP_COLLECTION_NAME).countDocuments({ mode: "Offline" }),
      eventRegistrations.countDocuments({ type: "Event" }),
      eventRegistrations.countDocuments({ type: "Workshop" }),
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

    if (definition.key === "internships") {
      stat.breakdown = [
        { label: "Online", count: onlineCount },
        { label: "Offline", count: offlineCount },
      ];
    }

    if (definition.key === "eventRegistrations") {
      stat.breakdown = [
        { label: "Event", count: eventCount },
        { label: "Workshop", count: workshopCount },
      ];
    }

    return stat;
  });
}
