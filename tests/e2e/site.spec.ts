import { expect, test } from "@playwright/test";

test("Dark Precision portal presents categorized Bento products", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Genjux", exact: true })).toBeVisible();
  await expect(page.getByRole("group", { name: "Product categories" })).toBeVisible();
  await expect(page.locator(".precision-product-grid")).toBeVisible();
  await expect(page.getByRole("heading", { name: /experience behind genjux/i })).toBeVisible();
});

test("product cards reveal complete previews on hover", async ({ page }) => {
  await page.goto("/");

  const bebilogBox = await page.locator('[data-product="bebilog"] .product-card').boundingBox();
  const nautilusBox = await page.locator('[data-product="nautilus"] .product-card').boundingBox();
  const bebilogCard = page.locator('[data-product="bebilog"] .product-card');
  const bebilogArtwork = page.locator('[data-product="bebilog"] .product-artwork');

  expect(bebilogBox).not.toBeNull();
  expect(nautilusBox).not.toBeNull();
  expect(Math.abs(bebilogBox!.width - nautilusBox!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(bebilogBox!.height - nautilusBox!.height)).toBeLessThanOrEqual(1);
  await expect(bebilogArtwork).toHaveCSS("opacity", "0");
  await expect(bebilogArtwork.locator("img")).toHaveCSS("object-fit", "contain");

  await bebilogCard.hover();
  await expect(bebilogArtwork).toHaveCSS("opacity", "1");
});

test("contact panel uses a restrained tonal surface", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".studio-contact-panel")).toHaveCSS("background-color", "rgb(19, 24, 30)");
});

test("home page presents focused Genjux studio content without selected work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /studio capabilities/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /selected work/i })).toHaveCount(0);
  await expect(page.getByText("Microsoft experience behind Genjux", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /experience behind genjux/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /open-source contributions/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /work with genjux/i })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/Petr|Guan|petrguan/i);
});

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

test("each product site offers a return path to Genjux", async ({ page }) => {
  await page.goto("/apps/bebilog");
  await page.getByRole("link", { name: /back to genjux/i }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/apps/nautilus/index.html");
  await page.getByRole("link", { name: /back to genjux/i }).click();
  await expect(page).toHaveURL(/\/$/);
});
