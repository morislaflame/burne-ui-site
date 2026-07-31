import type { Metadata } from "next";

import { DocsComponentsHub } from "@/components/docs/docs-components-hub";

export const metadata: Metadata = {
  title: "Components — Burne UI Docs",
  description: "Browse Burne UI components by group and open the showcase.",
};

export default function DocsComponentsPage() {
  return <DocsComponentsHub />;
}
