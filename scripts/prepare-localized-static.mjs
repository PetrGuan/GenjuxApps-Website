import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { englishPath, localizedHref, withBasePath } from "../i18n/routing.mjs";

const origin = "https://static.genjux.invalid";
const pages = [
  ["nautilus", "index.html"],
  ["nautilus", "editions.html"],
  ["pixel-wonders", "index.html"],
  ["pixel-wonders", "privacy.html"],
  ["pixel-wonders", "support.html"],
  ["pixel-wonders", "data-practices.html"],
];
const textualAttributes = ["alt", "aria-label", "title"];

function normalizeText(value) {
  return value.replace(/\s+/gu, " ").trim();
}

function localUrl(value, baseUrl) {
  if (!value || value.startsWith("//")) return null;
  const url = new URL(value, baseUrl);
  return url.origin === origin ? url : null;
}

function localizedUrl(url, locale) {
  return localizedHref(
    `${englishPath(url.pathname)}${url.search}${url.hash}`,
    locale,
  );
}

function assetUrl(url) {
  return `${withBasePath(url.pathname)}${url.search}${url.hash}`;
}

async function preparePage(slug, filename) {
  const sourcePath = path.join("public", "apps", slug, filename);
  const dictionaryPath = path.join(
    "i18n",
    "static",
    "zh",
    "apps",
    slug,
    `${filename}.json`,
  );
  const source = await readFile(sourcePath, "utf8");
  const dictionary = JSON.parse(await readFile(dictionaryPath, "utf8"));
  const sourceRoute = `/apps/${slug}/${filename}`;

  if (dictionary.source !== sourceRoute) {
    throw new Error(
      `${dictionaryPath}: expected source ${sourceRoute}, received ${dictionary.source}`,
    );
  }

  const translations = new Map(Object.entries(dictionary.translations ?? {}));
  const usedTranslations = new Set();
  const missingTranslations = new Map();
  const dom = new JSDOM(source, { url: `${origin}${sourceRoute}` });
  const { document, NodeFilter } = dom.window;
  const sourceBaseUrl = new URL(
    document.querySelector("base")?.getAttribute("href") ??
      sourceRoute.slice(0, sourceRoute.lastIndexOf("/") + 1),
    origin,
  );

  function translationFor(value, context) {
    const normalized = normalizeText(value);
    if (!normalized) return null;
    if (!translations.has(normalized)) {
      const contexts = missingTranslations.get(normalized) ?? [];
      contexts.push(context);
      missingTranslations.set(normalized, contexts);
      return null;
    }
    usedTranslations.add(normalized);
    return translations.get(normalized);
  }

  const walker = document.createTreeWalker(
    document.documentElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return /^(SCRIPT|STYLE|NOSCRIPT)$/u.test(
          node.parentElement?.tagName ?? "",
        )
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const translated = translationFor(
      node.data,
      `<${node.parentElement?.tagName.toLowerCase() ?? "unknown"}> text`,
    );
    if (translated === null) continue;
    const leading = node.data.match(/^\s*/u)?.[0] ?? "";
    const trailing = node.data.match(/\s*$/u)?.[0] ?? "";
    node.data = `${leading}${translated}${trailing}`;
  }

  for (const element of document.querySelectorAll(
    textualAttributes.map((attribute) => `[${attribute}]`).join(","),
  )) {
    for (const attribute of textualAttributes) {
      if (!element.hasAttribute(attribute)) continue;
      const value = element.getAttribute(attribute);
      const translated = translationFor(
        value,
        `<${element.tagName.toLowerCase()}> ${attribute}`,
      );
      if (translated !== null) element.setAttribute(attribute, translated);
    }
  }

  for (const meta of document.querySelectorAll(
    'meta[name="description"], meta[property="og:title"], meta[property="og:description"]',
  )) {
    const translated = translationFor(
      meta.getAttribute("content"),
      `<meta> content`,
    );
    if (translated !== null) meta.setAttribute("content", translated);
  }

  if (missingTranslations.size > 0) {
    const details = [...missingTranslations]
      .map(
        ([value, contexts]) =>
          `  ${JSON.stringify(value)} (${[...new Set(contexts)].join(", ")})`,
      )
      .join("\n");
    throw new Error(`Missing translations in ${dictionaryPath}:\n${details}`);
  }

  const unusedTranslations = [...translations.keys()].filter(
    (value) => !usedTranslations.has(value),
  );
  if (unusedTranslations.length > 0) {
    throw new Error(
      `Unused translations in ${dictionaryPath}:\n${unusedTranslations
        .map((value) => `  ${JSON.stringify(value)}`)
        .join("\n")}`,
    );
  }

  for (const override of dictionary.assetOverrides ?? []) {
    if (!override.selector || !override.attribute || !override.path) {
      throw new Error(`${dictionaryPath}: invalid asset override`);
    }
    const matches = document.querySelectorAll(override.selector);
    if (matches.length === 0) {
      throw new Error(
        `${dictionaryPath}: asset override selector matched nothing: ${override.selector}`,
      );
    }
    for (const element of matches) {
      element.setAttribute(override.attribute, override.path);
    }
  }

  document.documentElement.lang = "zh-Hans";

  for (const link of document.querySelectorAll('link[rel="alternate"]')) {
    const hreflang = link.getAttribute("hreflang");
    const locale = hreflang === "zh-Hans" ? "zh" : "en";
    link.setAttribute("href", localizedHref(sourceRoute, locale));
  }
  for (const link of document.querySelectorAll('link[rel="canonical"]')) {
    link.setAttribute("href", localizedHref(sourceRoute, "zh"));
  }

  for (const anchor of document.querySelectorAll("a[href]")) {
    const original = anchor.getAttribute("href");
    if (original.startsWith("#")) {
      anchor.setAttribute(
        "href",
        `${localizedHref(sourceRoute, "zh")}${original}`,
      );
      continue;
    }
    const url = localUrl(original, sourceBaseUrl);
    if (!url) continue;
    const selectedLocale = anchor.getAttribute("data-site-locale");
    anchor.setAttribute(
      "href",
      localizedUrl(url, selectedLocale === "en" ? "en" : "zh"),
    );
  }

  for (const switchLink of document.querySelectorAll("[data-site-locale]")) {
    switchLink.removeAttribute("aria-current");
  }
  document
    .querySelector('[data-site-locale="zh"]')
    ?.setAttribute("aria-current", "page");

  for (const element of document.querySelectorAll(
    "img[src], script[src], source[src], video[poster]",
  )) {
    const attribute = element.hasAttribute("poster") ? "poster" : "src";
    const url = localUrl(element.getAttribute(attribute), sourceBaseUrl);
    if (url) element.setAttribute(attribute, assetUrl(url));
  }

  for (const link of document.querySelectorAll(
    'link[rel~="stylesheet"], link[rel~="icon"], link[rel="apple-touch-icon"]',
  )) {
    const url = localUrl(link.getAttribute("href"), sourceBaseUrl);
    if (url) link.setAttribute("href", assetUrl(url));
  }

  for (const meta of document.querySelectorAll('meta[property="og:image"]')) {
    const url = localUrl(meta.getAttribute("content"), sourceBaseUrl);
    if (url) meta.setAttribute("content", assetUrl(url));
  }

  document.querySelector("base")?.remove();

  const outputPath = path.join("public", "zh", "apps", slug, filename);
  await mkdir(path.dirname(outputPath), { recursive: true });
  const output = dom
    .serialize()
    .replace(
      /<html\b/u,
      "<!-- Generated by scripts/prepare-localized-static.mjs; do not edit. -->\n<html",
    );
  await writeFile(outputPath, `${output.trimEnd()}\n`);
  console.log(`Generated ${outputPath}`);
}

for (const [slug, filename] of pages) {
  await preparePage(slug, filename);
}
