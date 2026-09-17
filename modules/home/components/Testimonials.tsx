import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../constData/const";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  return (
    <section className="section-py">
      <div className="container-app">
        <div className="mb-8 text-center">
          <span className="eyebrow justify-center">Testimonials</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            What Our Learners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <Reveal key={t.name} delay={index * 100}>
            <div className="flex h-full flex-col rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                <Quote className="h-5 w-5 fill-current" />
              </span>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-secondary-600">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-secondary-100 pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-accent-600 text-sm font-bold text-white shadow-sm">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-secondary-800">{t.name}</p>
                  <p className="text-xs text-secondary-500">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
