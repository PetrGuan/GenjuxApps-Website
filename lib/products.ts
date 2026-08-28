export type ProductCategory = "Games" | "Productivity" | "Utilities";

export type Product = {
  slug: "bebilog" | "nautilus" | "pixel-wonders";
  name: string;
  route: "/apps/bebilog" | "/apps/nautilus/index.html" | "/apps/pixel-wonders/index.html";
  appStoreUrl?: string;
  platform: "iPhone game" | "Native iOS" | "Native iOS & iPadOS";
  category: ProductCategory;
  tagline: string;
  description: string;
  capabilities: readonly string[];
  accent: "amber" | "coral" | "moss";
  assets: {
    icon: string;
    appStoreBadge?: string;
  };
};

export const products: readonly Product[] = [
  {
    slug: "pixel-wonders",
    name: "Pixel Wonders",
    route: "/apps/pixel-wonders/index.html",
    platform: "iPhone game",
    category: "Games",
    tagline: "Observe closely. Paint from memory.",
    description:
      "A quiet nature game about observing pixels, painting from memory, and collecting the story of each species.",
    capabilities: ["Observe", "Paint from memory", "Collect species"],
    accent: "moss",
    assets: {
      icon: "/apps/pixel-wonders/assets/app-icon.png",
    },
  },
  {
    slug: "bebilog",
    name: "Bebilog",
    route: "/apps/bebilog",
    appStoreUrl: "https://apps.apple.com/us/app/bebilog-baby-tracker/id6759827652",
    platform: "Native iOS",
    category: "Utilities",
    tagline: "Baby tracking, made calm.",
    description:
      "A privacy-first baby tracker for feeding, sleep, growth, vaccines, and everyday care — with on-device intelligence that turns quick notes into useful records.",
    capabilities: ["On-device Smart Log", "12 record types", "Private by design"],
    accent: "coral",
    assets: {
      icon: "/products/bebilog/app-icon.png",
      appStoreBadge: "/products/bebilog/app-store-badge.svg",
    },
  },
  {
    slug: "nautilus",
    name: "Nautilus",
    route: "/apps/nautilus/index.html",
    appStoreUrl: "https://apps.apple.com/us/app/nautilus-tech-news-reader/id6787639053",
    platform: "Native iOS & iPadOS",
    category: "Productivity",
    tagline: "A quieter way to read Hacker News.",
    description:
      "A native reading room for Hacker News, with on-device thread summaries, private briefings, offline reading, Story Rules, and Radar watchlists.",
    capabilities: ["On-device AI", "Private Briefing", "Offline reading"],
    accent: "amber",
    assets: {
      icon: "/products/nautilus/app-icon.png",
      appStoreBadge: "/products/nautilus/app-store-badge.svg",
    },
  },
];

export const productSlugs = products.map(({ slug }) => slug);

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
