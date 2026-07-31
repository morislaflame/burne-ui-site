"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { SiteBreadcrumbsBar } from "@/components/site-breadcrumbs-bar";
import { SiteHeader } from "@/components/site-header";

/**
 * Fixed chrome overlay: header + breadcrumbs with equal gap.
 * Measures stack height (+ trailing gap) into `--site-chrome-height`
 * so page scrollports can pad content while scrolling underneath.
 */
export function SiteChrome() {
  const stackRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const sync = () => {
      const gap = Number.parseFloat(getComputedStyle(el).rowGap) || 0;
      const stackHeight = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--site-chrome-height",
        `${stackHeight + gap}px`,
      );
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pathname]);

  return (
    <div
      ref={stackRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col gap-mid"
    >
      <div className="pointer-events-auto">
        <SiteHeader />
      </div>
    </div>
  );
}
