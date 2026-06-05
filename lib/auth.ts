import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function verifyCredentials(email: string, password: string) {
  await connectDB();
  const user = await Admin.findOne({ email, password, status: "active" }).lean();
  if (!user) return null;
  return {
    id: (user._id as object).toString(),
    name: user.user_name,
    email: user.email,
    role: "superadmin" as const,
    avatar: user.avtar,
  };
}
