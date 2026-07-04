import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import type { ComponentDocContent } from "@/lib/showcase/component-docs.types";

const DOCS_ROOT = join(process.cwd(), "content/component-docs");

export function getComponentDocs(componentId: string): ComponentDocContent | undefined {
  const dir = join(DOCS_ROOT, componentId);
  const ruPath = join(dir, "ru.md");
  const enPath = join(dir, "en.md");

  if (!existsSync(ruPath) || !existsSync(enPath)) {
    return undefined;
  }

  return {
    ru: readFileSync(ruPath, "utf8"),
    en: readFileSync(enPath, "utf8"),
  };
}
