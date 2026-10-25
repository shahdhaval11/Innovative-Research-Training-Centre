// Pinned to IST so server-rendered and client-rendered dates always match.
const TIME_ZONE = "Asia/Kolkata";

const DATE_TIME = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: TIME_ZONE,
});
const DAY = new Intl.DateTimeFormat("en-IN", { day: "2-digit", timeZone: TIME_ZONE });
const MONTH = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: TIME_ZONE });
const TIME = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

export const formatDateTime = (iso: string) => DATE_TIME.format(new Date(iso));
export const formatDay = (iso: string) => DAY.format(new Date(iso));
export const formatMonth = (iso: string) => MONTH.format(new Date(iso)).toUpperCase();

// "10:00 AM - 04:00 PM"
export const formatTimeRange = (startIso: string, endIso: string) =>
  `${TIME.format(new Date(startIso)).toUpperCase()} - ${TIME.format(new Date(endIso)).toUpperCase()}`;

const LONG_DATE = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});

export const formatLongDate = (iso: string) => LONG_DATE.format(new Date(iso));
export const formatTime = (iso: string) => TIME.format(new Date(iso)).toUpperCase();

// "3 days", "1 day 4 hrs", "2 hrs 30 mins"
export function formatDuration(startIso: string, endIso: string): string {
  const minutes = Math.max(0, Math.round((+new Date(endIso) - +new Date(startIso)) / 60000));
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  const parts = [
    days && `${days} ${days === 1 ? "day" : "days"}`,
    hours && `${hours} ${hours === 1 ? "hr" : "hrs"}`,
    !days && mins && `${mins} mins`,
  ].filter(Boolean);
  return parts.join(" ") || "—";
}
