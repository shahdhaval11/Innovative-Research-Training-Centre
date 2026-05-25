import { ANNOUNCEMENTS } from "@/modules/home/constData/const";

function AnnouncementsSection() {
  const tagColor: Record<string, string> = {
    Webinar: "bg-blue-100 text-blue-800",
    Workshop: "bg-green-100 text-green-800",
    Course: "bg-purple-100 text-purple-800",
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">
        {/* Heading col */}
        <div className="lg:col-span-1">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Stay Updated</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2 mb-4 leading-tight">
            Upcoming Events & Programs
          </h2>
          <p className="text-[#003049]/60 text-base leading-relaxed mb-6">
            Enrich your skills through our webinars, workshops, and certificate courses curated for
            research scholars.
          </p>
          <a
            href="#"
            className="inline-block bg-[#003049] text-white font-bold px-7 py-3 rounded-full hover:bg-[#02223a] transition-colors duration-200"
          >
            View All Events
          </a>
        </div>

        {/* Cards col */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {ANNOUNCEMENTS.map((a) => (
            <div
              key={a.title}
              className="flex gap-5 items-start bg-[#f7f9fb] border border-[#003049]/8 rounded-2xl p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
            >
              {/* Date badge */}
              <div className="shrink-0 w-14 text-center">
                <p className="text-[#003049] font-black text-lg leading-none">
                  {a.date.split(" ")[1].replace(",", "")}
                </p>
                <p className="text-[#003049]/50 text-xs font-semibold uppercase">
                  {a.date.split(" ")[0]}
                </p>
              </div>
              <div className="w-px self-stretch bg-[#003049]/10" />
              <div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full mr-2 ${
                    tagColor[a.tag] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {a.tag}
                </span>
                <h4 className="text-[#003049] font-bold mt-1.5 group-hover:text-[#F4A261] transition-colors">
                  {a.title}
                </h4>
                <p className="text-[#003049]/60 text-sm mt-1 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AnnouncementsSection;