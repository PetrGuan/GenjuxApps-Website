export type Product = {
  slug: "bebilog" | "nautilus";
  name: string;
  route: `/apps/${string}`;
  appStoreUrl: string;
  platform: "Native iOS" | "Native iOS & iPadOS";
  tagline: string;
  description: string;
  capabilities: readonly string[];
  accent: "coral" | "amber";
  assets: {
    icon: string;
    hero: string;
    appStoreBadge: string;
  };
};

export const products: readonly Product[] = [
  {
    slug: "bebilog",
    name: "Bebilog",
    route: "/apps/bebilog",
    appStoreUrl: "https://apps.apple.com/us/app/bebilog-baby-tracker/id6759827652",
    platform: "Native iOS",
    tagline: "Baby tracking, made calm.",
    description:
      "A privacy-first baby tracker for feeding, sleep, growth, vaccines, and everyday care — with on-device intelligence that turns quick notes into useful records.",
    capabilities: ["On-device Smart Log", "12 record types", "Private by design"],
    accent: "coral",
    assets: {
      icon: "/products/bebilog/app-icon.png",
      hero: "/products/bebilog/home.png",
      appStoreBadge: "/products/bebilog/app-store-badge.svg",
    },
  },
  {
    slug: "nautilus",
    name: "Nautilus",
    route: "/apps/nautilus",
    appStoreUrl: "https://apps.apple.com/us/app/nautilus-tech-news-reader/id6787639053",
    platform: "Native iOS & iPadOS",
    tagline: "A quieter way to read Hacker News.",
    description:
      "A native reading room for Hacker News, with on-device thread summaries, private briefings, offline reading, Story Rules, and Radar watchlists.",
    capabilities: ["On-device AI", "Private Briefing", "Offline reading"],
    accent: "amber",
    assets: {
      icon: "/products/nautilus/app-icon.png",
      hero: "/products/nautilus/home.jpg",
      appStoreBadge: "/products/nautilus/app-store-badge.svg",
    },
  },
];

export const productSlugs = products.map(({ slug }) => slug);

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
