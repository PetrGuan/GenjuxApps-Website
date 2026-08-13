import { render, screen } from "@testing-library/react";
import SiteHeader from "@/components/site-header";

it("renders each studio route", () => {
  render(<SiteHeader />);

  expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/#products");
  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  expect(screen.getByRole("link", { name: "Changelog" })).toHaveAttribute("href", "/changelog");
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
});
