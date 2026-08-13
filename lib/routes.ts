export type StudioRoute = {
  label: string;
  href: string;
};

export const studioRoutes: readonly StudioRoute[] = [
  { label: "Products", href: "/#products" },
  { label: "About", href: "/about" },
  { label: "Changelog", href: "/changelog" },
  { label: "Contact", href: "/contact" },
];
