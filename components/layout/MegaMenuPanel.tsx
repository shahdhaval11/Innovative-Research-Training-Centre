import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "./navData";

export default function MegaMenuPanel({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  if (!item.columns) return null;

  const singleColumn = item.columns.length === 1;

  return (
    <div className="absolute top-full left-0 z-40 w-full border-t border-secondary-100 bg-white shadow-soft">
      <div className="container-app py-8">
        <div
          className={
            singleColumn
              ? "grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3"
              : "grid grid-cols-2 gap-8 md:grid-cols-4"
          }
        >
          {item.columns.map((col, i) => (
            <div key={col.heading ?? i}>
              {col.heading && (
                <p className="mb-3 text-xs font-bold tracking-wide text-primary-700 uppercase">
                  {col.heading}
                </p>
              )}
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="text-sm text-secondary-600 transition-colors hover:text-primary-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {item.cta && (
          <div className="mt-6 border-t border-secondary-100 pt-5">
            <Link
              href={item.cta.href}
              onClick={onNavigate}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              {item.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
