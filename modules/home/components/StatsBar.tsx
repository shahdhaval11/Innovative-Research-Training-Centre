import { stats } from "@/modules/home/constData/const";

function StatsBar() {
  return (
    <div className="bg-[#F4A261] py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[#003049] font-black text-3xl">{s.value}</p>
            <p className="text-[#003049]/80 text-sm font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsBar;