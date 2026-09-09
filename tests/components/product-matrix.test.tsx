import { render, screen } from "@testing-library/react";
import ProductMatrix from "@/components/product-matrix";

it("presents each available product without empty categories", () => {
  render(<ProductMatrix />);

  expect(screen.getByRole("link", { name: /discover lumadio/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /discover bebilog/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /discover nautilus/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /discover pixel wonders/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /discover neowriter/i })).toHaveAttribute("href", "/apps/neowriter");
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
