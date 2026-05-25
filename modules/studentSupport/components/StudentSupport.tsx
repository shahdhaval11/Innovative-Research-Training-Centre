"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/NavbarComponent";
import Footer from "@/components/FooterComponent";
import { SERVICES, PROCESS } from "@/modules/studentSupport/constData/const";

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#003049]">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F4A261]/6 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F4A261]/4 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
          <a href="#" className="hover:text-[#F4A261] transition-colors">Home</a>
          <span>›</span>
          <span className="text-[#F4A261] font-medium">Student Support</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#F4A261]/15 border border-[#F4A261]/30 text-[#F4A261] text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
              Comprehensive Academic Services
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Student <span className="text-[#F4A261]">Support</span> Services
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              From your first research idea to your final published paper — IRTC offers end-to-end
              academic support across 7 specialised service areas, all tailored to PG & PhD scholars.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="bg-[#F4A261] text-[#003049] font-bold px-7 py-3 rounded-full hover:bg-[#E76F51] transition-colors duration-200 shadow-lg"
              >
                Explore Services
              </a>
              <a
                href="#process"
                className="border-2 border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Service count grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "7",    label: "Service Areas",         icon: "🗂️" },
              { value: "40+",  label: "Support Offerings",     icon: "📋" },
              { value: "1200+",label: "Students Supported",    icon: "🎓" },
              { value: "98%",  label: "Satisfaction Rate",     icon: "⭐" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/6 border border-white/10 rounded-2xl p-6 text-center hover:bg-[#F4A261]/10 hover:border-[#F4A261]/30 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-white font-black text-3xl">{s.value}</p>
                <p className="text-white/60 text-xs mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick-jump service pills */}
        <div className="mt-12 flex flex-wrap gap-3">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex items-center gap-2 bg-white/8 border border-white/15 hover:bg-[#F4A261]/15 hover:border-[#F4A261]/40 text-white/80 hover:text-[#F4A261] text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Individual Service Section ───────────────────────────────────────────────
function ServiceBlock({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const isAlt = index % 2 !== 0; // alternates light/white bg

  return (
    <section
      id={service.id}
      className={`py-20 px-6 ${isAlt ? "bg-[#f7f9fb]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#003049] flex items-center justify-center text-3xl shrink-0 shadow-lg">
              {service.icon}
            </div>
            <div>
              <span className="text-[#F4A261] text-xs font-bold uppercase tracking-widest">
                Service {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-3xl font-black text-[#003049] mt-0.5 leading-tight">
                {service.title}
              </h2>
              <p className="text-[#003049]/60 text-sm mt-1 italic">{service.tagline}</p>
            </div>
          </div>
          <a
            href="#"
            className="shrink-0 bg-[#003049] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#02223a] transition-colors duration-200"
          >
            Get Started →
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: description + CTA card */}
          <div className="lg:col-span-1">
            <div className="bg-[#003049] rounded-2xl p-7">
              <p className="text-white/80 text-sm leading-relaxed mb-6">{service.desc}</p>
              <div className="border-t border-white/10 pt-5">
                <p className="text-[#F4A261] text-xs font-bold uppercase tracking-widest mb-3">
                  What's Included
                </p>
                <div className="flex flex-col gap-2">
                  {service.items.slice(0, 4).map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F4A261] shrink-0" />
                      <span className="text-white/70 text-xs">{item.name}</span>
                    </div>
                  ))}
                  {service.items.length > 4 && (
                    <p className="text-white/40 text-xs mt-1">
                      + {service.items.length - 4} more offerings
                    </p>
                  )}
                </div>
              </div>
              <a
                href="#"
                className="mt-6 block text-center bg-[#F4A261] text-[#003049] font-bold text-sm py-2.5 rounded-xl hover:bg-[#E76F51] transition-colors duration-200"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>

          {/* Right: accordion items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {service.items.map((item, i) => (
              <div
                key={item.name}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openItem === i
                    ? "border-[#F4A261] shadow-md"
                    : "border-[#003049]/10 hover:border-[#003049]/30"
                }`}
              >
                <button
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-colors duration-300 ${
                        openItem === i
                          ? "bg-[#F4A261] text-[#003049]"
                          : "bg-[#003049]/8 text-[#003049]/60 group-hover:bg-[#003049]/15"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span
                      className={`font-bold text-sm transition-colors duration-200 ${
                        openItem === i ? "text-[#003049]" : "text-[#003049]/80"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    className={`text-lg font-black transition-all duration-300 shrink-0 ml-3 ${
                      openItem === i ? "text-[#F4A261] rotate-45" : "text-[#003049]/30"
                    }`}
                  >
                    +
                  </span>
                </button>

                {openItem === i && (
                  <div className="px-5 pb-5">
                    <div className="pl-11">
                      <p className="text-[#003049]/70 text-sm leading-relaxed border-l-2 border-[#F4A261] pl-4">
                        {item.detail}
                      </p>
                      <a
                        href="#"
                        className="inline-block mt-3 text-xs font-bold text-[#F4A261] hover:text-[#E76F51] transition-colors"
                      >
                        Learn more about this service →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── All Services Overview Grid ───────────────────────────────────────────────
function ServicesOverview() {
  return (
    <section id="services" className="bg-[#003049] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">All Service Areas</span>
          <h2 className="text-4xl font-black text-white mt-2">Complete Support Ecosystem</h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto text-base">
            Seven interconnected service pillars designed to cover every dimension of your academic research journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-[#F4A261]/10 hover:border-[#F4A261]/40 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <span className="text-[#F4A261]/60 text-xs font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-white font-bold text-base mt-0.5 mb-2 group-hover:text-[#F4A261] transition-colors">
                {s.title}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed">
                {s.items.length} offerings
              </p>
              <div className="mt-4 text-[#F4A261] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View details →
              </div>
            </a>
          ))}

          {/* Filler CTA card */}
          <div className="bg-[#F4A261] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-[#003049] font-black text-base mb-2">
                Not sure where to start?
              </h3>
              <p className="text-[#003049]/70 text-xs leading-relaxed">
                Book a free 30-minute consultation with one of our academic advisors.
              </p>
            </div>
            <a
              href="#"
              className="mt-5 block text-center bg-[#003049] text-white font-bold text-xs py-2.5 rounded-xl hover:bg-[#02223a] transition-colors duration-200"
            >
              Book Free Session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process / How It Works ───────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section id="process" className="bg-[#f7f9fb] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Our Approach</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2">How Our Support Works</h2>
          <p className="text-[#003049]/60 mt-3 max-w-xl mx-auto text-base">
            A clear, structured process that ensures every student receives personalised,
            high-quality academic support from start to finish.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS.map((p, i) => (
            <div
              key={p.step}
              className="relative bg-white border border-[#003049]/8 rounded-2xl p-7 hover:shadow-lg hover:border-[#F4A261]/40 transition-all duration-300 group"
            >
              {/* Connector line (not on last items) */}
              {i < PROCESS.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-[#F4A261]/40 z-10" />
              )}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#003049] group-hover:bg-[#F4A261] flex items-center justify-center shrink-0 transition-colors duration-300">
                  <span className="text-white group-hover:text-[#003049] font-black text-sm transition-colors">
                    {p.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-[#003049] font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-[#003049]/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="bg-[#003049] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">
          Ready to Begin?
        </span>
        <h2 className="text-4xl font-black text-white mt-2 mb-4 leading-tight">
          Start Your Academic Success Journey Today
        </h2>
        <p className="text-white/70 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Whether you are at the beginning of your research or preparing for final submission, our
          team is ready to provide the expert support you need — on time and within budget.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="bg-[#F4A261] text-[#003049] font-black px-9 py-3.5 rounded-full hover:bg-[#E76F51] transition-colors duration-200 shadow-lg"
          >
            Book a Free Consultation
          </a>
          <a
            href="#"
            className="border-2 border-white/30 text-white font-semibold px-9 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            View All Courses
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StudentSupport() {
  return (
    <main className="font-sans">
      <Navbar />
      <HeroBanner />
      <ServicesOverview />
      {SERVICES.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}
      <ProcessSection />
      <CTABanner />
      <Footer />
    </main>
  );
}
