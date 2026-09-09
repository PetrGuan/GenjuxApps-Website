afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it.each([
  ["/", "/zh", "/"],
  ["/apps/neowriter/privacy", "/zh/apps/neowriter/privacy", "/apps/neowriter/privacy"],
  ["/apps/nautilus/index.html", "/zh/apps/nautilus/index.html", "/apps/nautilus/index.html"],
  ["/apps/bebilog/zh", "/zh/apps/bebilog", "/apps/bebilog"],
])("maps %s between explicit language URLs", async (path, chinese, english) => {
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
  vi.resetModules();
  const { localePath } = await import("@/i18n/routing.mjs");
  expect(localePath(path, "zh")).toBe(chinese);
  expect(localePath(chinese, "en")).toBe(english);
});

it("preserves query and fragment while applying a deployment prefix once", async () => {
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/GenjuxApps-Website");
  vi.resetModules();
  const { localePath, localizedHref } = await import("@/i18n/routing.mjs");
  const path = "/GenjuxApps-Website/apps/neowriter?source=home#encryption";
  expect(localePath(path, "zh")).toBe("/zh/apps/neowriter?source=home#encryption");
  expect(localizedHref(path, "zh")).toBe("/GenjuxApps-Website/zh/apps/neowriter?source=home#encryption");
  expect(localizedHref("/GenjuxApps-Website/zh/apps/neowriter", "en")).toBe("/GenjuxApps-Website/apps/neowriter");
});

it("does not localize external destinations or in-page fragments", async () => {
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
  vi.resetModules();
  const { localizedHref } = await import("@/i18n/routing.mjs");
  expect(localizedHref("https://apps.apple.com/us/app/example/id123", "zh")).toBe("https://apps.apple.com/us/app/example/id123");
  expect(localizedHref("mailto:hello@example.com", "zh")).toBe("mailto:hello@example.com");
  expect(localizedHref("#recovery", "zh")).toBe("#recovery");
  expect(localizedHref("/images/avatar.webp", "zh")).toBe("/images/avatar.webp");
  expect(localizedHref("/apps/neowriter/rss.xml", "zh")).toBe("/zh/apps/neowriter/rss.xml");
});
