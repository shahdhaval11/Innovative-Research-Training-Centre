import { TEAM } from "@/modules/aboutus/constData/const";
import { useState } from "react";

// ─── Team Section ─────────────────────────────────────────────────────────────
function TeamSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="team" className="bg-[#003049] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">The People Behind IRTC</span>
          <h2 className="text-4xl font-black text-white mt-2">Meet Our Expert Team</h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto text-base">
            Our team is made up of experienced academics, researchers, and professional editors who
            are passionate about helping students succeed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className={`group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                active === i
                  ? "bg-[#F4A261] border-[#F4A261]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#F4A261]/40"
              }`}
              onClick={() => setActive(active === i ? null : i)}
            >
              {/* Avatar */}
              <div className="p-6 pb-0 flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl mb-4 transition-all duration-300 ${
                    active === i
                      ? "bg-[#003049] text-[#F4A261]"
                      : "bg-[#F4A261]/20 text-[#F4A261] group-hover:bg-[#F4A261]/30"
                  }`}
                >
                  {member.initials}
                </div>
                <h3
                  className={`font-black text-base leading-tight mb-1 transition-colors ${
                    active === i ? "text-[#003049]" : "text-white"
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`text-xs font-bold uppercase tracking-wide mb-1 transition-colors ${
                    active === i ? "text-[#003049]/70" : "text-[#F4A261]"
                  }`}
                >
                  {member.role}
                </p>
                <p
                  className={`text-xs mb-4 transition-colors ${
                    active === i ? "text-[#003049]/60" : "text-white/50"
                  }`}
                >
                  {member.field}
                </p>
              </div>

              {/* Expandable bio */}
              <div
                className={`px-6 pb-6 transition-all duration-300 overflow-hidden ${
                  active === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#003049]/80 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#003049]/10 text-[#003049] font-semibold px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggle hint */}
              <div
                className={`px-6 pb-5 text-center text-xs font-semibold transition-colors ${
                  active === i ? "text-[#003049]/60" : "text-white/30 group-hover:text-white/60"
                }`}
              >
                {active === i ? "▲ Show less" : "▼ View profile"}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm mb-4">Interested in joining our team of academic experts?</p>
          <a
            href="#"
            className="inline-block border-2 border-[#F4A261] text-[#F4A261] font-bold px-8 py-3 rounded-full hover:bg-[#F4A261] hover:text-[#003049] transition-colors duration-200"
          >
            Join Our Team →
          </a>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;