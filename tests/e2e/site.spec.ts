import { expect, test } from "@playwright/test";

test("Bebilog card opens the complete English Bebilog site", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /explore bebilog/i }).click();

  await expect(page).toHaveURL(/\/apps\/bebilog$/);
  await expect(page.getByRole("heading", { name: /baby tracking/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).not.toBeVisible();
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

test("Nautilus card opens the complete Nautilus site and its Editions route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /explore nautilus/i }).click();

  await expect(page).toHaveURL(/\/apps\/nautilus\/index\.html$/);
  await expect(page.getByRole("heading", { name: /quiet, beautiful reading room/i })).toBeVisible();
  await page.getByRole("link", { name: /full editions design language/i }).click();
  await expect(page).toHaveURL(/\/apps\/nautilus\/editions\.html$/);
});
