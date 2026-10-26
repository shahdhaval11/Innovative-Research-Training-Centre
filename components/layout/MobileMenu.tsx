"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { NAV_ITEMS } from "./navData";
import { SITE_CONTACT } from "@/lib/siteConfig";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-60 xl:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-secondary-900/50"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-secondary-100 px-5 py-4">
          <Logo />
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-md p-2 text-secondary-600 hover:bg-secondary-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-3">
          <ul className="divide-y divide-secondary-100">
            {NAV_ITEMS.map((item) => {
              const isOpen = expanded === item.label;
              return (
                <li key={item.label}>
                  {item.columns ? (
                    <>
                      <button
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className="flex w-full items-center justify-between px-2 py-3.5 text-left text-sm font-semibold text-secondary-800"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 text-secondary-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="space-y-4 px-2 pb-4">
                          {item.columns.map((col, i) => (
                            <div key={col.heading ?? i}>
                              {col.heading && (
                                <p className="mb-2 text-xs font-bold tracking-wide text-primary-700 uppercase">
                                  {col.heading}
                                </p>
                              )}
                              <ul className="space-y-2">
                                {col.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      onClick={onClose}
                                      className="text-sm text-secondary-600"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {item.cta && (
                            <Link
                              href={item.cta.href}
                              onClick={onClose}
                              className="inline-block text-sm font-semibold text-primary-700"
                            >
                              {item.cta.label} →
                            </Link>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-2 py-3.5 text-sm font-semibold text-secondary-800"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-secondary-100 px-5 py-5">
          <Link href={`tel:${SITE_CONTACT.phoneRaw}`} className="flex items-center gap-2 text-sm text-secondary-600">
            <Phone className="h-4 w-4 text-primary-600" />
            {SITE_CONTACT.phoneDisplay}
          </Link>
          <Link href={`mailto:${SITE_CONTACT.email}`} className="flex items-center gap-2 text-sm text-secondary-600">
            <Mail className="h-4 w-4 text-primary-600" />
            {SITE_CONTACT.email}
          </Link>
          <Link href="/contactus" onClick={onClose} className="btn-primary mt-2 w-full">
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
