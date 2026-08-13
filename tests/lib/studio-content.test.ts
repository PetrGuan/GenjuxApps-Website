import {
  openSourceContributions,
  selectedWork,
  studioCapabilities,
  studioExperience,
} from "@/lib/studio-content";

it("contains the approved studio records without personal identity", () => {
  expect(studioCapabilities).toHaveLength(5);
  expect(selectedWork).toHaveLength(4);
  expect(studioExperience).toHaveLength(3);
  expect(openSourceContributions).toHaveLength(3);
  expect(
    JSON.stringify({
      studioCapabilities,
      selectedWork,
      studioExperience,
      openSourceContributions,
    }),
  ).not.toMatch(/Petr|Guan|petrguan/i);
});
