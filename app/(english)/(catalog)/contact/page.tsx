import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";

export function generateMetadata() { return getCatalogMetadata("contact", "en"); }
export default function ContactPage() { return renderCatalogPage("contact", "en"); }
