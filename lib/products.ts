import { withBasePath } from "@/lib/site-paths";

export type ProductCategory = "Games" | "Productivity" | "Utilities";

export type Product = {
  slug: "bebilog" | "lumadio" | "nautilus" | "neowriter" | "pixel-wonders";
  name: string;
  route: string;
  appStoreUrl?: string;
  platform: "iPhone game" | "Native iOS" | "Native iOS & iPadOS" | "Native macOS" | "Native macOS, iOS & iPadOS";
  category: ProductCategory;
  tagline: string;
  description: string;
  capabilities: readonly string[];
  accent: "amber" | "coral" | "moss" | "violet";
  assets: {
    icon: string;
    appStoreBadge?: string;
  };
};

export const products: readonly Product[] = [
  {
    slug: "lumadio",
    name: "Lumadio",
    route: withBasePath("/apps/lumadio"),
    appStoreUrl: "https://apps.apple.com/us/app/lumadio-monitor-app-audio/id6806239533",
    platform: "Native macOS",
    category: "Utilities",
    tagline: "Displays and app audio, together.",
    description:
      "A focused menu bar app for display controls, per-app audio, and scenes that bring your whole Mac setup back in one action.",
    capabilities: ["Display control", "Per-app audio", "Scenes & Shortcuts"],
    accent: "violet",
    assets: {
      icon: withBasePath("/apps/lumadio/app-icon.png"),
    },
  },
  {
    slug: "pixel-wonders",
    name: "Pixel Wonders",
    route: withBasePath("/apps/pixel-wonders/index.html"),
    platform: "iPhone game",
    category: "Games",
    tagline: "Observe closely. Paint from memory.",
    description:
      "A quiet nature game about observing pixels, painting from memory, and collecting the story of each species.",
    capabilities: ["Observe", "Paint from memory", "Collect species"],
    accent: "moss",
    assets: {
      icon: withBasePath("/apps/pixel-wonders/assets/app-icon.png"),
    },
  },
  {
    slug: "bebilog",
    name: "Bebilog",
    route: withBasePath("/apps/bebilog"),
    appStoreUrl: "https://apps.apple.com/us/app/bebilog-baby-tracker/id6759827652",
    platform: "Native iOS",
    category: "Utilities",
    tagline: "Baby tracking, made calm.",
    description:
      "A privacy-first baby tracker for feeding, sleep, growth, vaccines, and everyday care — with on-device intelligence that turns quick notes into useful records.",
    capabilities: ["On-device Smart Log", "12 record types", "Private by design"],
    accent: "coral",
    assets: {
      icon: withBasePath("/products/bebilog/app-icon.png"),
      appStoreBadge: withBasePath("/products/bebilog/app-store-badge.svg"),
    },
  },
  {
    slug: "nautilus",
    name: "Nautilus",
    route: withBasePath("/apps/nautilus/index.html"),
    appStoreUrl: "https://apps.apple.com/us/app/nautilus-tech-news-reader/id6787639053",
    platform: "Native iOS & iPadOS",
    category: "Productivity",
    tagline: "A quieter way to read Hacker News.",
    description:
      "A native reading room for Hacker News, with on-device thread summaries, private briefings, offline reading, Story Rules, and Radar watchlists.",
    capabilities: ["On-device AI", "Private Briefing", "Offline reading"],
    accent: "amber",
    assets: {
      icon: withBasePath("/products/nautilus/app-icon.png"),
      appStoreBadge: withBasePath("/products/nautilus/app-store-badge.svg"),
    },
  },
  {
    slug: "neowriter",
    name: "NeoWriter",
    route: withBasePath("/apps/neowriter"),
    platform: "Native macOS, iOS & iPadOS",
    category: "Productivity",
    tagline: "Protect your words. Find your flow.",
    description:
      "Draft-first protection, native writing and reading, and optional on-device encryption for cloud vaults and backups. For Mac, iPhone, and iPad.",
    capabilities: ["Draft protection", "Fluid writing & reading", "Encrypted cloud vaults"],
    accent: "amber",
    assets: {
      icon: withBasePath("/apps/neowriter/app-icon.png"),
    },
  },
];

export const productSlugs = products.map(({ slug }) => slug);

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
