// ─── lib/auth.ts ──────────────────────────────────────────────────────────────
// Static admin credentials (replace with DB lookup in production)

export const ADMIN_CREDENTIALS = [
  {
    id: "admin_001",
    name: "Super Admin",
    email: "admin@irtcentre.in",
    password: "Admin@2025",
    role: "superadmin",
    avatar: "SA",
  },
  {
    id: "admin_002",
    name: "Dr. Ramesh Iyer",
    email: "ramesh@irtcentre.in",
    password: "Ramesh@123",
    role: "admin",
    avatar: "RI",
  },
];

export function verifyCredentials(email: string, password: string) {
  return ADMIN_CREDENTIALS.find(
    (u) => u.email === email && u.password === password
  ) ?? null;
}

export const SESSION_KEY = "irtc_admin_session";