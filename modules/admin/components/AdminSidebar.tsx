"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  GraduationCap,
  Users,
  MessageSquare,
  CalendarDays,
  LogOut,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/layout/Logo";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

const ADVISORY_NAV_ITEM = {
  href: "/admin/advisory-members",
  label: "Manage Advisory Member",
  icon: Users,
};

type NavGroup = {
  label: string;
  icon: LucideIcon;
  children: { href: string; label: string }[];
};

const INTERNSHIP_MENU: NavGroup = {
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

const EVENTS_MENU: NavGroup = {
  label: "Event & Workshop",
  icon: CalendarDays,
  children: [
    { href: "/admin/events", label: "Manage Event & Workshop" },
    { href: "/admin/event-registrations", label: "Event & Workshop Registration" },
  ],
};

function NavGroupMenu({ menu, pathname }: { menu: NavGroup; pathname: string }) {
  const active = menu.children.some((c) => pathname === c.href);
  const [open, setOpen] = useState(active);
  const Icon = menu.icon;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={clsx(
          "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
          active && !open
            ? "bg-primary-600 text-white"
            : "text-secondary-200 hover:bg-white/10 hover:text-white",
        )}
      >
        <Icon className="h-4 w-4" />
        {menu.label}
        <ChevronDown className={clsx("ml-auto h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-5 space-y-1 border-l border-white/10 pl-3">
          {menu.children.map(({ href, label }) => (
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
    </>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

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

        <NavGroupMenu menu={INTERNSHIP_MENU} pathname={pathname} />

        <Link
          href={ADVISORY_NAV_ITEM.href}
          className={clsx(
            "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === ADVISORY_NAV_ITEM.href
              ? "bg-primary-600 text-white"
              : "text-secondary-200 hover:bg-white/10 hover:text-white",
          )}
        >
          <ADVISORY_NAV_ITEM.icon className="h-4 w-4" />
          {ADVISORY_NAV_ITEM.label}
        </Link>

        <NavGroupMenu menu={EVENTS_MENU} pathname={pathname} />
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
