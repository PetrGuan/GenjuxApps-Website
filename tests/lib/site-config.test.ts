import { getSiteOrigin } from "@/lib/site-config";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it("requires an explicit origin instead of guessing a production domain", () => {
  vi.stubEnv("SITE_ORIGIN", "");
  expect(() => getSiteOrigin()).toThrow("SITE_ORIGIN is required");
});

it.each(["https://example.com", "http://localhost:3100", "http://127.0.0.1:3100"])(
  "accepts a public HTTPS or explicit local preview origin: %s",
  (origin) => {
    vi.stubEnv("SITE_ORIGIN", origin);
    expect(getSiteOrigin()).toBe(origin);
  },
);

it.each([
  "https://example.com/subdirectory",
  "https://example.com/?query=value",
  "https://example.com/#fragment",
  "https://user:password@example.com",
  "http://example.com",
])("rejects an invalid site origin: %s", (origin) => {
  vi.stubEnv("SITE_ORIGIN", origin);
  expect(() => getSiteOrigin()).toThrow("SITE_ORIGIN must be");
});

it("builds root-hosted absolute links", async () => {
  vi.stubEnv("SITE_ORIGIN", "https://example.com");
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
  vi.resetModules();
  const { absoluteSiteUrl } = await import("@/lib/site-config");
  expect(absoluteSiteUrl("/rss.xml")).toBe("https://example.com/rss.xml");
});

it("applies the repository base path exactly once to app-relative links", async () => {
  vi.stubEnv("SITE_ORIGIN", "https://example.com");
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/GenjuxApps-Website");
  vi.resetModules();
  const { absoluteSiteUrl } = await import("@/lib/site-config");
  expect(absoluteSiteUrl("/apps/lumadio/rss.xml")).toBe(
    "https://example.com/GenjuxApps-Website/apps/lumadio/rss.xml",
  );
});

it.each(["//other.example/feed", "https://other.example/feed", "/\\other.example/feed"])(
  "rejects a non-application-relative URL: %s",
  async (path) => {
    vi.stubEnv("SITE_ORIGIN", "https://example.com");
    const { absoluteSiteUrl } = await import("@/lib/site-config");
    expect(() => absoluteSiteUrl(path)).toThrow("Expected an application-relative URL");
  },
);
