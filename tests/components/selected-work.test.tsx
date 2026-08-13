import { render, screen } from "@testing-library/react";
import SelectedWork from "@/components/selected-work";
import StudioContactCta from "@/components/studio-contact-cta";

it("routes Bebilog work to its integrated product site", () => {
  render(<SelectedWork />);

  expect(screen.getByRole("link", { name: /explore bebilog/i })).toHaveAttribute(
    "href",
    "/apps/bebilog",
  );
});

it("sends the studio closing CTA to contact", () => {
  render(<StudioContactCta />);

  expect(screen.getByRole("link", { name: /work with genjux/i })).toHaveAttribute("href", "/contact");
});
