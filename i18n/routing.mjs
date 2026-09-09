export const locales = Object.freeze(["en", "zh"]);
export const defaultLocale = "en";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path) {
  if (!path.startsWith("/")) throw new Error(`Site path must start with a slash: ${path}`);
  return `${basePath}${path}`;
}

export function stripBasePath(path) {
  if (basePath && (path === basePath || path.startsWith(`${basePath}/`))) {
    return path.slice(basePath.length) || "/";
  }
  return path;
}

export function pathLocale(path) {
  const pathname = stripBasePath(path.split(/[?#]/, 1)[0]);
  return /^\/zh(?:\/|$)/.test(pathname) || /^\/apps\/bebilog\/zh\/?$/.test(pathname) ? "zh" : "en";
}

export function englishPath(path) {
  let pathname = stripBasePath(path.split(/[?#]/, 1)[0]);
  pathname = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  pathname = pathname.replace(/^\/apps\/bebilog\/(?:en|zh)\/?$/, "/apps/bebilog");
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function localePath(path, locale) {
  if (!locales.includes(locale)) throw new Error(`Unsupported site locale: ${locale}`);
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const suffixIndex = path.search(/[?#]/);
  const suffix = suffixIndex < 0 ? "" : path.slice(suffixIndex);
  const canonical = englishPath(path);
  if (/\.[a-z0-9]+$/i.test(canonical) && !/\.(?:html|xml)$/i.test(canonical)) {
    return `${canonical}${suffix}`;
  }
  return `${locale === "zh" ? `/zh${canonical === "/" ? "" : canonical}` : canonical}${suffix}`;
}

export function localizedHref(path, locale) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return withBasePath(localePath(path, locale));
}

export function htmlLanguage(locale) {
  return locale === "zh" ? "zh-Hans" : "en";
}
