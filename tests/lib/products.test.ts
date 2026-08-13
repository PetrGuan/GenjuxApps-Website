import { getProduct, productSlugs, products } from "@/lib/products";

it("exposes exactly the two public products", () => {
  expect(productSlugs).toEqual(["bebilog", "nautilus"]);
  expect(products.map(({ name }) => name)).toEqual(["Bebilog", "Nautilus"]);
});

it("returns a product only for a supported slug", () => {
  expect(getProduct("bebilog")?.route).toBe("/apps/bebilog");
  expect(getProduct("missing")).toBeUndefined();
});
