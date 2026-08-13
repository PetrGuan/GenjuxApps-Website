import { Baby, Moon, Droplets } from "lucide-react";

const INPUT_TEXT = '"Fed 120ml at 9, napped 10:30 to 11:30, diaper at 1pm"';

const PARSED_ENTRIES = [
  { icon: Baby, type: "Feed", detail: "120ml", time: "9:00 AM", color: "#FFC832", colorRgb: "255,200,50" },
  { icon: Moon, type: "Sleep", detail: "1h 00min", time: "10:30 – 11:30", color: "#AF82FF", colorRgb: "175,130,255" },
  { icon: Droplets, type: "Diaper", detail: "", time: "1:00 PM", color: "#E682E6", colorRgb: "230,130,230" },
];

export default function SmartLogViz() {
  return (
    <div className="bg-[rgba(90,200,250,0.04)] border border-[rgba(90,200,250,0.1)] rounded-2xl p-6">
      {/* Apple Intelligence badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgba(90,200,250,0.1)] border border-[rgba(90,200,250,0.2)] rounded-full mb-4">
        <span className="text-xs">✦</span>
        <span className="text-[#5AC8FA] text-[11px] font-semibold">Apple Intelligence</span>
      </div>

      {/* Voice input simulation */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-[rgba(90,200,250,0.15)] border border-[rgba(90,200,250,0.25)] flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" fill="#5AC8FA"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#5AC8FA" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 19v4m-4 0h8" stroke="#5AC8FA" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <p className="text-white/60 text-xs italic leading-relaxed">{INPUT_TEXT}</p>
        </div>
      </div>

      {/* Parsing arrow */}
      <div className="flex items-center gap-2 mb-4 pl-[52px]">
        <div className="h-px flex-1 bg-gradient-to-r from-[rgba(90,200,250,0.3)] to-transparent" />
        <span className="text-[10px] text-[#5AC8FA]/60 uppercase tracking-wider">parsed</span>
        <div className="h-px flex-1 bg-gradient-to-l from-[rgba(90,200,250,0.3)] to-transparent" />
      </div>

      {/* Parsed entries */}
      <div className="flex flex-col gap-2">
        {PARSED_ENTRIES.map((entry, i) => {
          const Icon = entry.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl border"
              style={{
                background: `rgba(${entry.colorRgb}, 0.06)`,
                borderColor: `rgba(${entry.colorRgb}, 0.12)`,
              }}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} style={{ color: entry.color }} strokeWidth={1.75} />
                <div>
                  <div className="text-white text-xs font-semibold">
                    {entry.type}
                    {entry.detail && <span className="text-white/50 font-normal"> — {entry.detail}</span>}
                  </div>
                  <div className="text-white/40 text-[10px] mt-0.5">{entry.time}</div>
                </div>
              </div>
              <div
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{
                  color: entry.color,
                  background: `rgba(${entry.colorRgb}, 0.1)`,
                }}
              >
                ✓ Ready
              </div>
            </div>
          );
        })}
      </div>

      {/* Save all button mock */}
      <div className="mt-4 flex justify-end">
        <div className="px-4 py-1.5 bg-[rgba(90,200,250,0.15)] border border-[rgba(90,200,250,0.25)] rounded-lg text-[#5AC8FA] text-xs font-semibold">
          Save All (3)
        </div>
      </div>
    </div>
  );
}
