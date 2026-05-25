import {VISION_POINTS } from "@/modules/aboutus/constData/const";

// ─── Mission & Vision ─────────────────────────────────────────────────────────
function MissionVisionSection() {
  return (
    <section id="mission" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Our Purpose</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2">Mission & Vision</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className="bg-[#003049] rounded-3xl p-10 relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F4A261]/10 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#F4A261]/15 border border-[#F4A261]/30 flex items-center justify-center text-3xl mb-6">
                🎯
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Our Mission</h3>
              <p className="text-white/75 text-base leading-relaxed">
                Our mission is to empower post-graduate and doctoral students with the tools,
                resources, and expertise they need to succeed in their academic pursuits. We are
                committed to providing high-quality, personalised services that help students produce
                original, well-researched, and professionally written academic works.
              </p>
              <p className="text-white/75 text-base leading-relaxed mt-4">
                Through mentorship, skill-building, and expert guidance, we aim to contribute to the
                academic success of every student who comes to us.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#f7f9fb] border border-[#003049]/8 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F4A261]/10 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#F4A261]/20 border border-[#F4A261]/30 flex items-center justify-center text-3xl mb-6">
                🔭
              </div>
              <h3 className="text-2xl font-black text-[#003049] mb-6">Our Vision</h3>
              <div className="flex flex-col gap-5">
                {VISION_POINTS.map((point, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-[#F4A261] flex items-center justify-center text-[#003049] font-black text-xs mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-[#003049]/75 text-base leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values strip */}
        <div className="mt-10 bg-[#F4A261] rounded-2xl py-6 px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: "⚖️", label: "Integrity" },
              { icon: "💡", label: "Innovation" },
              { icon: "🌍", label: "Inclusivity" },
              { icon: "🏅", label: "Excellence" },
            ].map((v) => (
              <div key={v.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{v.icon}</span>
                <p className="text-[#003049] font-black text-sm tracking-wide uppercase">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVisionSection;