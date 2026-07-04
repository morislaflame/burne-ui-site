import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const playgroundRoot = path.resolve(siteRoot, "../burne-ui/playground/showcase");

/** registry id, demo folder in playground (if different), showcase page file */
const SHOWCASE_MIGRATIONS = [
  { id: "text", page: "TextShowcase.tsx" },
  { id: "kbd", page: "KbdShowcase.tsx" },
  { id: "button", page: "ButtonShowcase.tsx" },
  { id: "close-button", page: "CloseButtonShowcase.tsx" },
  { id: "toggle-button", page: "ToggleButtonShowcase.tsx" },
  { id: "toggle-button-group", demoDir: "toggleButtonGroup", page: "ToggleButtonGroupShowcase.tsx" },
  { id: "button-group", page: "ButtonGroupShowcase.tsx" },
  { id: "ripple", page: "RippleShowcase.tsx" },
  { id: "badge", page: "BadgeShowcase.tsx" },
  { id: "alert", page: "AlertShowcase.tsx" },
  { id: "toast", page: "ToastShowcase.tsx" },
  { id: "loading", page: "LoadingShowcase.tsx" },
  { id: "progress-bar", page: "ProgressBarShowcase.tsx" },
  { id: "meter", page: "MeterShowcase.tsx" },
  { id: "form", page: "FormShowcase.tsx" },
  { id: "field", page: "FieldShowcase.tsx" },
  { id: "input", page: "InputShowcase.tsx", extraDemoDirs: ["label"] },
  { id: "textarea", page: "TextAreaShowcase.tsx" },
  { id: "combobox", page: "ComboBoxShowcase.tsx" },
  { id: "select", page: "SelectShowcase.tsx" },
  { id: "slider", page: "SliderShowcase.tsx" },
  { id: "time-field", page: "TimeFieldShowcase.tsx" },
  { id: "checkbox", page: "CheckboxShowcase.tsx" },
  { id: "switch", page: "SwitchShowcase.tsx" },
  { id: "radio-group", demoDir: "radioGroup", extraDemoDirs: ["radio"], page: "RadioGroupShowcase.tsx" },
  { id: "color-picker", demoDir: "colorPicker", page: "ColorPickerShowcase.tsx" },
  { id: "selection-indicator", demoDir: "selectionIndicator", page: "SelectionIndicatorShowcase.tsx" },
  { id: "calendar", page: "CalendarShowcase.tsx" },
  { id: "breadcrumbs", page: "BreadcrumbsShowcase.tsx" },
  { id: "link", page: "LinkShowcase.tsx" },
  { id: "pagination", page: "PaginationShowcase.tsx" },
  { id: "tabs", page: "TabsShowcase.tsx" },
  { id: "tooltip", page: "TooltipShowcase.tsx" },
  { id: "popover", page: "PopoverShowcase.tsx" },
  { id: "dropdown", page: "DropdownShowcase.tsx" },
  { id: "dialog", page: "DialogShowcase.tsx" },
  { id: "drawer", page: "DrawerShowcase.tsx" },
  { id: "alert-dialog", demoDir: "alertDialog", page: "AlertDialogShowcase.tsx" },
  { id: "listbox", demoDir: "listBox", page: "ListBoxShowcase.tsx" },
  { id: "card", page: "CardShowcase.tsx" },
  { id: "table", page: "TableShowcase.tsx" },
  { id: "surface", page: "SurfaceShowcase.tsx" },
  { id: "avatar", page: "AvatarShowcase.tsx" },
  { id: "skeleton", page: "SkeletonShowcase.tsx" },
  { id: "expandable", page: "ExpandableShowcase.tsx" },
  { id: "disclosure", page: "DisclosureShowcase.tsx" },
  { id: "accordion", page: "AccordionShowcase.tsx" },
  { id: "gloss", page: "GlossShowcase.tsx" },
];

