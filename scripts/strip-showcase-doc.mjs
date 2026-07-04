#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const files = process.argv.slice(2);

for (const rel of files) {
  const path = join(root, rel);
  let src = readFileSync(path, "utf8");
  src = src.replace(/\nimport \{ ShowcaseDoc \} from "@\/components\/showcase\/layout\/ShowcaseDoc";\n/, "\n");
  src = src.replace(/\n\s*<ShowcaseDoc>[\s\S]*?<\/ShowcaseDoc>\n/, "\n");
  writeFileSync(path, src);
  console.log("stripped", rel);
}
