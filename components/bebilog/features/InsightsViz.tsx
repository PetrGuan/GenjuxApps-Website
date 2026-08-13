import { Moon, Baby, TrendingUp, Ruler, CircleDot, Droplets } from "lucide-react";

const DIMENSIONS = [
  { label: "WEIGHT", value: "P72", pct: 72, color: "#50C878", colorRgb: "80,200,120", icon: TrendingUp },
  { label: "HEIGHT", value: "P65", pct: 65, color: "#AF82FF", colorRgb: "175,130,255", icon: Ruler },
  { label: "HEAD", value: "P58", pct: 58, color: "#32ADE6", colorRgb: "50,173,230", icon: CircleDot },
];

const DAILY_STATS = [
  { label: "FEEDS", value: "8x", sub: "540ml total", color: "#FFC832", colorRgb: "255,200,50", icon: Baby },
  { label: "SLEEP", value: "14.5h", sub: "4 naps", color: "#AF82FF", colorRgb: "175,130,255", icon: Moon },
  { label: "DIAPERS", value: "7x", sub: "5 wet · 2 dirty", color: "#E682E6", colorRgb: "230,130,230", icon: Droplets },
];

export default function InsightsViz() {
  return (
    <div className="flex flex-col gap-3">
      {/* Sleep Window Card */}
      <div className="bg-[rgba(175,130,255,0.04)] border border-[rgba(175,130,255,0.1)] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Moon size={16} className="text-[#AF82FF]" />
          <span className="text-white text-sm font-semibold">Sleep Window</span>
        </div>
        <div className="relative h-2.5 bg-white/[0.06] rounded-full mb-3 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: "78%",
              background: "linear-gradient(90deg, #50C878 0%, #FFC832 50%, #FF453A 100%)",
            }}
          />
          <div className="absolute inset-y-0 left-[40%] w-[25%] border-x-2 border-white/20" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#FF8791] text-xs font-semibold">Overtired</span>
            <span className="text-white/30 text-xs ml-2">Awake 3h 15m</span>
          </div>
          <div className="text-white/40 text-[10px]">
            Best time: <span className="text-[#AF82FF] font-semibold">14:30 – 15:15</span>
          </div>
        </div>
      </div>

      {/* Feed Window Card */}
      <div className="bg-[rgba(255,200,50,0.04)] border border-[rgba(255,200,50,0.1)] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Baby size={16} className="text-[#FFC832]" />
          <span className="text-white text-sm font-semibold">Feed Window</span>
        </div>
        <div className="relative h-2.5 bg-white/[0.06] rounded-full mb-3 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: "55%",
              background: "linear-gradient(90deg, #50C878 0%, #FFC832 70%, #FF453A 100%)",
            }}
          />
          <div className="absolute inset-y-0 left-[35%] w-[30%] border-x-2 border-white/20" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#50C878] text-xs font-semibold">On track</span>
            <span className="text-white/30 text-xs ml-2">Last feed 1h 45m ago</span>
          </div>
          <div className="text-white/40 text-[10px]">
            Next: <span className="text-[#FFC832] font-semibold">~15:00</span>
          </div>
        </div>
      </div>

      {/* Growth percentiles row */}
      <div className="bg-[rgba(80,200,120,0.04)] border border-[rgba(80,200,120,0.1)] rounded-2xl p-5">
        <div className="grid grid-cols-3 gap-3">
          {DIMENSIONS.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="rounded-xl p-3 text-center"
                style={{ background: `rgba(${d.colorRgb}, 0.08)` }}
              >
                <div className="flex justify-center mb-1" style={{ color: d.color }}>
                  <Icon size={14} strokeWidth={1.75} />
                </div>
                <div className="text-[10px] text-white/40 mb-1">{d.label}</div>
                <div className="text-lg font-bold" style={{ color: d.color }}>
                  {d.value}
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full mt-1.5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${d.pct}%`,
                      background: `linear-gradient(90deg, ${d.color}, ${d.color}aa)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily stats */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          {DAILY_STATS.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="rounded-xl p-3 text-center"
                style={{ background: `rgba(${d.colorRgb}, 0.08)` }}
              >
                <div className="flex justify-center mb-1" style={{ color: d.color }}>
                  <Icon size={14} strokeWidth={1.75} />
                </div>
                <div className="text-[10px] text-white/40 mb-1">{d.label}</div>
                <div className="text-lg font-bold" style={{ color: d.color }}>
                  {d.value}
                </div>
                <div className="text-[10px] text-white/30 mt-0.5">{d.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
