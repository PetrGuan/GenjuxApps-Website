import { render, screen } from "@testing-library/react";
import { LumadioHome } from "@/components/lumadio/lumadio-site";

it("presents truthful product, pricing, privacy, and support information", () => {
  render(<LumadioHome />);

  expect(screen.getByRole("heading", { name: /your displays/i })).toBeInTheDocument();
  expect(screen.getByText(/\$4\.99/)).toBeInTheDocument();
  expect(screen.getByText(/no subscription/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/apps/lumadio/privacy");
  expect(screen.getAllByRole("link", { name: "Support" })[0]).toHaveAttribute("href", "/apps/lumadio/support");
});