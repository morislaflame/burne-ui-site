"use client";

import {
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

function resetShowcaseScroll(el: HTMLElement | null) {
  if (!el) return;
  el.scrollTop = 0;
  el.scrollLeft = 0;
}

export function ShowcaseShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    const content = contentRef.current;
    resetShowcaseScroll(el);

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      resetShowcaseScroll(el);
      raf2 = requestAnimationFrame(() => resetShowcaseScroll(el));
    });

    // Dynamic import: loading → page grows; pin until that settle finishes.
    const ro =
      content && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => resetShowcaseScroll(el))
        : null;
    if (content && ro) ro.observe(content);
    const stopPin = window.setTimeout(() => ro?.disconnect(), 500);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(stopPin);
      ro?.disconnect();
    };
  }, [pathname]);

  return (
    <main
      ref={scrollRef}
      data-showcase-scroll
      className="site-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain [overflow-root:none] pt-[var(--site-chrome-height)]"
    >
      <div
        key={pathname}
        ref={contentRef}
        className="mx-auto box-border flex min-h-full w-full max-w-4xl flex-col px-large pb-2xlarge"
      >
        {children}
      </div>
    </main>
  );
}
