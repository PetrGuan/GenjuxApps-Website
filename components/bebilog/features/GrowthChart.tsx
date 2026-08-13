import { HeartPulse } from "lucide-react";

export default function GrowthChart() {
  return (
    <div className="bg-[rgba(80,200,120,0.04)] border border-[rgba(80,200,120,0.1)] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-sm font-semibold">Weight for Age</div>
        <div className="flex gap-2">
          <span className="text-[10px] text-white/30 px-2 py-0.5 bg-white/5 rounded-md">WHO</span>
          <span className="text-[10px] text-[#50C878] px-2 py-0.5 bg-[rgba(80,200,120,0.1)] rounded-md">0-24m</span>
        </div>
      </div>
      <svg width="100%" height="160" viewBox="0 0 400 160" className="overflow-visible">
        <path d="M0,140 Q100,130 200,115 T400,80" fill="none" stroke="rgba(80,200,120,0.1)" strokeWidth="40" />
        <path d="M0,120 Q100,110 200,95 T400,60" fill="none" stroke="rgba(80,200,120,0.15)" strokeWidth="1" strokeDasharray="4,4" />
        <path d="M0,100 Q100,90 200,75 T400,40" fill="none" stroke="rgba(80,200,120,0.15)" strokeWidth="1" strokeDasharray="4,4" />
        <path d="M0,110 Q100,100 200,85 T400,50" fill="none" stroke="rgba(80,200,120,0.4)" strokeWidth="1.5" />
        <path d="M0,115 Q50,108 100,98 T200,82 L260,72" fill="none" stroke="#50C878" strokeWidth="2.5" />
        <circle cx="260" cy="72" r="5" fill="#50C878" stroke="#0a0a0a" strokeWidth="2" />
        <text x="270" y="68" fill="#50C878" fontSize="10" fontWeight="600">6.2 kg</text>
        <text x="0" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">0m</text>
        <text x="100" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">3m</text>
        <text x="200" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">6m</text>
        <text x="300" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">9m</text>
        <text x="380" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">12m</text>
      </svg>
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(255,159,67,0.1)] border border-[rgba(255,159,67,0.2)] rounded-lg mt-3">
        <HeartPulse size={14} className="text-[#FF9F43] shrink-0" strokeWidth={1.75} />
        <span className="text-[#FF9F43] text-xs font-semibold">Preterm mode: INTERGROWTH-21st charts available</span>
      </div>
    </div>
  );
}
