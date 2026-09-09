import { getNeoWriterMetadata, renderNeoWriterPage } from "@/components/neowriter/pages";

export function generateMetadata() {
  return getNeoWriterMetadata("support", "en");
}

export default function SupportPage() {
  return renderNeoWriterPage("support", "en");
}
