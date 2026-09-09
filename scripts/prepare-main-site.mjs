import { constants } from "node:fs";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { pageRoutes } from "../i18n/page-routes.mjs";
import { localePath } from "../i18n/routing.mjs";

const output = path.resolve("out");
const routesWithDirectoryIndexes = [
  ...pageRoutes.filter(({ path }) => path !== "/").map(({ path }) => path.slice(1)),
  ...pageRoutes.map(({ path }) => localePath(path, "zh").slice(1)),
  "apps/bebilog/en", "apps/bebilog/zh",
];

async function writeIndex(route) {
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await copyFile(
    path.join(output, `${route}.html`),
    path.join(directory, "index.html"),
    constants.COPYFILE_EXCL,
  );
}

for (const route of routesWithDirectoryIndexes) {
  await writeIndex(route);
}

for (const blogPath of ["blog", "zh/blog"]) {
  const posts = await readdir(path.join(output, blogPath), { withFileTypes: true });
  for (const post of posts) {
    if (!post.isFile() || !post.name.endsWith(".html") || post.name === "index.html") continue;
    const slug = post.name.slice(0, -5);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`Unexpected exported blog filename: ${post.name}`);
    }
    await writeIndex(`${blogPath}/${slug}`);
  }
}
