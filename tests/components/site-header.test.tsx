import { render, screen } from "@testing-library/react";
import SiteHeader from "@/components/site-header";

it("links directly to each product in the catalogue", () => {
  render(<SiteHeader />);

  expect(screen.getByRole("link", { name: "Bebilog" })).toHaveAttribute("href", "/#bebilog");
  expect(screen.getByRole("link", { name: "Nautilus" })).toHaveAttribute("href", "/#nautilus");
  expect(screen.getByRole("link", { name: "Pixel Wonders" })).toHaveAttribute("href", "/#pixel-wonders");
});
