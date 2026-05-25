import { SERVICES } from "@/modules/home/constData/const";


function ServicesSection() {
  return (
    <section className="bg-[#003049] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-4xl font-black text-white mt-2">Comprehensive Academic Support</h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto text-base">
            A wide range of services crafted specifically for PG & PhD students navigating their
            academic journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-[#F4A261]/10 hover:border-[#F4A261]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#F4A261] transition-colors">
                {s.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-block border-2 border-[#F4A261] text-[#F4A261] font-bold px-8 py-3 rounded-full hover:bg-[#F4A261] hover:text-[#003049] transition-colors duration-200"
          >
            View All Services →
          </a>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;