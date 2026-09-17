import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";
import SocialIcon, { SocialPlatform } from "@/components/ui/SocialIcon";
import { SITE_CONTACT } from "@/lib/siteConfig";

const SOCIAL_LINKS: { platform: SocialPlatform; href: string; label: string }[] = [
  { platform: "facebook", href: "https://facebook.com", label: "Facebook" },
  { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
  { platform: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  { platform: "youtube", href: "https://youtube.com", label: "YouTube" },
];

const QUICK_LINKS = [
  { label: "About Us", href: "/aboutus" },
  { label: "Programs", href: "/programs" },
  { label: "Research & Dissertation", href: "/research-dissertation" },
  { label: "Workshops & Events", href: "/workshops-events" },
  { label: "For Institutions", href: "/for-institutions" },
  { label: "For Industry", href: "/for-industry" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Contact Us", href: "/contactus" },
];

const PROGRAM_LINKS = [
  { label: "Microbiology", href: "/programs/microbiology" },
  { label: "Biotechnology", href: "/programs/biotechnology" },
  { label: "Bioinformatics", href: "/programs/bioinformatics" },
  { label: "Molecular Biology", href: "/programs/molecular-biology" },
  { label: "Medical Laboratory Science", href: "/programs/medical-laboratory-science" },
  { label: "Pharmaceutical Sciences", href: "/programs/pharmaceutics" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-800 text-secondary-200">
      <div className="container-app grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="dark" />
          <p className="text-sm leading-relaxed text-secondary-300">
            Industry-oriented training, research guidance and hands-on laboratory experience for
            students, scholars and institutions across the life sciences.
          </p>
          <div className="flex items-center gap-3 pt-1">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-secondary-100 transition-colors hover:bg-primary-600 hover:text-white"
              >
                <SocialIcon platform={s.platform} className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-secondary-300 hover:text-primary-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold text-white">Our Programs</h3>
          <ul className="mt-4 space-y-2.5">
            {PROGRAM_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-secondary-300 hover:text-primary-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold text-white">Contact Us</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-secondary-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
              {SITE_CONTACT.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary-400" />
              <Link href={`tel:${SITE_CONTACT.phoneRaw}`} className="hover:text-primary-300">
                {SITE_CONTACT.phoneDisplay}
              </Link>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-primary-400" />
              <Link href={`mailto:${SITE_CONTACT.email}`} className="hover:text-primary-300">
                {SITE_CONTACT.email}
              </Link>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-primary-400" />
              {SITE_CONTACT.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-5 text-xs text-secondary-400 sm:flex-row">
          <p>© {new Date().getFullYear()} NanoNova Research Training Centre. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-primary-300">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-primary-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
