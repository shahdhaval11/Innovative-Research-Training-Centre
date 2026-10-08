import {
  INTERNSHIP_DOMAINS,
  INTERNSHIP_DURATIONS,
  INTERNSHIP_MODES,
  slugify,
} from "../constData/internshipManage";
import { MAX_IMAGE_BYTES, getImageExtension } from "./internshipService";

export type InternshipFormData = {
  internshipDomain: string;
  mode: string;
  track: string;
  slug: string;
  description: string;
  duration: string;
  image: File | null;
};

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// Shared by the create and update routes.
export function parseInternshipFormData(
  formData: FormData,
): { data: InternshipFormData } | { error: string } {
  const internshipDomain = readString(formData, "internshipDomain");
  const mode = readString(formData, "mode");
  const track = readString(formData, "track");
  const slug = slugify(readString(formData, "slug") || track);
  const description = readString(formData, "description");
  const duration = readString(formData, "duration");
  const image = formData.get("image");

  if (
    !INTERNSHIP_DOMAINS.includes(internshipDomain) ||
    !INTERNSHIP_MODES.includes(mode) ||
    !INTERNSHIP_DURATIONS.some((d) => d.value === duration) ||
    !track ||
    !slug ||
    !description.replace(/<[^>]*>/g, "").trim()
  ) {
    return { error: "Missing or invalid fields." };
  }

  const imageFile = image instanceof File && image.size > 0 ? image : null;
  if (imageFile && (!getImageExtension(imageFile) || imageFile.size > MAX_IMAGE_BYTES)) {
    return { error: "Image must be a JPG, PNG or WebP file up to 5 MB." };
  }

  return {
    data: { internshipDomain, mode, track, slug, description, duration, image: imageFile },
  };
}
