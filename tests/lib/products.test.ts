import { getProduct, productSlugs, products } from "@/lib/products";

it("exposes exactly the four public products", () => {
  expect(productSlugs).toEqual(["lumadio", "pixel-wonders", "bebilog", "nautilus"]);
  expect(products.map(({ name }) => name)).toEqual(["Lumadio", "Pixel Wonders", "Bebilog", "Nautilus"]);
});

it("routes each card to its integrated product site", () => {
  expect(getProduct("lumadio")?.route).toBe("/apps/lumadio");
  expect(getProduct("bebilog")?.route).toBe("/apps/bebilog");
  expect(getProduct("nautilus")?.route).toBe("/apps/nautilus/index.html");
  expect(getProduct("pixel-wonders")?.route).toBe("/apps/pixel-wonders/index.html");
});
