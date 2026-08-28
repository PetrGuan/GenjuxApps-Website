import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const outputDirectory = path.resolve("out");

if (basePath && !basePath.startsWith("/")) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or start with a slash");
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? htmlFiles(entryPath) : [entryPath];
    }),
  );

  return files.flat().filter((file) => file.endsWith(".html"));
}

for (const file of await htmlFiles(path.join(outputDirectory, "apps"))) {
  const source = await readFile(file, "utf8");
  const updated = source
    .replaceAll('href="/apps/', `href="${basePath}/apps/`)
    .replaceAll('href="/"', `href="${basePath || "/"}"`);

  if (updated !== source) {
    await writeFile(file, updated);
  }
}

await writeFile(path.join(outputDirectory, ".nojekyll"), "");