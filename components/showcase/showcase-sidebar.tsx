"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { Link, cn, Text } from "burne-ui";

import { SitePanelShell } from "@/components/layout/SitePanelShell";
import {
  SHOWCASE_GROUPS,
  showcasePagePath,
  type ShowcaseGroup,
} from "@/lib/showcase/registry";

function ShowcaseNavLink({
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
  const href = showcasePagePath(pageId);

  return (
    <Link
      asChild
      classNames={{
        root: cn(
          "py-small justify-start px-base",
          active ? "bg-secondary text-primary" : "text-foreground hover:text-foreground",
          className,
        ),
      }}
    >
      <NextLink
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={() => onNavigate?.()}
      >
        {label}
      </NextLink>
    </Link>
  );
}

export function ShowcaseSidebar({
  onNavigate,
  className,
  withHeader = true,
}: {
  onNavigate?: () => void;
  className?: string;
  withHeader?: boolean;
}) {
  const pathname = usePathname();

  return (
    <SitePanelShell
      className={className}
      topBlurClassName="h-8"
      bottomBlurClassName="h-8"
    >
      {SHOWCASE_GROUPS.map((group: ShowcaseGroup) => (
        <div key={group.id} className="flex flex-col gap-xsmall pt-large">
          <Text
            as="span"
            variant="base"
            className="mb-small px-small font-semibold text-muted"
          >
            {group.label}
          </Text>
          {group.pages.map((page) => {
            const href = showcasePagePath(page.id);
            const active = pathname === href;

            return (
              <ShowcaseNavLink
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
    </SitePanelShell>
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
