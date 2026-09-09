import { getNeoWriterMetadata, renderNeoWriterPage } from "@/components/neowriter/pages";

export function generateMetadata() {
  return getNeoWriterMetadata("terms", "en");
}

export default function TermsPage() {
  return renderNeoWriterPage("terms", "en");
}
