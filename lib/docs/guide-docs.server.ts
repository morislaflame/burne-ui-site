import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import type { GuideDocContent } from "@/lib/docs/docs.types";

const DOCS_ROOT = join(process.cwd(), "content/docs");

export function getGuideDocs(guideId: string): GuideDocContent | undefined {
  const dir = join(DOCS_ROOT, guideId);
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
