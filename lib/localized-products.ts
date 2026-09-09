import { localizedHref, type SiteLocale } from "@/i18n/routing.mjs";
import { products, type Product } from "@/lib/products";

const chinese: Record<Product["slug"], { tagline: string; description: string; capabilities: readonly string[] }> = {
  lumadio: { tagline: "显示与应用音频，一起掌控。", description: "一款专注的 Mac 菜单栏应用，将显示控制、各应用音频与场景整合在一起，一次操作恢复整套桌面设置。", capabilities: ["显示控制", "各应用音频", "场景与快捷指令"] },
  "pixel-wonders": { tagline: "仔细观察，凭记忆绘制。", description: "一款安静的自然观察游戏：观察像素，凭记忆绘制，收集每个物种的故事。", capabilities: ["观察", "凭记忆绘制", "收集物种"] },
  bebilog: { tagline: "从容记录宝宝的每一天。", description: "以隐私为先的宝宝记录应用，涵盖喂养、睡眠、成长、疫苗和日常护理，用设备端智能把简短笔记变成实用记录。", capabilities: ["设备端智能记录", "12 种记录类型", "隐私优先"] },
  nautilus: { tagline: "更安静地阅读 Hacker News。", description: "原生 Hacker News 阅读空间，提供设备端讨论摘要、私密简报、离线阅读、内容规则与 Radar 关注列表。", capabilities: ["设备端 AI", "私密简报", "离线阅读"] },
  neowriter: { tagline: "守住文字，写得流畅。", description: "草稿保护、原生读写体验，以及可选的设备端加密网盘 Vault 和备份。适用于 Mac、iPhone 和 iPad。", capabilities: ["草稿保护", "流畅读写", "加密网盘 Vault"] },
};

export function localizeProduct(product: Product, locale: SiteLocale = "en"): Product {
  return {
    ...product,
    ...(locale === "zh" ? chinese[product.slug] : {}),
    route: localizedHref(product.route, locale),
  };
}

export function localizedProducts(locale: SiteLocale = "en") {
  return products.map((product) => localizeProduct(product, locale));
}

export function categoryLabel(category: Product["category"], locale: SiteLocale) {
  return locale === "zh" ? { Games: "游戏", Productivity: "效率", Utilities: "实用工具" }[category] : category;
}

export function platformLabel(platform: Product["platform"], locale: SiteLocale) {
  const labels: Record<Product["platform"], [string, string]> = {
    "Native macOS": ["macOS", "macOS"],
    "Native iOS": ["iPhone", "iPhone"],
    "Native iOS & iPadOS": ["iPhone & iPad", "iPhone 与 iPad"],
    "Native macOS, iOS & iPadOS": ["Mac, iPhone & iPad", "Mac、iPhone 与 iPad"],
    "iPhone game": ["iPhone", "iPhone"],
  };
  return labels[platform][locale === "zh" ? 1 : 0];
}
