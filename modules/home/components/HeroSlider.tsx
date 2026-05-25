import { useState } from "react";
import { useEffect, useCallback } from "react";
import { SLIDES } from "@/modules/home/constData/const";

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 300);
    },
    [animating]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.url}
            alt={slide.heading}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#003049]/80 via-[#003049]/60 to-[#003049]/90" />
        </div>
      ))}

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-500 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Badge */}
        <span className="inline-block mb-5 bg-[#F4A261]/20 border border-[#F4A261]/40 text-[#F4A261] text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
          Your Partner in Academic Excellence
        </span>

        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl mb-5 drop-shadow-lg">
          {SLIDES[current].heading}
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mb-8 leading-relaxed">
          {SLIDES[current].sub}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/studentSupport"
            className="bg-[#F4A261] text-[#003049] font-bold px-8 py-3 rounded-full hover:bg-[#E76F51] transition-colors duration-200 shadow-lg"
          >
            Explore Services
          </a>
          <a
            href="/contactus"
            className="border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-8 h-3 bg-[#F4A261]" : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 border border-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current + 1) % SLIDES.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 border border-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
}

export default HeroSlider;