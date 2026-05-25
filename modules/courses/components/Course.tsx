"use client";

import Footer from "@/components/FooterComponent";
import Navbar from "@/components/NavbarComponent";

function TrainingCTASection() {
  return (
    <section className="bg-[#003049] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Training Programs</span>
        <h2 className="text-4xl font-black text-white mt-2 mb-5 leading-tight">
          Short-Term Courses & Certificate Programs
        </h2>
        <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          We believe in equipping students with practical skills alongside academic knowledge. Our
          short-term training programs and certificate courses are designed to bridge the gap between
          theory and real-world research practice.
        </p>
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: "📅", label: "Short-Term Programs", desc: "Intensive courses from 1 week to 3 months." },
            { icon: "🏅", label: "Certificate Courses", desc: "Industry-recognised certificates on completion." },
            { icon: "🌐", label: "Online & Offline", desc: "Flexible learning modes to suit your schedule." },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/8 border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-white font-bold mb-1">{item.label}</p>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="inline-block bg-[#F4A261] text-[#003049] font-black px-10 py-3.5 rounded-full hover:bg-[#E76F51] transition-colors duration-200 text-base shadow-lg"
        >
          Browse All Courses →
        </a>
      </div>
    </section>
  );
}

export default function Course() {
  return (
   <main className="font-sans">
      <Navbar />
      <TrainingCTASection />
        <Footer />
    </main>
  );
}