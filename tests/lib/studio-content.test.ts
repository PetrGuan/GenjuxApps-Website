import {
  openSourceContributions,
  studioCapabilities,
  studioExperience,
} from "@/lib/studio-content";

it("contains focused studio records without personal identity", () => {
  expect(studioCapabilities).toHaveLength(5);
  expect(studioExperience).toHaveLength(3);
  expect(openSourceContributions).toHaveLength(3);
  expect(
    JSON.stringify({
      studioCapabilities,
      studioExperience,
      openSourceContributions,
    }),
  ).not.toMatch(/Petr|Guan|petrguan/i);
});
