"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Lock } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import TopBar from "./TopBar";
import MegaMenuPanel from "./MegaMenuPanel";
import MobileMenu from "./MobileMenu";
import { NAV_ITEMS } from "./navData";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar />

      <div
        className="relative border-b border-secondary-100"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="container-app flex h-20 items-center justify-between gap-4 xl:justify-center xl:gap-12">
          <Logo />

          <nav className="hidden xl:block">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => item.columns && setOpenMenu(item.label)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className={clsx(
                      "flex items-center gap-0.5 rounded-md px-1.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors",
                      openMenu === item.label
                        ? "text-primary-700"
                        : "text-secondary-700 hover:text-primary-700",
                    )}
                  >
                    {item.shortLabel ?? item.label}
                    {item.columns && (
                      <ChevronDown
                        className={clsx(
                          "h-3.5 w-3.5 transition-transform",
                          openMenu === item.label && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  {item.compact && item.columns && openMenu === item.label && (
                    <div className="absolute top-full left-0 z-40 w-56 rounded-lg border border-secondary-100 bg-white p-2 shadow-soft">
                      <ul className="space-y-1">
                        {item.columns[0].links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setOpenMenu(null)}
                              className="block rounded-md px-3 py-2 text-sm text-secondary-600 transition-colors hover:bg-secondary-50 hover:text-primary-700"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className="hidden items-center gap-1.5 rounded-md border border-secondary-200 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-secondary-700 transition-colors hover:border-secondary-800 hover:text-secondary-800 xl:inline-flex"
            >
              <Lock className="h-3.5 w-3.5" />
              Admin
            </Link>
            <Link
              href="/contactus"
              className="hidden items-center gap-1.5 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-primary-700 xl:inline-flex"
            >
              Enquire Now
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-2 text-secondary-700 hover:bg-secondary-50 xl:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {NAV_ITEMS.map(
          (item) =>
            item.columns &&
            !item.compact &&
            openMenu === item.label && (
              <MegaMenuPanel key={item.label} item={item} onNavigate={() => setOpenMenu(null)} />
            ),
        )}
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
