const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`Site path must start with a slash: ${path}`);
  }

  return `${basePath}${path}`;
}