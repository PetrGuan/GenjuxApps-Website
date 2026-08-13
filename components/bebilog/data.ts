import enMessages from "./messages/en.json";
import zhMessages from "./messages/zh.json";

export const supportedBebilogLocales = ["en", "zh"] as const;

export type BebilogLocale = (typeof supportedBebilogLocales)[number];

export const bebilogMessages = {
  en: enMessages,
  zh: zhMessages,
} as const;

export const COLORS = {
  brand: "#FF6B6B",
  feed: "#FFC832",
  sleep: "#AF82FF",
  diaper: "#E682E6",
  growth: "#50C878",
  temp: "#FF8791",
  vaccine: "#FF453A",
  medicine: "#B48CFF",
  food: "#FF9F43",
  appointment: "#32ADE6",
} as const;

export type FeatureKey =
  | "smartLog"
  | "tracking"
  | "insights"
  | "predictions"
  | "growth"
  | "vaccine"
  | "food";

export type FeatureConfig = {
  key: FeatureKey;
  color: string;
  colorRgb: string;
  gradientTo: string;
  bgTint: string;
  layout: "text-left" | "text-right";
};

export const FEATURES: FeatureConfig[] = [
  {
    key: "smartLog",
    color: "#5AC8FA",
    colorRgb: "90,200,250",
    gradientTo: "#AF82FF",
    bgTint: "#0a0c14",
    layout: "text-left",
  },
  {
    key: "tracking",
    color: COLORS.brand,
    colorRgb: "255,107,107",
    gradientTo: COLORS.feed,
    bgTint: "#0a0a0a",
    layout: "text-right",
  },
  {
    key: "insights",
    color: COLORS.growth,
    colorRgb: "80,200,120",
    gradientTo: COLORS.appointment,
    bgTint: "#0a0f0a",
    layout: "text-left",
  },
  {
    key: "predictions",
    color: COLORS.sleep,
    colorRgb: "175,130,255",
    gradientTo: COLORS.feed,
    bgTint: "#0f0a14",
    layout: "text-right",
  },
  {
    key: "growth",
    color: COLORS.growth,
    colorRgb: "80,200,120",
    gradientTo: "#80E0A0",
    bgTint: "#0a100a",
    layout: "text-left",
  },
  {
    key: "vaccine",
    color: COLORS.vaccine,
    colorRgb: "255,69,58",
    gradientTo: COLORS.brand,
    bgTint: "#140a0a",
    layout: "text-right",
  },
  {
    key: "food",
    color: COLORS.food,
    colorRgb: "255,159,67",
    gradientTo: COLORS.feed,
    bgTint: "#14100a",
    layout: "text-left",
  },
];

export const GRID_ITEMS = [
  { key: "multiBaby", iconName: "Users" },
  { key: "appleWatch", iconName: "Watch" },
  { key: "siri", iconName: "Mic" },
  { key: "widget", iconName: "LayoutGrid" },
  { key: "wholeBrain", iconName: "Brain" },
  { key: "earlyEd", iconName: "GraduationCap" },
  { key: "doctorReport", iconName: "FileText" },
  { key: "languages", iconName: "Globe" },
  { key: "preterm", iconName: "HeartPulse" },
  { key: "alerts", iconName: "Bell" },
  { key: "icloud", iconName: "Cloud" },
  { key: "piggyBank", iconName: "PiggyBank" },
] as const;

export const RECORD_TYPES = [
  { key: "feed", iconName: "Baby", color: COLORS.feed, colorRgb: "255,200,50" },
  { key: "sleep", iconName: "Moon", color: COLORS.sleep, colorRgb: "175,130,255" },
  { key: "diaper", iconName: "Droplets", color: COLORS.diaper, colorRgb: "230,130,230" },
  { key: "growth", iconName: "TrendingUp", color: COLORS.growth, colorRgb: "80,200,120" },
  { key: "temp", iconName: "Thermometer", color: COLORS.temp, colorRgb: "255,135,145" },
  { key: "vaccine", iconName: "Syringe", color: COLORS.vaccine, colorRgb: "255,69,58" },
  { key: "medicine", iconName: "Pill", color: COLORS.medicine, colorRgb: "180,140,255" },
  { key: "food", iconName: "UtensilsCrossed", color: COLORS.food, colorRgb: "255,159,67" },
  { key: "appointment", iconName: "CalendarDays", color: COLORS.appointment, colorRgb: "50,173,230" },
  { key: "pumping", iconName: "Milk", color: "#64C8F0", colorRgb: "100,200,240" },
  { key: "milestone", iconName: "Star", color: "#C878FF", colorRgb: "200,120,255" },
  { key: "photo", iconName: "Camera", color: "#FFCC00", colorRgb: "255,204,0" },
] as const;

export const APP_STORE_URL = "https://apps.apple.com/us/app/bebilog-baby-tracker/id6759827652";
