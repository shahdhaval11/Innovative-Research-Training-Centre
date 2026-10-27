import { MAX_IMAGE_BYTES, getImageExtension } from "./internshipService";
import type { AdvisoryMemberInput } from "./advisoryMemberService";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Allows an optional leading +, then 7-15 digits (spaces, dashes and brackets ignored).
function isValidPhone(value: string): boolean {
  return /^\+?\d{7,15}$/.test(value.replace(/[\s\-()]/g, ""));
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// Shared by the create and update routes.
export function parseAdvisoryMemberFormData(
  formData: FormData,
): { data: AdvisoryMemberInput } | { error: string } {
  const name = readString(formData, "name");
  const designation = readString(formData, "designation");
  const affiliation = readString(formData, "affiliation");
  const email = readString(formData, "email");
  const phone = readString(formData, "phone");
  const orderRaw = readString(formData, "order");
  const order = orderRaw === "" ? NaN : Number(orderRaw);
  const photo = formData.get("photo");

  if (
    !name ||
    !designation ||
    !affiliation ||
    !EMAIL_PATTERN.test(email) ||
    !isValidPhone(phone) ||
    !Number.isInteger(order) ||
    order < 0
  ) {
    return { error: "Missing or invalid fields." };
  }

  const photoFile = photo instanceof File && photo.size > 0 ? photo : null;
  if (
    photoFile &&
    (!getImageExtension(photoFile) || photoFile.size > MAX_IMAGE_BYTES)
  ) {
    return { error: "Photograph must be a JPG, PNG or WebP file up to 5 MB." };
  }

  return {
    data: { name, designation, affiliation, email, phone, order, photo: photoFile },
  };
}
