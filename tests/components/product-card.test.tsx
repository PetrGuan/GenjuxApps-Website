import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

it("links each card to its integrated product site without rendering a screenshot", () => {
  render(<ProductCard index={3} product={products[2]} />);

  expect(screen.getByRole("link", { name: /discover bebilog/i })).toHaveAttribute("href", "/apps/bebilog");
  expect(screen.queryByRole("img", { name: /bebilog app screen/i })).not.toBeInTheDocument();
});

it("links the Nautilus card to its integrated product site", () => {
  render(<ProductCard index={4} product={products[3]} />);

  expect(screen.getByRole("link", { name: /discover nautilus/i })).toHaveAttribute(
    "href",
    "/apps/nautilus/index.html",
  );
});

it("shows the NeoWriter destination and its Apple platforms", () => {
  render(<ProductCard product={products[4]} />);

  expect(screen.getByRole("link", { name: /discover neowriter/i })).toHaveAttribute("href", "/apps/neowriter");
  expect(screen.getByText("Mac, iPhone & iPad")).toBeInTheDocument();
});

it("uses Chinese catalogue copy and the corresponding product route", () => {
  render(<ProductCard product={products[4]} locale="zh" />);
  expect(screen.getByRole("link", { name: "了解 NeoWriter" })).toHaveAttribute("href", "/zh/apps/neowriter");
  expect(screen.getByText("守住文字，写得流畅。")).toBeInTheDocument();
  expect(screen.getByText("效率")).toBeInTheDocument();
});
