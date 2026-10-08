import { Eye, Target } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { MISSION_VISION } from "../constData";

export default function MissionVisionSection() {
  const { eyebrow, heading, mission, vision } = MISSION_VISION;

  return (
    <section id="vision-mission" className="section-py relative scroll-mt-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-24 left-1/2 h-125 w-225 -translate-x-1/2 rounded-full bg-primary-50/70 blur-3xl"
      />

      <div className="container-app relative">
        <div className="mb-9 text-center">
          <span className="eyebrow justify-center">{eyebrow}</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            {heading}
            <span className="text-primary-600">.</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-2xl border border-secondary-100 bg-white p-7 shadow-sm">
              <div
                aria-hidden
                className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-linear-to-br from-primary-500 to-accent-500 opacity-10"
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 text-white shadow-md">
                <Target className="h-7 w-7" />
              </span>
              <h3 className="relative mt-4 font-heading text-xl font-bold text-secondary-800">
                {mission.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-secondary-500">
                {mission.description}
              </p>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <article className="relative h-full overflow-hidden rounded-2xl border border-secondary-100 bg-white p-7 shadow-sm">
              <div
                aria-hidden
                className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-linear-to-br from-accent-500 to-primary-500 opacity-10"
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-accent-500 to-accent-700 text-white shadow-md">
                <Eye className="h-7 w-7" />
              </span>
              <h3 className="relative mt-4 font-heading text-xl font-bold text-secondary-800">
                {vision.title}
              </h3>
              <ol className="relative mt-3 space-y-3">
                {vision.points.map((point, index) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-secondary-500">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-50 text-xs font-bold text-accent-700">
                      {index + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
