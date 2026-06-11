// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#003049]">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A261]/8 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#F4A261]/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
          <a href="#" className="hover:text-[#F4A261] transition-colors">Home</a>
          <span>›</span>
          <span className="text-[#F4A261] font-medium">About Us</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#F4A261]/15 border border-[#F4A261]/30 text-[#F4A261] text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
              Who We Are
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              About <span className="text-[#F4A261]">NRTC</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Nanonova Research & Training Centre is a dedicated academic support platform for
              post-graduate and doctoral students. We combine expert mentorship, research guidance,
              and professional publishing support to help every scholar reach their potential.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#mission"
                className="bg-[#F4A261] text-[#003049] font-bold px-7 py-3 rounded-full hover:bg-[#E76F51] transition-colors duration-200 shadow-lg"
              >
                Our Mission
              </a>
              <a
                href="#team"
                className="border-2 border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                Meet the Team
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "12+", label: "Years of Excellence", icon: "🏛️" },
              { value: "1200+", label: "Students Supported", icon: "🎓" },
              { value: "350+", label: "Papers Published", icon: "📰" },
              { value: "15+", label: "Expert Mentors", icon: "🤝" },
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
      </div>
    </section>
  );
}

export default HeroBanner;