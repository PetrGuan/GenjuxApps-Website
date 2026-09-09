import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";

export function generateMetadata() { return getCatalogMetadata("about", "en"); }
export default function AboutPage() { return renderCatalogPage("about", "en"); }
