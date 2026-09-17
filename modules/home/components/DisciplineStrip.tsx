import { HERO_DISCIPLINES } from "../constData/const";

export default function DisciplineStrip() {
  return (
    <section className="relative z-10 -mt-8 sm:-mt-10">
      <div className="container-app">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-secondary-100 bg-secondary-100 shadow-soft sm:grid-cols-3 lg:grid-cols-5">
          {HERO_DISCIPLINES.map((d) => (
            <div
              key={d.title}
              className="group relative flex flex-col items-center gap-2 bg-white px-4 py-5 text-center transition-colors hover:bg-primary-50/40"
            >
              <span
                aria-hidden
                className="absolute top-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary-600 transition-all duration-300 group-hover:w-10"
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-600/15 transition-transform duration-300 group-hover:scale-110">
                <d.icon className="h-6 w-6" />
              </span>
              <p className="font-heading text-sm font-bold text-secondary-800">{d.title}</p>
              <p className="hidden text-xs text-secondary-500 sm:block">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
