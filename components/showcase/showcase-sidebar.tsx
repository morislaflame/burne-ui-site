"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button, cn, Text } from "burne-ui";

import {
  SHOWCASE_GROUPS,
  showcasePagePath,
  type ShowcaseGroup,
} from "@/lib/showcase/registry";

function ShowcaseNavButton({
  pageId,
  label,
  active,
  onNavigate,
  className,
}: {
  pageId: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const router = useRouter();
  const href = showcasePagePath(pageId);

  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      aria-current={active ? "page" : undefined}
      className={cn(
        "h-9 w-full justify-start px-base text-left font-normal",
        !active && "text-muted hover:text-foreground",
        className,
      )}
      onMouseEnter={() => router.prefetch(href)}
      onClick={() => {
        router.push(href);
        onNavigate?.();
      }}
    >
      {label}
    </Button>
  );
}

export function ShowcaseSidebar({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("site-panel-scroll flex min-h-0 flex-1 flex-col gap-mid overflow-y-auto overscroll-y-contain p-mid", className)}>
      {SHOWCASE_GROUPS.map((group: ShowcaseGroup) => (
        <div key={group.id} className="flex flex-col gap-xsmall">
          <Text
            as="span"
            variant="tools"
            className="mb-small px-small font-semibold uppercase tracking-wider underline underline-offset-4"
          >
            {group.label}
          </Text>
          {group.pages.map((page) => {
            const href = showcasePagePath(page.id);
            const active = pathname === href;

            return (
              <ShowcaseNavButton
                key={page.id}
                pageId={page.id}
                label={page.label}
                active={active}
                onNavigate={onNavigate}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function getActiveShowcaseLabel(pathname: string): string | null {
  for (const group of SHOWCASE_GROUPS) {
    for (const page of group.pages) {
      if (pathname === showcasePagePath(page.id)) {
        return page.label;
      }
    }
  }
  return null;
}
