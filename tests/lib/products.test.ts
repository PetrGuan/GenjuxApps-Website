import { getProduct, productSlugs, products } from "@/lib/products";

it("exposes the five products in catalogue order", () => {
  expect(productSlugs).toEqual(["lumadio", "pixel-wonders", "bebilog", "nautilus", "neowriter"]);
  expect(products.map(({ name }) => name)).toEqual(["Lumadio", "Pixel Wonders", "Bebilog", "Nautilus", "NeoWriter"]);
});

it("routes each card to its integrated product site", () => {
  expect(getProduct("lumadio")?.route).toBe("/apps/lumadio");
  expect(getProduct("lumadio")?.appStoreUrl).toBe(
    "https://apps.apple.com/us/app/lumadio-monitor-app-audio/id6806239533",
  );
  expect(getProduct("bebilog")?.route).toBe("/apps/bebilog");
  expect(getProduct("nautilus")?.route).toBe("/apps/nautilus/index.html");
  expect(getProduct("pixel-wonders")?.route).toBe("/apps/pixel-wonders/index.html");
  expect(getProduct("neowriter")?.route).toBe("/apps/neowriter");
});

it("describes NeoWriter without inventing a store destination", () => {
  const product = getProduct("neowriter");
  expect(product?.platform).toBe("Native macOS, iOS & iPadOS");
  expect(product?.assets.icon).toBe("/apps/neowriter/app-icon.png");
  expect(product?.appStoreUrl).toBeUndefined();
  expect(product?.capabilities).toEqual(["Draft protection", "Fluid writing & reading", "Encrypted cloud vaults"]);
  expect(product?.description).toContain("optional on-device encryption");
});
