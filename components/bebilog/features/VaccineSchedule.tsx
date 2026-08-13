const VACCINES = [
  { name: "Hepatitis B — Dose 1", age: "At birth", status: "done" as const },
  { name: "BCG", age: "At birth", status: "done" as const },
  { name: "DTaP — Dose 1", age: "2 months", status: "upcoming" as const },
  { name: "IPV — Dose 1", age: "2 months", status: "scheduled" as const },
];

const STATUS_STYLES = {
  done: { bg: "rgba(80,200,120,0.06)", border: "rgba(80,200,120,0.12)", color: "#50C878", label: "✓ Done" },
  upcoming: { bg: "rgba(255,200,50,0.06)", border: "rgba(255,200,50,0.15)", color: "#FFC832", label: "Upcoming" },
  scheduled: { bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", label: "Scheduled" },
};

export default function VaccineSchedule() {
  return (
    <div className="bg-[rgba(255,69,58,0.04)] border border-[rgba(255,69,58,0.1)] rounded-2xl p-6">
      <div className="flex flex-col gap-2.5">
        {VACCINES.map((v, i) => {
          const style = STATUS_STYLES[v.status];
          return (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 rounded-xl border"
              style={{ background: style.bg, borderColor: style.border }}
            >
              <div>
                <div className={`text-sm font-semibold ${v.status === "scheduled" ? "text-white/60" : "text-white"}`}>
                  {v.name}
                </div>
                <div className={`text-xs mt-0.5 ${v.status === "scheduled" ? "text-white/30" : "text-white/40"}`}>
                  {v.age}
                </div>
              </div>
              <div className="text-xs font-semibold" style={{ color: style.color }}>
                {style.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
