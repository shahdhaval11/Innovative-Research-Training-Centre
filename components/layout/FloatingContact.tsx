import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import { SITE_CONTACT } from "@/lib/siteConfig";

const ACTIONS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${SITE_CONTACT.whatsappNumber}`,
    className: "bg-[#25D366] hover:bg-[#1fbd5a]",
    icon: <SocialIcon platform="whatsapp" className="h-5 w-5" />,
  },
  {
    label: "Call Now",
    href: `tel:${SITE_CONTACT.phoneRaw}`,
    className: "bg-secondary-700 hover:bg-secondary-800",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    label: "Email Us",
    href: `mailto:${SITE_CONTACT.email}`,
    className: "bg-accent-600 hover:bg-accent-700",
    icon: <Mail className="h-5 w-5" />,
  },
];

export default function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-24 z-40 hidden flex-col items-center gap-3 sm:flex">
      {ACTIONS.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          target={action.label === "WhatsApp" ? "_blank" : undefined}
          rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
          aria-label={action.label}
          title={action.label}
          className={`relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-soft transition-transform hover:scale-110 ${action.className}`}
        >
          {action.label === "WhatsApp" && (
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75" />
          )}
          <span className="relative">{action.icon}</span>
        </Link>
      ))}
    </div>
  );
}
