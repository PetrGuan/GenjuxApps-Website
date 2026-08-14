import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(studio)/page";

it("places the full Genjux studio portrait in the home hero", () => {
  render(<HomePage />);

  expect(screen.getByRole("img", { name: "Genjux studio portrait" })).toHaveAttribute(
    "src",
    expect.stringContaining("avatar.jpg"),
  );
});
