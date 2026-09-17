import type { InternshipMode } from "../types";
import { ONLINE_INTERNSHIPS } from "./onlineInternships";
import { OFFLINE_INTERNSHIPS } from "./offlineInternships";

export { ONLINE_INTERNSHIPS, OFFLINE_INTERNSHIPS };

export const INTERNSHIPS_BY_MODE = {
  online: ONLINE_INTERNSHIPS,
  offline: OFFLINE_INTERNSHIPS,
} satisfies Record<InternshipMode, typeof ONLINE_INTERNSHIPS>;

export const INTERNSHIP_MODE_LABEL: Record<InternshipMode, string> = {
  online: "Online",
  offline: "Offline",
};
