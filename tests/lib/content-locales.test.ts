import path from "node:path";

const fixture = vi.hoisted(() => ({ files: new Map<string, string>() }));
vi.mock("node:fs", () => ({
  promises: {
    readFile: vi.fn(async (file: string) => {
      const content = fixture.files.get(file);
      if (content === undefined) throw new Error(`Missing fixture: ${file}`);
      return content;
    }),
    readdir: vi.fn(async (directory: string) => Array.from(fixture.files.keys())
      .filter((file) => path.dirname(file) === directory)
      .map((file) => ({ name: path.basename(file), isFile: () => true }))),
  },
}));

const blog = path.join(process.cwd(), "content", "blog");
const english = `---
slug: a-note
title: A note
summary: An English note.
publishedAt: "2025-01-01"
draft: false
---
[Apps](/apps)
`;
const chinese = `---
slug: a-note
title: 一则笔记
summary: 中文笔记。
publishedAt: "2025-01-01"
draft: false
---
[应用](/apps)
`;

beforeEach(() => {
  fixture.files.clear();
  fixture.files.set(path.join(blog, "a-note.md"), english);
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
  vi.resetModules();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it("retains English content with an explicit content-language marker when no translation exists", async () => {
  const { getPublishedPosts } = await import("@/lib/content");
  const posts = await getPublishedPosts("zh");
  expect(posts).toHaveLength(1);
  expect(posts[0].contentLocale).toBe("en");
  expect(posts[0].title).toBe("A note");
  expect(posts[0].html).toContain('href="/zh/apps"');
});

it("uses an available Chinese translation without changing the original publication identity", async () => {
  fixture.files.set(path.join(blog, "zh", "a-note.md"), chinese);
  const { getPublishedPosts } = await import("@/lib/content");
  const [post] = await getPublishedPosts("zh");
  expect(post.title).toBe("一则笔记");
  expect(post.contentLocale).toBe("zh");
  expect(post.slug).toBe("a-note");
  expect(post.publishedAt).toBe("2025-01-01");
});

it("does not publish a translation of an unpublished English source", async () => {
  fixture.files.set(path.join(blog, "a-note.md"), english.replace("draft: false", "draft: true"));
  fixture.files.set(path.join(blog, "zh", "a-note.md"), chinese);
  const { getPublishedPosts } = await import("@/lib/content");
  expect(await getPublishedPosts("zh")).toEqual([]);
});
