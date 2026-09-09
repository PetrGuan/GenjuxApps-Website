import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(english)/(catalog)/page";

it("presents the introduction, a real featured app screen, and the compact app shelf", () => {
  render(<HomePage />);

  expect(screen.getByRole("heading", { name: "Genjux" })).toBeInTheDocument();
  expect(screen.getByText("Independent developer & app maker")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Apps" })).toHaveAttribute("href", "/apps");
  expect(screen.getByRole("link", { name: "Code" })).toHaveAttribute("href", "https://github.com/PetrGuan");
  expect(screen.queryByText("Code profile not configured yet.")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Featured app: Bebilog" })).toHaveAttribute("href", "/apps/bebilog");
  expect(screen.getByRole("img", { name: /Bebilog home screen/i })).toHaveAttribute("src", "/images/bebilog-home.webp");
  for (const name of ["Lumadio", "Pixel Wonders", "Bebilog", "Nautilus", "NeoWriter"]) {
    expect(screen.getByRole("link", { name: `Explore ${name}` })).toBeInTheDocument();
  }
});
