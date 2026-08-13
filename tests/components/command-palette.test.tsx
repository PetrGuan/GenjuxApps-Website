import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommandPalette from "@/components/command-palette";

function PaletteHarness() {
  const [open, setOpen] = useState(true);
  return <CommandPalette open={open} onOpenChange={setOpen} />;
}

it("opens, focuses product choices, and closes with Escape", async () => {
  const user = userEvent.setup();
  render(<PaletteHarness />);

  expect(screen.getByRole("dialog", { name: /product explorer/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /bebilog/i })).toHaveFocus();

  await user.keyboard("{Escape}");

  expect(screen.queryByRole("dialog", { name: /product explorer/i })).not.toBeInTheDocument();
});
