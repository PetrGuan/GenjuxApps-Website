import { bebilogMessages, supportedBebilogLocales } from "@/components/bebilog/data";

it("keeps English as the default product language", () => {
  expect(supportedBebilogLocales).toEqual(["en", "zh"]);
  expect(bebilogMessages.en.hero.titleLine1).toContain("Baby");
  expect(bebilogMessages.zh.hero.titleLine1).toContain("宝宝");
});
