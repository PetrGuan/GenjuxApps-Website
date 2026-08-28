import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

it("links each card to its integrated product site without rendering a screenshot", () => {
  render(<ProductCard index={2} product={products[1]} />);

  expect(screen.getByRole("link", { name: /discover bebilog/i })).toHaveAttribute("href", "/apps/bebilog");
  expect(screen.queryByRole("img", { name: /bebilog app screen/i })).not.toBeInTheDocument();
});

it("links the Nautilus card to its integrated product site", () => {
  render(<ProductCard index={3} product={products[2]} />);

  expect(screen.getByRole("link", { name: /discover nautilus/i })).toHaveAttribute(
    "href",
    "/apps/nautilus/index.html",
  );
});
