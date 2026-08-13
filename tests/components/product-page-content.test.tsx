import { render, screen } from "@testing-library/react";
import ProductPageContent from "@/components/product-page-content";
import { products } from "@/lib/products";

it("uses the product facts and App Store destination", () => {
  render(<ProductPageContent product={products[1]} />);

  expect(screen.getByRole("heading", { name: "Nautilus" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /download nautilus on the app store/i })).toHaveAttribute(
    "href",
    products[1].appStoreUrl,
  );
});