function fixDemoImports(content) {
  return content
    .replace(
      /from "@\/components\/core\/utils\/glossStoryChrome"/g,
      'from "@/lib/showcase/gloss-story-chrome"',
    )
    .replace(/from "@\/components\/core\/ComboBox\/comboBoxContext"/g, 'from "burne-ui"')
    .replace(/from "@\/components\/core\/[^"]+"/g, 'from "burne-ui"')
    .replace(/from "@\/components\/composite\/[^"]+"/g, 'from "burne-ui"')
    .replace(/from "@\/utils\/cn"/g, 'from "burne-ui"')
    .replace(/from "@\/utils\/mockImages"/g, 'from "@/lib/showcase/mock-images"')
    .replace(/from "@\/index"/g, 'from "burne-ui"')
    .replace(/from "\.\.\/\.\.\/shared\/utils"/g, 'from "@/lib/showcase/shared/utils"')
    .replace(/from "\.\.\/\.\.\/shared\/constants"/g, 'from "@/lib/showcase/shared/constants"')
    .replace(
      /<Input\.Hint>Don't pass the key to client code\.<\/Input\.Hint>/g,
      "<Input.Hint>Don&apos;t pass the key to client code.</Input.Hint>",
    )
    .replace(/What's happened Burne UI\?/g, "What&apos;s happened Burne UI?");
}

function fixShowcasePage(content) {
  let next = content
    .replace(
      /import (\w+) from "\.\.\/demos\/([^"]+\.demo\.tsx)\?raw";/g,
      'import $1 from "@/components/showcase/demos/$2?raw";',
    )
    .replace(/from "\.\.\/layout\//g, 'from "@/components/showcase/layout/')
    .replace(/from "\.\.\/demos\//g, 'from "@/components/showcase/demos/')
    .replace(
      /importPath='import \{ ([^}]+) \} from "@\/components\/core\/[^"]+";'/g,
      'importPath=\'import { $1 } from "burne-ui";\'',
    )
    .replace(
      /importPath='import \{ ([^}]+) \} from "@\/components\/composite\/[^"]+";'/g,
      'importPath=\'import { $1 } from "burne-ui";\'',
    )
    .replace(/<ShowcaseDoc\.Import path="@\/components\/core\/[^"]+" \/>/g, '<ShowcaseDoc.Import path="burne-ui" />')
    .replace(/<ShowcaseDoc\.Import path="@\/components\/composite\/[^"]+" \/>/g, '<ShowcaseDoc.Import path="burne-ui" />')
    .replace(
      /<code>ToggleButtonGroup<\/code> from <code>@\/components\/composite\/ToggleButtonGroup<\/code>/g,
      "<code>ToggleButtonGroup</code> from <code>burne-ui</code>",
    );

  if (!next.startsWith('"use client"')) {
    next = `"use client";\n\n${next}`;
  }

  return next;
}

for (const entry of SHOWCASE_MIGRATIONS) {
  const demoDirNames = [entry.demoDir ?? entry.id, ...(entry.extraDemoDirs ?? [])];

  for (const demoDirName of demoDirNames) {
    const srcDemoDir = path.join(playgroundRoot, "demos", demoDirName);
    const destDemoDir = path.join(siteRoot, "components/showcase/demos", demoDirName);

    if (!fs.existsSync(srcDemoDir)) {
      console.warn("Skip missing demo dir:", demoDirName);
      continue;
    }

    fs.mkdirSync(destDemoDir, { recursive: true });

    for (const file of fs.readdirSync(srcDemoDir)) {
      if (!file.endsWith(".demo.tsx")) continue;
      const srcPath = path.join(srcDemoDir, file);
      const destPath = path.join(destDemoDir, file);
      const fixed = fixDemoImports(fs.readFileSync(srcPath, "utf8"));
      fs.writeFileSync(destPath, fixed);
    }
  }

  const srcPage = path.join(playgroundRoot, "pages", entry.page);
  const destPage = path.join(siteRoot, "components/showcase/pages", entry.page);
  if (!fs.existsSync(srcPage)) {
    console.warn("Skip missing page:", entry.page);
    continue;
  }
  fs.writeFileSync(destPage, fixShowcasePage(fs.readFileSync(srcPage, "utf8")));
}

console.log(
  "Migrated:",
  SHOWCASE_MIGRATIONS.map((e) => e.id).join(", "),
);
