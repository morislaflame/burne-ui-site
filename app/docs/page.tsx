import type { Metadata } from "next";

import { DocsIndex } from "@/components/docs/docs-index";

export const metadata: Metadata = {
  title: "Documentation — Burne UI",
  description: "Guides for installing and customizing Burne UI.",
};

export default function DocsPage() {
  return <DocsIndex />;
}
