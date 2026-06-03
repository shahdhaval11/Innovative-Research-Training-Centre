import { WHY_US } from "@/modules/home/constData/const";

function IntroSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        {/* Text */}
        <div>
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">About Us</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2 mb-5 leading-tight">
            Welcome to NanoNova Research &amp; Training Centre — Your Partner in Academic Excellence
          </h2>
          <p className="text-[#003049]/70 text-base leading-relaxed mb-5">
            At NanoNova Research &amp; Training Centre, we are dedicated to helping post-graduate (PG)
            and PhD students achieve their academic goals. Whether you&apos;re starting your research
            journey, writing your thesis, or preparing for paper publication, our platform offers
            tailored services designed to guide you through every step.
          </p>
          <p className="text-[#003049]/70 text-base leading-relaxed mb-8">
            We aim to provide expert advice, practical resources, and personalized support to ensure
            your success in the world of academia. We focus on training students through short-term
            and certificate courses.
          </p>
          <a
            href="/aboutus"
            className="inline-block bg-[#003049] text-white font-bold px-8 py-3 rounded-full hover:bg-[#02223a] transition-colors duration-200"
          >
            Learn More About Us
          </a>
        </div>

        {/* Why us cards */}
        <div className="grid grid-cols-1 gap-4">
          {WHY_US.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 bg-[#f7f9fb] border border-[#003049]/8 rounded-2xl p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#003049]/8 flex items-center justify-center text-2xl shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-[#003049] font-bold text-sm">{item.label}</p>
                <p className="text-[#003049]/60 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IntroSection;