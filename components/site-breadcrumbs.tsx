"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import { Breadcrumbs, type BreadcrumbItem } from "burne-ui";

import {
  DOCS_COMPONENTS_PATH,
  DOCS_INDEX_PATH,
  findDocsPage,
} from "@/lib/docs/registry";
import { findShowcasePage } from "@/lib/showcase/registry";

export function buildSiteBreadcrumbItems(pathname: string): BreadcrumbItem[] | null {
  if (pathname === "/") return null;

  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  if (pathname.startsWith("/docs")) {
    const isDocsIndex = pathname === DOCS_INDEX_PATH;
    items.push({
      label: "Docs",
      href: isDocsIndex ? undefined : DOCS_INDEX_PATH,
      current: isDocsIndex,
    });

    if (pathname === DOCS_COMPONENTS_PATH) {
      items.push({ label: "Components", current: true });
      return items;
    }

    if (pathname.startsWith(`${DOCS_INDEX_PATH}/`)) {
      const slug = pathname.slice(DOCS_INDEX_PATH.length + 1);
      const page = findDocsPage(slug);
      if (page) {
        items.push({ label: page.label, current: true });
      }
    }

    return items;
  }

  if (pathname.startsWith("/components/")) {
    const slug = pathname.slice("/components/".length);
    const page = findShowcasePage(slug);
    items.push({
      label: "Components",
      href: DOCS_COMPONENTS_PATH,
    });
    items.push({
      label: page?.label ?? slug,
      current: true,
    });
    return items;
  }

  if (pathname.startsWith("/components")) {
    items.push({ label: "Components", current: true });
    return items;
  }

  if (pathname.startsWith("/playground")) {
    items.push({ label: "Playground", current: true });
    return items;
  }

  return items;
}

export function SiteBreadcrumbs({ pathname }: { pathname: string }) {
  const router = useRouter();
  const items = buildSiteBreadcrumbItems(pathname);

  if (!items?.length) return null;

  const withClientNav: BreadcrumbItem[] = items.map((item) => {
    if (!item.href || item.current) return item;

    const href = item.href;
    return {
      ...item,
      onClick: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        event.preventDefault();
        router.push(href);
      },
    };
  });

  return (
    <Breadcrumbs
      aria-label="Breadcrumb"
      collapse={false}
      items={withClientNav}
      className="min-w-0"
    />
  );
}
