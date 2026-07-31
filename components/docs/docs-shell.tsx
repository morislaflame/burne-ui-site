"use client";

import {
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

function resetScroll(el: HTMLElement | null) {
  if (!el) return;
  el.scrollTop = 0;
  el.scrollLeft = 0;
}

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    resetScroll(scrollRef.current);
  }, [pathname]);

  return (
    <main
      ref={scrollRef}
      className="site-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain [overflow-root:none] pt-[var(--site-chrome-height)]"
    >
      <div
        key={pathname}
        className="mx-auto box-border flex min-h-full w-full max-w-4xl flex-col px-large pb-2xlarge"
      >
        {children}
      </div>
    </main>
  );
}
