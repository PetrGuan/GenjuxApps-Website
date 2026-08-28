import { getProduct, productSlugs, products } from "@/lib/products";

it("exposes exactly the three public products", () => {
  expect(productSlugs).toEqual(["pixel-wonders", "bebilog", "nautilus"]);
  expect(products.map(({ name }) => name)).toEqual(["Pixel Wonders", "Bebilog", "Nautilus"]);
});

it("routes each card to its integrated product site", () => {
  expect(getProduct("bebilog")?.route).toBe("/apps/bebilog");
  expect(getProduct("nautilus")?.route).toBe("/apps/nautilus/index.html");
  expect(getProduct("pixel-wonders")?.route).toBe("/apps/pixel-wonders/index.html");
});
