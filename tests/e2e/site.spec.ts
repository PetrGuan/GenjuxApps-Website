import { expect, test } from "@playwright/test";

test("visitors can open the product explorer and reach each product page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /open product command palette/i }).click();

  const dialog = page.getByRole("dialog", { name: /product explorer/i });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: /bebilog/i }).click();

  await expect(page).toHaveURL(/\/apps\/bebilog$/);
  await expect(page.getByRole("heading", { name: "Bebilog" })).toBeVisible();
});

test("the home page exposes all primary landmark destinations", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: /explore nautilus/i })).toBeVisible();
});

test("the mobile navigation starts closed and can be opened", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "Products" })).not.toBeVisible();

  await page.getByText("Menu", { exact: true }).click();
  await expect(navigation.getByRole("link", { name: "Products" })).toBeVisible();
});
