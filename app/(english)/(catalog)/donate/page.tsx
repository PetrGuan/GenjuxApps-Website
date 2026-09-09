import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";

export function generateMetadata() { return getCatalogMetadata("donate", "en"); }
export default function DonatePage() { return renderCatalogPage("donate", "en"); }
