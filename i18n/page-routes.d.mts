export type PageRoute =
  | { path: string; family: "catalog"; page: "home" | "apps" | "about" | "blog" | "contact" | "donate" | "supporters" | "feeds" }
  | { path: string; family: "bebilog"; page: "home" }
  | { path: string; family: "lumadio" | "neowriter"; page: "home" | "privacy" | "terms" | "support" };
export const pageRoutes: readonly PageRoute[];
