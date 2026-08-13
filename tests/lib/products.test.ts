import { getProduct, productSlugs, products } from "@/lib/products";

it("exposes exactly the two public products", () => {
  expect(productSlugs).toEqual(["bebilog", "nautilus"]);
  expect(products.map(({ name }) => name)).toEqual(["Bebilog", "Nautilus"]);
});

it("routes each card to its integrated product site", () => {
  expect(getProduct("bebilog")?.route).toBe("/apps/bebilog");
  expect(getProduct("nautilus")?.route).toBe("/apps/nautilus/index.html");
});
