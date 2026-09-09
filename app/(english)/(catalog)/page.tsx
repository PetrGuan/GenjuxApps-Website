import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";

export function generateMetadata() { return getCatalogMetadata("home", "en"); }
export default function HomePage() { return renderCatalogPage("home", "en"); }
