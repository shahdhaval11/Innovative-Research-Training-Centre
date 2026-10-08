import Reveal from "@/components/ui/Reveal";
import { WHY_NANONOVA } from "../constData";

export default function WhyNanoNovaSection() {
  const { eyebrow, heading, points } = WHY_NANONOVA;

  return (
    <section id="why-nanonova" className="section-py scroll-mt-24 bg-secondary-50/50">
      <div className="container-app">
        <div className="mb-9 text-center">
          <span className="eyebrow justify-center">{eyebrow}</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            {heading}
            <span className="text-primary-600">?</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {points.map((point, index) => (
            <Reveal
              key={point.title}
              delay={index * 90}
              className={`lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}
            >
              <article className="group h-full rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary-500 to-accent-600 text-white shadow-md">
                  <point.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-secondary-800">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-secondary-500">
                  {point.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
