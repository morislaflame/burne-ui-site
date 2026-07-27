export type ShowcasePageMeta = {
  id: string;
  label: string;
};

export type ShowcaseGroup = {
  id: string;
  label: string;
  pages: ShowcasePageMeta[];
};

export const SHOWCASE_GROUPS: ShowcaseGroup[] = [
  {
    id: "typography",
    label: "Typography",
    pages: [
      { id: "text", label: "Text" },
      { id: "kbd", label: "Kbd" },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    pages: [
      { id: "button", label: "Button" },
      { id: "close-button", label: "CloseButton" },
      { id: "toggle-button", label: "ToggleButton" },
      { id: "toggle-button-group", label: "ToggleButtonGroup" },
      { id: "button-group", label: "ButtonGroup" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    pages: [
      { id: "badge", label: "Badge" },
      { id: "alert", label: "Alert" },
      { id: "toast", label: "Toast" },
      { id: "loading", label: "Loading" },
      { id: "progress-bar", label: "ProgressBar" },
      { id: "meter", label: "Meter" },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    pages: [
      { id: "form", label: "Form" },
      { id: "field", label: "Field" },
      { id: "input", label: "Input" },
      { id: "textarea", label: "TextArea" },
      { id: "combobox", label: "ComboBox" },
      { id: "select", label: "Select" },
      { id: "slider", label: "Slider" },
      { id: "time-field", label: "TimeField" },

      { id: "checkbox", label: "Checkbox" },
      { id: "switch", label: "Switch" },
      { id: "radio-group", label: "RadioGroup" },
      { id: "color-picker", label: "ColorPicker" },
      { id: "selection-indicator", label: "SelectionIndicator" },
      { id: "calendar", label: "Calendar" },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    pages: [
      { id: "breadcrumbs", label: "Breadcrumbs" },
      { id: "link", label: "Link" },
      { id: "pagination", label: "Pagination" },
      { id: "tabs", label: "Tabs" },
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    pages: [
      { id: "tooltip", label: "Tooltip" },
      { id: "popover", label: "Popover" },
      { id: "dropdown", label: "Dropdown" },
      { id: "dialog", label: "Dialog" },
      { id: "drawer", label: "Drawer" },
      { id: "alert-dialog", label: "AlertDialog" },
    ],
  },
  {
    id: "data-display",
    label: "Data display",
    pages: [
      { id: "listbox", label: "ListBox" },
      { id: "card", label: "Card" },
      { id: "table", label: "Table" },
      { id: "surface", label: "Surface" },
      { id: "avatar", label: "Avatar" },
      { id: "skeleton", label: "Skeleton" },
    ],
  },
  {
    id: "disclosure",
    label: "Disclosure",
    pages: [
      { id: "expandable", label: "Expandable" },
      { id: "disclosure", label: "Disclosure" },
      { id: "accordion", label: "Accordion" },
    ],
  },
  {
    id: "theme",
    label: "Theme",
    pages: [{ id: "gloss", label: "Gloss" }],
  },
];

export const SHOWCASE_PAGES = SHOWCASE_GROUPS.flatMap((group) => group.pages);

export const DEFAULT_SHOWCASE_PAGE_ID = SHOWCASE_PAGES[0]?.id ?? "text";

export function findShowcasePage(id: string): ShowcasePageMeta | undefined {
  return SHOWCASE_PAGES.find((page) => page.id === id);
}

export function findShowcaseGroupForPage(id: string): ShowcaseGroup | undefined {
  return SHOWCASE_GROUPS.find((group) => group.pages.some((page) => page.id === id));
}

export function showcasePagePath(id: string): string {
  return `/components/${id}`;
}
