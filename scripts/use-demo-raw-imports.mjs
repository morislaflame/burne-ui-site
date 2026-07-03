import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.resolve(__dirname, "../components/showcase/pages");

for (const file of fs.readdirSync(pagesDir)) {
  if (!file.endsWith("Showcase.tsx")) continue;
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  const next = content.replace(
    /import \{ (\w+) as \1 \} from "@\/components\/showcase\/demos\/([^"]+)\.demo\.source";/g,
    'import $1 from "@/components/showcase/demos/$2.demo.tsx?raw";',
  );
  if (next !== content) {
    fs.writeFileSync(filePath, next);
    console.log("Updated", file);
  }
}

const demosRoot = path.resolve(__dirname, "../components/showcase/demos");

function removeSourceFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeSourceFiles(fullPath);
      continue;
    }
    if (entry.name.endsWith(".demo.source.ts")) {
      fs.unlinkSync(fullPath);
      console.log("Removed", path.relative(demosRoot, fullPath));
    }
  }
}

removeSourceFiles(demosRoot);
