import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";

export function generateMetadata() { return getCatalogMetadata("apps", "en"); }
export default function AppsPage() { return renderCatalogPage("apps", "en"); }
