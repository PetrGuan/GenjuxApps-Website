import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

it("links each card to its product route and labels its artwork", () => {
  render(<ProductCard product={products[0]} />);

  expect(screen.getByRole("link", { name: /explore bebilog/i })).toHaveAttribute("href", "/apps/bebilog");
  expect(screen.getByRole("img", { name: /bebilog app screen/i })).toBeInTheDocument();
});
