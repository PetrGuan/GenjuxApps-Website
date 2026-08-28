import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(catalog)/page";

it("presents the product catalogue without personal material", () => {
  render(<HomePage />);

  expect(screen.getByRole("heading", { name: /who makes software/i })).toBeInTheDocument();
  expect(screen.queryByText(/experience|open-source|contact/i)).not.toBeInTheDocument();
});
