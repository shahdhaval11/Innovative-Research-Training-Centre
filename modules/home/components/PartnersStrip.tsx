import { PARTNERS } from "../constData/const";

export default function PartnersStrip() {
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className="border-y border-secondary-100 bg-secondary-50/40 py-7">
      <div className="container-app">
        <p className="mb-5 text-center text-xs font-bold tracking-wide text-secondary-400 uppercase">
          Our Academic & Industry Partners
        </p>
      </div>

      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]">
          {loop.map((partner, index) => (
            <span
              key={`${partner.name}-${index}`}
              className="shrink-0 text-sm font-semibold whitespace-nowrap text-secondary-400 transition-colors hover:text-primary-600"
            >
              {partner.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
