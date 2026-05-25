import { useState } from "react";
import { TESTIMONIALS } from "@/modules/home/constData/const";

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#f7f9fb] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Success Stories</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2">What Our Students Say</h2>
        </div>

        {/* Featured testimonial */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          {/* Decorative quote */}
          <div className="absolute top-6 right-8 text-[10rem] leading-none text-[#003049]/5 font-black select-none pointer-events-none">
            "
          </div>
          <p className="text-[#003049]/80 text-lg leading-relaxed mb-8 relative z-10 italic">
            "{TESTIMONIALS[active].text}"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#003049] flex items-center justify-center text-white font-black text-lg">
              {TESTIMONIALS[active].name[0]}
            </div>
            <div>
              <p className="text-[#003049] font-bold">{TESTIMONIALS[active].name}</p>
              <p className="text-[#003049]/50 text-sm">{TESTIMONIALS[active].degree}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mt-6">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                i === active
                  ? "bg-[#003049] text-white border-[#003049]"
                  : "bg-white text-[#003049]/60 border-[#003049]/20 hover:border-[#003049]/60"
              }`}
            >
              {t.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;