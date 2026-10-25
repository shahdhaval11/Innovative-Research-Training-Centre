import {
  EVENT_TYPES,
  MAX_BANNER_BYTES,
  MAX_BROCHURE_BYTES,
  getBannerExtension,
  getBrochureExtension,
  type EventInput,
  type EventType,
} from "./eventService";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readFile(formData: FormData, key: string): File | null {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

// Shared by the create and update routes. Dates arrive as ISO strings (the browser
// converts the local date-time inputs), so the server timezone never matters.
export function parseEventFormData(
  formData: FormData,
  { requireBanner }: { requireBanner: boolean },
): { data: EventInput } | { error: string } {
  const type = readString(formData, "type") as EventType;
  const title = readString(formData, "title");
  const description = readString(formData, "description");
  const startAt = new Date(readString(formData, "startAt"));
  const endAt = new Date(readString(formData, "endAt"));

  if (
    !EVENT_TYPES.includes(type) ||
    !title ||
    !description ||
    Number.isNaN(startAt.getTime()) ||
    Number.isNaN(endAt.getTime())
  ) {
    return { error: "Missing or invalid fields." };
  }

  if (endAt <= startAt) {
    return { error: "End date and time must be after the start." };
  }

  const banner = readFile(formData, "banner");
  if (!banner && requireBanner) {
    return { error: "Banner image is required." };
  }
  if (banner && (!getBannerExtension(banner) || banner.size > MAX_BANNER_BYTES)) {
    return { error: "Banner must be a JPG, PNG or WebP file up to 5 MB." };
  }

  const brochure = readFile(formData, "brochure");
  if (brochure && (!getBrochureExtension(brochure) || brochure.size > MAX_BROCHURE_BYTES)) {
    return { error: "Brochure must be a PDF, JPG, PNG or WebP file up to 10 MB." };
  }

  return { data: { type, title, description, startAt, endAt, banner, brochure } };
}
