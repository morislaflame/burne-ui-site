"use client";

import type { ReactNode } from "react";

import { cn } from "burne-ui";

import { ProgressiveBlur } from "@/components/effects/ProgressiveBlur";

export type SitePanelShellProps = {
  children: ReactNode;
  /** Sticky top block (title / actions). Renders above scroll content. */
  header?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  /** Tailwind height class for top ProgressiveBlur. */
  topBlurClassName?: string;
  /** Tailwind height class for bottom ProgressiveBlur. */
  bottomBlurClassName?: string;
  blurIntensity?: number;
};

/**
 * Full-height panel: ProgressiveBlur overlays + single scrollport.
 * Optional sticky header sits above content (z above blur).
 */
export function SitePanelShell({
  children,
  header,
  className,
  headerClassName,
  contentClassName,
  topBlurClassName = "h-16",
  bottomBlurClassName = "h-16",
  blurIntensity = 0.45,
}: SitePanelShellProps) {
  return (
    <div className={cn("relative h-full min-h-0 flex-1 overflow-hidden", className)}>
      <ProgressiveBlur
        direction="top"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10",
          topBlurClassName,
        )}
        blurIntensity={blurIntensity}
      />
      <ProgressiveBlur
        direction="bottom"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10",
          bottomBlurClassName,
        )}
        blurIntensity={blurIntensity}
      />

      <div className="site-panel-scroll absolute inset-0 overflow-y-auto overscroll-y-contain">
        {header ? (
          <div className={cn("sticky top-0 z-20 px-large pb-2xlarge pt-large", headerClassName)}>
            {header}
          </div>
        ) : null}
        <div
          className={cn(
            "flex flex-col gap-large px-6 pb-6",
            !header && "pt-large",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
