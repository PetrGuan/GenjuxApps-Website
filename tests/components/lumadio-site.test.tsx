import { render, screen } from "@testing-library/react";
import { LumadioHome } from "@/components/lumadio/lumadio-site";
import { getLumadioMetadata, renderLumadioPage } from "@/components/lumadio/pages";

vi.mock("next/navigation", () => ({
  usePathname: () => "/apps/lumadio",
}));

it("presents truthful product, pricing, privacy, and support information", () => {
  render(<LumadioHome />);

  expect(screen.getByRole("heading", { name: /your displays/i })).toBeInTheDocument();
  expect(screen.getByAltText("Lumadio app icon")).toHaveAttribute(
    "src",
    expect.stringContaining(encodeURIComponent("/apps/lumadio/app-icon.png")),
  );
  expect(screen.getByText(/\$4\.99/)).toBeInTheDocument();
  expect(screen.getByText(/no subscription/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/apps/lumadio/privacy");
  expect(screen.getAllByRole("link", { name: "Support" })[0]).toHaveAttribute("href", "/apps/lumadio/support");
  expect(screen.getByRole("navigation", { name: "Site language" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh/apps/lumadio");
});

it("links every download entry to the published Mac App Store listing", () => {
  render(<LumadioHome />);

  const links = screen.getAllByRole("link", { name: /Mac App Store|Get Lumadio/i });
  expect(links).toHaveLength(5);
  for (const link of links) {
    expect(link).toHaveAttribute(
      "href",
      "https://apps.apple.com/us/app/lumadio-monitor-app-audio/id6806239533",
    );
  }
  expect(screen.queryByText(/coming soon|coming to the Mac App Store|available at launch/i)).not.toBeInTheDocument();
});

it("renders complete Simplified Chinese product content with localized routes", () => {
  render(<LumadioHome locale="zh" />);

  expect(screen.getByRole("heading", { name: "你的显示器。 你的应用音频。 一个菜单栏。" })).toBeInTheDocument();
  expect(screen.getByText("显示器控制")).toBeInTheDocument();
  expect(screen.getByText("深度专注")).toBeInTheDocument();
  expect(screen.getByText(/\$4\.99/)).toBeInTheDocument();
  expect(screen.getByText(/价格以 USD 显示/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "隐私" })).toHaveAttribute("href", "/zh/apps/lumadio/privacy");
  expect(screen.getAllByRole("link", { name: "支持" })[0]).toHaveAttribute("href", "/zh/apps/lumadio/support");
  expect(screen.getByRole("navigation", { name: "网站语言" })).toBeInTheDocument();
});

it("localizes legal content, preference disclosure, and metadata", () => {
  const view = render(renderLumadioPage("privacy", "en"));

  expect(screen.getByText(/stores that preference locally/)).toHaveTextContent("genjuxapps.locale");
  view.rerender(renderLumadioPage("privacy", "zh"));
  expect(screen.getByRole("heading", { name: "隐私政策" })).toBeInTheDocument();
  expect(screen.getByText(/genjuxapps\.locale/)).toBeInTheDocument();
  expect(screen.getByText(/不属于 Lumadio 应用设置/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "条款" })).toHaveAttribute("href", "/zh/apps/lumadio/terms");

  vi.stubEnv("SITE_ORIGIN", "https://example.com");
  const metadata = getLumadioMetadata("support", "zh");
  expect(metadata.title).toBe("支持 — Lumadio");
  expect(metadata.alternates?.canonical).toContain("/zh/apps/lumadio/support");
  expect(metadata.alternates?.languages?.["zh-Hans"]).toContain("/zh/apps/lumadio/support");
  vi.unstubAllEnvs();
});

it("renders the Chinese terms and support pages", () => {
  const view = render(renderLumadioPage("terms", "zh"));

  expect(screen.getByRole("heading", { name: "使用条款" })).toBeInTheDocument();
  expect(screen.getByText(/非消耗型 App 内购买/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "《标准许可应用程序最终用户许可协议》" })).toHaveAttribute(
    "href",
    "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
  );

  view.rerender(renderLumadioPage("support", "zh"));
  expect(screen.getByRole("heading", { name: "需要什么帮助？" })).toBeInTheDocument();
  expect(screen.getByText(/macOS 14\.2 或更高版本/)).toBeInTheDocument();
  expect(screen.getByText(/支持目前提供英语和中文服务/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /发送支持邮件/ })).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:hello@genjux.com"),
  );
});