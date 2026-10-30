import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import DnaMotif from "@/components/ui/DnaMotif";
import { SITE_CONTACT } from "@/lib/siteConfig";

const MAP_QUERY = encodeURIComponent(SITE_CONTACT.address);
// Shorter query pins the building more reliably than the full postal address.
const EMBED_QUERY = encodeURIComponent("Shavion Shopping Paradise, Palanpore, Surat");

const WORKING_HOURS = [
  { day: "Monday", time: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
  { day: "Thursday", time: "9:00 AM - 6:00 PM" },
  { day: "Friday", time: "9:00 AM - 6:00 PM" },
  { day: "Saturday", time: "9:00 AM - 6:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const CARDS = [
  {
    icon: MapPin,
    label: "Visit Us",
    lines: SITE_CONTACT.addressLines,
    href: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
    cta: "Get directions",
  },
  {
    icon: Phone,
    label: "Call Us",
    lines: [SITE_CONTACT.phoneDisplay],
    href: `tel:${SITE_CONTACT.phoneRaw}`,
    cta: "Call now",
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: [SITE_CONTACT.email],
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONTACT.email}`,
    cta: "Send an email",
  },
  {
    icon: Clock,
    label: "Working Hours",
    hours: WORKING_HOURS,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-secondary-900 py-14 sm:py-20">
        <DnaMotif
          segments={7}
          className="pointer-events-none absolute top-0 -right-8 -z-10 h-full w-40 text-primary-400 opacity-10"
        />
        <div className="container-app text-center">
          <span className="eyebrow justify-center text-primary-300">Contact Us</span>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-5xl">
            Let&apos;s start a conversation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75 sm:text-base">
            Questions about internships, workshops or research support? Call, write or visit us –
            our team is happy to help.
          </p>
        </div>
      </section>

      <section className="section-py bg-secondary-50/50">
        <div className="container-app">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ icon: Icon, label, lines, hours, href, cta }, i) => (
              <Reveal key={label} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-heading text-lg font-extrabold text-secondary-800">
                    {label}
                  </h2>
                  <div className="mt-2 flex-1 space-y-0.5 text-sm text-secondary-500 wrap-anywhere">
                    {lines?.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    {hours?.map(({ day, time }) => (
                      <p key={day} className="flex justify-between gap-3">
                        <span className="font-medium text-secondary-700">{day}</span>
                        <span className={time === "Closed" ? "font-semibold text-red-500" : ""}>
                          {time}
                        </span>
                      </p>
                    ))}
                  </div>
                  {href && (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-4 text-sm font-semibold text-primary-700 hover:text-primary-800"
                    >
                      {cta} →
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-secondary-100 bg-white shadow-soft lg:col-span-2">
              <iframe
                title="NanoNova Research and Training Centre location on Google Maps"
                src={`https://maps.google.com/maps?q=${EMBED_QUERY}&z=16&output=embed`}
                className="h-80 w-full border-0 sm:h-105 lg:h-full lg:min-h-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-linear-to-br from-primary-700 to-secondary-900 p-8 text-white shadow-soft">
              <div>
                <h2 className="font-heading text-2xl font-extrabold">Prefer a quick chat?</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Message us on WhatsApp or send an inquiry and we&apos;ll get back to you shortly.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${SITE_CONTACT.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-white w-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp us
                </a>
                <Link href="/inquiry" className="btn-outline-light w-full">
                  Send an inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
