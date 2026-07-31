"use client";

import type { ReactNode } from "react";

export function PlaygroundShell({ children }: { children: ReactNode }) {
  return (
    <main className="site-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain [overflow-root:none] pt-[var(--site-chrome-height)]">
      <div className="mx-auto box-border flex min-h-full w-full max-w-6xl flex-col px-large pb-2xlarge">
        {children}
      </div>
    </main>
  );
}
