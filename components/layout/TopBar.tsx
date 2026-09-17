import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import SocialIcon, { SocialPlatform } from "@/components/ui/SocialIcon";
import { SITE_CONTACT } from "@/lib/siteConfig";

const SOCIAL_LINKS: { platform: SocialPlatform; href: string; label: string }[] = [
  { platform: "facebook", href: "https://facebook.com", label: "Facebook" },
  { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
  { platform: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  { platform: "youtube", href: "https://youtube.com", label: "YouTube" },
];

export default function TopBar() {
  return (
    <div className="hidden bg-secondary-800 text-secondary-100 sm:block">
      <div className="container-app flex h-9 items-center justify-between text-xs">
        <p className="truncate text-secondary-200">{SITE_CONTACT.tagline}</p>
        <div className="flex items-center gap-5">
          <Link
            href={`mailto:${SITE_CONTACT.email}`}
            className="hidden items-center gap-1.5 hover:text-primary-300 md:flex"
          >
            <Mail className="h-3.5 w-3.5" />
            {SITE_CONTACT.email}
          </Link>
          <Link
            href={`tel:${SITE_CONTACT.phoneRaw}`}
            className="hidden items-center gap-1.5 hover:text-primary-300 md:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE_CONTACT.phoneDisplay}
          </Link>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-secondary-200 hover:text-primary-300"
              >
                <SocialIcon platform={s.platform} className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
