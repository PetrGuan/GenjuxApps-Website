import { render, screen } from "@testing-library/react";
import CatalogLayout from "@/app/(catalog)/layout";

it("keeps the catalogue shell around product content", () => {
  render(<CatalogLayout>Product content</CatalogLayout>);

  expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
  expect(screen.getByText("Product content")).toBeInTheDocument();
});
