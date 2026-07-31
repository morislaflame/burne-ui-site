export type SiteLeftSidebarKind = "docs" | "showcase";

export function resolveLeftSidebarKind(
  pathname: string,
): SiteLeftSidebarKind | null {
  if (pathname.startsWith("/docs")) return "docs";
  if (pathname.startsWith("/components")) return "showcase";
  return null;
}

export function resolveShowThemePanel(pathname: string): boolean {
  return (
    pathname.startsWith("/docs") ||
    pathname.startsWith("/components") ||
    pathname.startsWith("/playground")
  );
}
