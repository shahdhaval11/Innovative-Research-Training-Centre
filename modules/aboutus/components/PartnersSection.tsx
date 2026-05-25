import { PARTNERS } from "@/modules/aboutus/constData/const";

// ─── Partners Section ─────────────────────────────────────────────────────────
function PartnersSection() {
  return (
    <section className="bg-[#f7f9fb] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Our Network</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2">Collaborations & Academic Partners</h2>
          <p className="text-[#003049]/60 mt-3 max-w-2xl mx-auto text-base">
            We are proud to collaborate with leading academic institutions, research councils, and
            publishing houses to ensure the highest quality outcomes for our students.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-4 bg-white border border-[#003049]/8 rounded-2xl p-5 hover:shadow-md hover:border-[#F4A261]/40 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#003049] flex items-center justify-center shrink-0 group-hover:bg-[#F4A261] transition-colors duration-300">
                <span className="text-white group-hover:text-[#003049] font-black text-xs text-center transition-colors leading-tight">
                  {p.abbr}
                </span>
              </div>
              <div>
                <p className="text-[#003049] font-bold text-sm leading-tight">{p.name}</p>
                <span className="text-xs text-[#F4A261] font-semibold mt-1 inline-block">{p.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="bg-[#003049] rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-xl mb-1">Interested in a Partnership?</p>
            <p className="text-white/60 text-sm">
              We welcome collaborations with universities, research institutions, and academic publishers.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 bg-[#F4A261] text-[#003049] font-bold px-7 py-3 rounded-full hover:bg-[#E76F51] transition-colors duration-200 whitespace-nowrap"
          >
            Get in Touch →
          </a>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;