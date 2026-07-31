"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { Link, cn, Text } from "burne-ui";

import { SitePanelShell } from "@/components/layout/SitePanelShell";
import {
  DOCS_COMPONENTS_PATH,
  DOCS_GROUPS,
  docsPagePath,
  type DocsGroup,
} from "@/lib/docs/registry";

function DocsNavLink({
  href,
  label,
  active,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      asChild
      classNames={{
        root: cn(
          "py-small justify-start px-base",
          active ? "bg-secondary text-primary" : "hover:text-foreground",
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

export function DocsSidebar({
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
      {DOCS_GROUPS.map((group: DocsGroup) => (
        <div key={group.id} className="flex flex-col gap-xsmall pt-large">
          <Text
            as="span"
            variant="base"
            className="mb-small px-small font-semibold text-muted"
          >
            {group.label}
          </Text>
          {group.pages.map((page) => {
            const href = docsPagePath(page.id);
            const active = pathname === href;

            return (
              <DocsNavLink
                key={page.id}
                href={href}
                label={page.label}
                active={active}
                onNavigate={onNavigate}
              />
            );
          })}
        </div>
      ))}

      <div className="flex flex-col gap-xsmall">
        <Text
          as="span"
          variant="base"
          className="mb-small px-small font-semibold text-muted"
        >
          Reference
        </Text>
        <DocsNavLink
          href={DOCS_COMPONENTS_PATH}
          label="Components"
          active={pathname === DOCS_COMPONENTS_PATH}
          onNavigate={onNavigate}
        />
      </div>
    </SitePanelShell>
  );
}

export function getActiveDocsLabel(pathname: string): string | null {
  if (pathname === DOCS_COMPONENTS_PATH) return "Components";
  for (const group of DOCS_GROUPS) {
    for (const page of group.pages) {
      if (pathname === docsPagePath(page.id)) {
        return page.label;
      }
    }
  }
  return null;
}
