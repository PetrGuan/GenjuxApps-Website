import { render, screen } from "@testing-library/react";
import StudioExperience from "@/components/studio-experience";

it("keeps the experience heading focused on studio context", () => {
  render(<StudioExperience />);

  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
