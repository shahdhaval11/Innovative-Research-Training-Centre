import { EXPERTISE } from "@/modules/aboutus/constData/const";


// ─── Expertise Section ────────────────────────────────────────────────────────
function ExpertiseSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">What We Excel At</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2">Our Research Support Expertise</h2>
          <p className="text-[#003049]/60 mt-3 max-w-2xl mx-auto text-base">
            Over a decade of focused academic support has given us deep expertise across every stage
            of the research and publication lifecycle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE.map((item) => (
            <div
              key={item.title}
              className="group bg-[#f7f9fb] border border-[#003049]/8 rounded-2xl p-6 hover:shadow-lg hover:border-[#F4A261]/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#003049]/8 group-hover:bg-[#F4A261]/15 flex items-center justify-center text-2xl transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-[#F4A261] bg-[#F4A261]/10 px-2.5 py-1 rounded-full">
                  {item.stat}
                </span>
              </div>
              <h3 className="text-[#003049] font-bold text-base mb-2 group-hover:text-[#003049] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#003049]/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Progress bars — visual expertise indicator */}
        <div className="mt-14 bg-[#003049] rounded-3xl p-10">
          <h3 className="text-white font-black text-xl mb-8 text-center">Domain Expertise Distribution</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {[
              { label: "Thesis & Dissertation Guidance", pct: 95 },
              { label: "Research Methodology Design",    pct: 90 },
              { label: "Statistical Data Analysis",      pct: 88 },
              { label: "Academic Writing & Editing",     pct: 97 },
              { label: "Journal Publication Support",    pct: 85 },
              { label: "Mentorship & Student Support",   pct: 99 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-white/80 text-sm">{item.label}</span>
                  <span className="text-[#F4A261] font-bold text-sm">{item.pct}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpertiseSection;