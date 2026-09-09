import { render, screen, within } from "@testing-library/react";
import SiteHeader from "@/components/site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/apps",
}));

it("exposes the complete main-site navigation and active section", () => {
  render(<SiteHeader />);

  const navigation = within(screen.getByRole("navigation", { name: "Primary navigation" }));
  for (const label of ["Apps", "About", "Blog", "Donate", "Supporters"]) {
    expect(navigation.getByRole("link", { name: label })).toHaveAttribute("href", `/${label.toLowerCase()}`);
  }
  expect(navigation.getByRole("link", { name: "Apps" })).toHaveAttribute("aria-current", "page");
  expect(navigation.getByRole("link", { name: "RSS feeds" })).toHaveAttribute("href", "/feeds");
  expect(navigation.getByRole("link", { name: "Email and contact" })).toHaveAttribute("href", "/contact");
});

it("keeps Chinese navigation and an explicit English language choice", () => {
  render(<SiteHeader locale="zh" />);
  const navigation = within(screen.getByRole("navigation", { name: "主导航" }));
  expect(navigation.getByRole("link", { name: "应用" })).toHaveAttribute("href", "/zh/apps");
  const language = within(screen.getByRole("navigation", { name: "网站语言" }));
  expect(language.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/apps");
  expect(language.getByRole("link", { name: "中文" })).toHaveAttribute("aria-current", "page");
});
