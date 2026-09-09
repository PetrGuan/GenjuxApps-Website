import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";

export function generateMetadata() { return getCatalogMetadata("supporters", "en"); }
export default function SupportersPage() { return renderCatalogPage("supporters", "en"); }
