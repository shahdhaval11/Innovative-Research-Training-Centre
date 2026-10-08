"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Inbox, GraduationCap, LogOut, ChevronDown } from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/layout/Logo";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
];

const INTERNSHIP_MENU = {
  label: "Internship",
  icon: GraduationCap,
  children: [
    { href: "/admin/internships", label: "Manage Internship" },
    {
      href: "/admin/internship-registrations",
      label: "Internship Registration",
    },
  ],
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const internshipActive = INTERNSHIP_MENU.children.some((c) => pathname === c.href);
  const [internshipOpen, setInternshipOpen] = useState(internshipActive);

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-secondary-800 text-white">
      <div className="p-6">
        <Logo variant="dark" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary-600 text-white"
                  : "text-secondary-200 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setInternshipOpen((o) => !o)}
          aria-expanded={internshipOpen}
          className={clsx(
            "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
            internshipActive && !internshipOpen
              ? "bg-primary-600 text-white"
              : "text-secondary-200 hover:bg-white/10 hover:text-white",
          )}
        >
          <INTERNSHIP_MENU.icon className="h-4 w-4" />
          {INTERNSHIP_MENU.label}
          <ChevronDown
            className={clsx("ml-auto h-4 w-4 transition-transform", internshipOpen && "rotate-180")}
          />
        </button>
        {internshipOpen && (
          <div className="ml-5 space-y-1 border-l border-white/10 pl-3">
            {INTERNSHIP_MENU.children.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-primary-600 text-white"
                    : "text-secondary-200 hover:bg-white/10 hover:text-white",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-secondary-200 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
