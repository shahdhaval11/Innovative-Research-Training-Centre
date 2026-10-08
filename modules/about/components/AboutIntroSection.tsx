import Reveal from "@/components/ui/Reveal";
import DnaMotif from "@/components/ui/DnaMotif";
import { ABOUT_INTRO } from "../constData";

export default function AboutIntroSection() {
  const { eyebrow, heading, tagline, paragraphs } = ABOUT_INTRO;

  return (
    <section id="about" className="section-py relative scroll-mt-24 overflow-hidden">
      <DnaMotif
        segments={7}
        className="pointer-events-none absolute top-0 -right-8 h-full w-32 text-primary-600 opacity-[0.05] sm:w-40"
      />

      <div className="container-app relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">{eyebrow}</span>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-secondary-800 sm:text-4xl">
            {heading}
          </h1>
          <p className="mt-2 font-heading text-lg font-bold text-primary-600">{tagline}</p>
          <div className="mt-6 space-y-4">
            {paragraphs.map((text) => (
              <p key={text} className="text-sm leading-relaxed text-secondary-500 sm:text-base">
                {text}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
