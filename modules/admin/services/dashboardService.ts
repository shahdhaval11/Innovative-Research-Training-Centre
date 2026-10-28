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

export type RegistrationTrendPoint = {
  date: string; // YYYY-MM-DD, in IST
  event: number;
  workshop: number;
};

const TREND_TIME_ZONE = "Asia/Kolkata";
const TREND_UTC_OFFSET = "+05:30";

// Day-wise Event / Workshop registrations for the last `days` days (today included).
// Days are IST calendar days; days with no registrations are returned as zeros.
export async function getRegistrationTrend(days = 7): Promise<RegistrationTrendPoint[]> {
  const todayIst = new Intl.DateTimeFormat("en-CA", { timeZone: TREND_TIME_ZONE }).format(new Date());
  const dates = Array.from({ length: days }, (_, i) => {
    const d = new Date(`${todayIst}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - (days - 1 - i));
    return d.toISOString().slice(0, 10);
  });

  const rows = await (await getDb())
    .collection(EVENT_REGISTRATION_COLLECTION_NAME)
    .aggregate<{ _id: { day: string; type: string }; count: number }>([
      { $match: { created_at: { $gte: new Date(`${dates[0]}T00:00:00${TREND_UTC_OFFSET}`) } } },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$created_at", timezone: TREND_TIME_ZONE } },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const points = new Map(dates.map((date) => [date, { date, event: 0, workshop: 0 }]));
  for (const { _id, count } of rows) {
    const point = points.get(_id.day);
    if (!point) continue;
    if (_id.type === "Event") point.event = count;
    else if (_id.type === "Workshop") point.workshop = count;
  }

  return dates.map((date) => points.get(date)!);
}
