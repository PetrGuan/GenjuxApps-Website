import { Carrot, Banana, Egg, Nut, MilkOff, Wheat, Fish } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MEALS = [
  { icon: Carrot, name: "Carrot + Rice Porridge", desc: "Lunch · Grains + Vegetables" },
  { icon: Banana, name: "Banana Mash", desc: "Snack · Fruits" },
];

type AllergenStatus = "safe" | "testing" | "pending";

const ALLERGENS: { icon: LucideIcon; name: string; status: AllergenStatus }[] = [
  { icon: Egg, name: "Egg", status: "safe" },
  { icon: Nut, name: "Peanut", status: "safe" },
  { icon: MilkOff, name: "Dairy", status: "testing" },
  { icon: Wheat, name: "Wheat", status: "pending" },
  { icon: Fish, name: "Fish", status: "pending" },
];

const ALLERGEN_STYLES = {
  safe: { bg: "rgba(80,200,120,0.12)", border: "rgba(80,200,120,0.2)", color: "#50C878", suffix: " ✓" },
  testing: { bg: "rgba(255,200,50,0.12)", border: "rgba(255,200,50,0.2)", color: "#FFC832", suffix: " ⏳" },
  pending: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", suffix: "" },
};

export default function BabyFoodHub() {
  return (
    <div className="bg-[rgba(255,159,67,0.04)] border border-[rgba(255,159,67,0.1)] rounded-2xl p-6">
      <div className="text-white text-sm font-semibold mb-1">Today&apos;s Meal Plan</div>
      <div className="text-white/40 text-xs mb-4">8-10 months stage</div>
      <div className="flex flex-col gap-2 mb-4">
        {MEALS.map((meal, i) => {
          const Icon = meal.icon;
          return (
            <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-[rgba(255,159,67,0.08)] rounded-xl">
              <Icon size={18} className="text-[#FF9F43] shrink-0" strokeWidth={1.75} />
              <div>
                <div className="text-white text-xs font-semibold">{meal.name}</div>
                <div className="text-white/40 text-[10px]">{meal.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-white/50 text-xs font-semibold mb-2">Allergen Status</div>
      <div className="flex gap-1.5 flex-wrap">
        {ALLERGENS.map((a, i) => {
          const style = ALLERGEN_STYLES[a.status];
          const Icon = a.icon;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] border"
              style={{ background: style.bg, borderColor: style.border, color: style.color }}
            >
              <Icon size={11} strokeWidth={1.75} />
              {a.name}{style.suffix}
            </span>
          );
        })}
      </div>
    </div>
  );
}
