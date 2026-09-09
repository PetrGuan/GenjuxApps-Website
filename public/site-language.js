(() => {
  const storageKey = "genjuxapps.locale";
  function readChoice() {
    try {
      const choice = localStorage.getItem(storageKey);
      if (choice === null || choice === "en" || choice === "zh") return choice;
      console.warn("Ignoring an unsupported saved language preference.");
      return null;
    }
    catch (error) {
      if (!(error instanceof DOMException)) throw error;
      console.warn("Language preference storage is unavailable.", error);
      return null;
    }
  }
  function saveChoice(locale) {
    try { localStorage.setItem(storageKey, locale); }
    catch (error) {
      if (!(error instanceof DOMException)) throw error;
      console.warn("The language choice could not be remembered.", error);
    }
  }
  function localDestination(href) {
    const target = new URL(href, document.baseURI);
    return `${location.origin}${target.pathname}${location.search}${location.hash}`;
  }
  function alternate(locale) {
    return document.querySelector(`link[rel="alternate"][hreflang="${locale === "zh" ? "zh-Hans" : "en"}"]`)?.getAttribute("href");
  }
  function restoreChoice() {
    const legacy = location.pathname.match(/\/apps\/bebilog\/(en|zh)\/?$/);
    if (legacy) {
      const href = alternate(legacy[1]);
      if (!href) return false;
      saveChoice(legacy[1]);
      const target = localDestination(href);
      if (target !== location.href) location.replace(target);
      return true;
    }
    if (document.documentElement.lang.startsWith("zh")) {
      saveChoice("zh");
      return true;
    }
    if (readChoice() !== "zh") return true;
    const href = alternate("zh");
    if (!href) return false;
    const target = localDestination(href);
    if (target !== location.href) location.replace(target);
    return true;
  }
  if (!restoreChoice()) {
    const observer = new MutationObserver(() => {
      if (restoreChoice()) observer.disconnect();
    });
    observer.observe(document.head, { childList: true, subtree: true });
    document.addEventListener("DOMContentLoaded", () => {
      restoreChoice();
      observer.disconnect();
    }, { once: true });
  }
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[data-site-locale]");
    if (!link) return;
    const locale = link.getAttribute("data-site-locale");
    if (locale !== "en" && locale !== "zh") return;
    saveChoice(locale);
    link.href = localDestination(link.getAttribute("href"));
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      if (link.href !== location.href) location.assign(link.href);
    }
  }, true);
})();
