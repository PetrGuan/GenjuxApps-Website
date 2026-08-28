import { render, screen } from "@testing-library/react";
import SiteFooter from "@/components/site-footer";

it("identifies the product catalogue in the shared footer", () => {
  render(<SiteFooter />);

  expect(screen.getByText(/Genjux/i)).toBeInTheDocument();
});
