import { render, screen } from "@testing-library/react";
import StudioLayout from "@/app/(studio)/layout";

it("keeps Genjux chrome inside the studio route group", () => {
  render(<StudioLayout>Studio content</StudioLayout>);

  expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
  expect(screen.getByText("Studio content")).toBeInTheDocument();
});
