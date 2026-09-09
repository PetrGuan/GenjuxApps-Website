import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";

export function generateMetadata() { return getCatalogMetadata("feeds", "en"); }
export default function FeedsPage() { return renderCatalogPage("feeds", "en"); }
