"use client";

import { useEffect, useState } from "react";
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
  Menu,
  X,
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

function NavGroupMenu({
  menu,
  pathname,
  onNavigate,
}: {
  menu: NavGroup;
  pathname: string;
  onNavigate?: () => void;
}) {
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
              onClick={onNavigate}
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

function SidebarContent({
  pathname,
  onNavigate,
  onLogout,
}: {
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      <nav className="flex-1 space-y-1 overflow-y-auto px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
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

        <NavGroupMenu menu={INTERNSHIP_MENU} pathname={pathname} onNavigate={onNavigate} />

        <Link
          href={ADVISORY_NAV_ITEM.href}
          onClick={onNavigate}
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

        <NavGroupMenu menu={EVENTS_MENU} pathname={pathname} onNavigate={onNavigate} />
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-secondary-200 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <>
      {/* Mobile / tablet: top bar with burger + slide-in drawer */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-secondary-800 px-4 py-3 text-white lg:hidden">
        <Logo variant="dark" />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className="rounded-md p-2 text-secondary-200 hover:bg-white/10 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <div
        className={clsx("fixed inset-0 z-40 lg:hidden", !mobileOpen && "pointer-events-none")}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={clsx(
            "absolute inset-0 bg-secondary-900/60 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={clsx(
            "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-secondary-800 text-white shadow-xl transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-4">
            <Logo variant="dark" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 text-secondary-200 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <SidebarContent
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
            onLogout={handleLogout}
          />
        </aside>
      </div>

      {/* Desktop: fixed sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-secondary-800 text-white lg:flex">
        <div className="p-6">
          <Logo variant="dark" />
        </div>
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </aside>
    </>
  );
}
