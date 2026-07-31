"use client";

import { usePathname } from "next/navigation";

import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";

export function SiteBreadcrumbsBar() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="pointer-events-auto flex items-center gap-large px-3xlarge">
      <SiteBreadcrumbs pathname={pathname} />
    </div>
  );
}
