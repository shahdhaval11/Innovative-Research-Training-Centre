import { getDb } from "@/lib/mongodb";

type NanoUserDocument = {
  user_id: number;
  email: string;
  user_name: string;
  password: string;
  status: string;
  avtar?: string;
};

export type AdminUser = {
  userId: number;
  email: string;
  name: string;
};

export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<AdminUser | null> {
  const db = await getDb();
  const user = await db
    .collection<NanoUserDocument>("nano_users")
    .findOne({ email: email.trim().toLowerCase() });

  // Passwords are stored in plain text for now; comparison will move to a
  // hashed check once existing records are migrated.
  if (!user || user.status !== "active" || user.password !== password) {
    return null;
  }

  return {
    userId: user.user_id,
    email: user.email,
    name: user.user_name,
  };
}
