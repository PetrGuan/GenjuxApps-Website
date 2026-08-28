import { expect, test } from "@playwright/test";

test("product catalogue presents only its available apps", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /who makes software/i })).toBeVisible();
  await expect(page.locator(".product-grid")).toBeVisible();
  await expect(page.getByRole("link", { name: /discover bebilog/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /discover nautilus/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /discover pixel wonders/i })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/experience|open-source|contact/i);
});

test("Bebilog card opens the complete English Bebilog site", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /discover bebilog/i }).click();

  await expect(page).toHaveURL(/\/apps\/bebilog$/);
  await expect(page.getByRole("heading", { name: /baby tracking/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).not.toBeVisible();
});

test("the home page exposes all primary landmark destinations", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: /discover nautilus/i })).toBeVisible();
});

test("Nautilus card opens the complete Nautilus site and its Editions route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /discover nautilus/i }).click();

  await expect(page).toHaveURL(/\/apps\/nautilus\/index\.html$/);
  await expect(page.getByRole("heading", { name: /quiet, beautiful reading room/i })).toBeVisible();
  await page.getByRole("link", { name: /full editions design language/i }).click();
  await expect(page).toHaveURL(/\/apps\/nautilus\/editions\.html$/);
});

test("Pixel Wonders card opens the complete product site", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /discover pixel wonders/i }).click();

  await expect(page).toHaveURL(/\/apps\/pixel-wonders(?:\/|$)/);
  await expect(page.getByRole("heading", { name: /look closer/i })).toBeVisible();
});

test("each product site offers a return path to Genjux", async ({ page }) => {
  await page.goto("/apps/bebilog");
  await page.getByRole("link", { name: /back to genjux/i }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/apps/nautilus/index.html");
  await page.getByRole("link", { name: /back to genjux/i }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/apps/pixel-wonders/index.html");
  await page.getByRole("link", { name: /back to genjux/i }).click();
  await expect(page).toHaveURL(/\/$/);
});
