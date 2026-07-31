"use client";

import { DocMarkdown } from "@/components/docs/DocMarkdown";
import type { ComponentDocContent } from "@/lib/showcase/component-docs.types";

/** Thin wrapper — shared markdown renderer lives in `components/docs/DocMarkdown`. */
export function ShowcaseMarkdownDoc({
  docs,
  className,
}: {
  docs: ComponentDocContent;
  className?: string;
}) {
  return (
    <DocMarkdown
      docs={docs}
      title="Documentation"
      description="Import, API, styling and accessibility from the library."
      className={className}
    />
  );
}
