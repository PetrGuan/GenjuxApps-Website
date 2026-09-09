import { getNeoWriterMetadata, renderNeoWriterPage } from "@/components/neowriter/pages";

export function generateMetadata() {
  return getNeoWriterMetadata("home", "en");
}

export default function NeoWriterPage() {
  return renderNeoWriterPage("home", "en");
}
