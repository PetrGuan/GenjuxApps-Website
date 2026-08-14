import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductMatrix from "@/components/product-matrix";

it("filters the product matrix without inventing products", async () => {
  const user = userEvent.setup();

  render(<ProductMatrix />);

  await user.click(screen.getByRole("button", { name: "Utilities" }));
  expect(screen.getByRole("link", { name: /explore bebilog/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /explore nautilus/i })).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Games" }));
  expect(screen.getByText("No Genjux games are available yet.")).toBeInTheDocument();
});
