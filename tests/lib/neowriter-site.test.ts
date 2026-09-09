afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it.each(["privacy", "terms", "support"] as const)("sets distinct metadata for the %s page", async (page) => {
  vi.stubEnv("SITE_ORIGIN", "https://example.com");
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
  vi.resetModules();
  const { neoWriterMetadata } = await import("@/components/neowriter/site");
  const metadata = neoWriterMetadata(`NeoWriter ${page}`, "Page description", page);
  expect(metadata.title).toBe(`NeoWriter ${page}`);
  expect(metadata.alternates?.canonical).toBe(`https://example.com/apps/neowriter/${page}`);
});

it("uses the deployment base path once for document and feed URLs", async () => {
  vi.stubEnv("SITE_ORIGIN", "https://example.com");
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/GenjuxApps-Website");
  vi.resetModules();
  const { neoWriterMetadata } = await import("@/components/neowriter/site");
  const metadata = neoWriterMetadata("Privacy Policy", "Description", "privacy");
  expect(metadata.alternates?.canonical).toBe("https://example.com/GenjuxApps-Website/apps/neowriter/privacy");
  expect(metadata.alternates?.types?.["application/rss+xml"]).toEqual([
    { title: "NeoWriter release notes", url: "https://example.com/GenjuxApps-Website/apps/neowriter/rss.xml" },
  ]);
});

it("encodes the subject of a voluntary support email", async () => {
  const { neoWriterContactHref } = await import("@/components/neowriter/site");
  const href = new URL(neoWriterContactHref("NeoWriter privacy & support"));
  expect(href.protocol).toBe("mailto:");
  expect(href.searchParams.get("subject")).toBe("NeoWriter privacy & support");
});
