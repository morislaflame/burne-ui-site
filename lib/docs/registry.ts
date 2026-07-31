export type DocsPageMeta = {
  id: string;
  label: string;
  description: string;
};

export type DocsGroup = {
  id: string;
  label: string;
  pages: DocsPageMeta[];
};

export const DOCS_GROUPS: DocsGroup[] = [
  {
    id: "guides",
    label: "Guides",
    pages: [
      {
        id: "getting-started",
        label: "Getting started",
        description: "Install, scaffold, and render your first component.",
      },
      {
        id: "styles",
        label: "Styles & Tailwind",
        description: "Connect burne-ui CSS and Tailwind CSS v4 correctly.",
      },
      {
        id: "theme",
        label: "Theme",
        description: "Dark / light mode, BurneUIProvider, and ThemeScript.",
      },
      {
        id: "fonts",
        label: "Fonts",
        description: "Typography tokens, web fonts, and runtime presets.",
      },
      {
        id: "tokens",
        label: "Design tokens",
        description: "Colors, spacing, radius, and theme overrides.",
      },
      {
        id: "motion",
        label: "Motion",
        description: "configureMotion and GSAP animation settings.",
      },
      {
        id: "toast",
        label: "Toast",
        description: "Toast provider setup and imperative API.",
      },
      {
        id: "project-structure",
        label: "Project structure",
        description: "Recommended files and providers layout.",
      },
      {
        id: "troubleshooting",
        label: "Troubleshooting",
        description: "Common issues and a final checklist.",
      },
    ],
  },
];

export const DOCS_PAGES = DOCS_GROUPS.flatMap((group) => group.pages);

export const DEFAULT_DOCS_PAGE_ID = DOCS_PAGES[0]?.id ?? "getting-started";

export function findDocsPage(id: string): DocsPageMeta | undefined {
  return DOCS_PAGES.find((page) => page.id === id);
}

export function docsPagePath(id: string): string {
  return `/docs/${id}`;
}

export const DOCS_INDEX_PATH = "/docs";
export const DOCS_COMPONENTS_PATH = "/docs/components";
