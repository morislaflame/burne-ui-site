"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import { cn, Surface } from "burne-ui";

import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { ShowcaseSidebar } from "@/components/showcase/showcase-sidebar";
import {
  SiteThemeDesktopPanel,
  SiteThemeMobileDrawer,
} from "@/components/theme/SiteThemePanel";
import {
  resolveLeftSidebarKind,
  resolveShowThemePanel,
  type SiteLeftSidebarKind,
} from "@/lib/site-panels";

/** Matches Tailwind `w-64` / `w-96` at default `--spacing: 0.25rem`. */
const LEFT_W = 256;
const RIGHT_W = 384;
const PANEL_DURATION = 0.34;
const PANEL_EASE_IN = "power2.in";
const PANEL_EASE_OUT = "power2.out";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function panelDuration(): number {
  return prefersReducedMotion() ? 0 : PANEL_DURATION;
}

/**
 * Global chrome host for left nav + theme panel.
 * Panel width is driven by open progress (0..1) so the center column reflows.
 */
export function SiteAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const leftKind = resolveLeftSidebarKind(pathname);
  const showTheme = resolveShowThemePanel(pathname);

  const [displayedLeft, setDisplayedLeft] = useState<SiteLeftSidebarKind | null>(
    leftKind,
  );
  const [visitedDocs, setVisitedDocs] = useState(leftKind === "docs");
  const [visitedShowcase, setVisitedShowcase] = useState(
    leftKind === "showcase",
  );
  const [mountedTheme, setMountedTheme] = useState(showTheme);
  const [leftPresent, setLeftPresent] = useState(leftKind != null);
  const [rightPresent, setRightPresent] = useState(showTheme);
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);

  const [leftOpen, setLeftOpen] = useState(leftKind ? 1 : 0);
  const [rightOpen, setRightOpen] = useState(showTheme ? 1 : 0);

  if (leftKind === "docs" && !visitedDocs) setVisitedDocs(true);
  if (leftKind === "showcase" && !visitedShowcase) setVisitedShowcase(true);
  if (leftKind != null && displayedLeft === null) setDisplayedLeft(leftKind);
  if (showTheme && !mountedTheme) setMountedTheme(true);
  if (leftKind != null && !leftPresent) setLeftPresent(true);
  if (showTheme && !rightPresent) setRightPresent(true);

  const leftSlideRef = useRef<HTMLDivElement>(null);
  const rightSlideRef = useRef<HTMLDivElement>(null);
  const leftProxyRef = useRef({ v: leftKind ? 1 : 0 });
  const rightProxyRef = useRef({ v: showTheme ? 1 : 0 });

  const prevLeftRef = useRef<SiteLeftSidebarKind | null>(leftKind);
  const prevThemeRef = useRef(showTheme);
  const bootedRef = useRef(false);

  useEffect(() => {
    setThemeDrawerOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    const slide = leftSlideRef.current;
    const proxy = leftProxyRef.current;
    const duration = panelDuration();
    const prev = prevLeftRef.current;

    if (!bootedRef.current) {
      proxy.v = leftKind ? 1 : 0;
      setLeftOpen(proxy.v);
      if (slide) gsap.set(slide, { x: 0, clearProps: "transform" });
      prevLeftRef.current = leftKind;
      return;
    }

    if (leftKind === prev) return;

    const from = prev;
    prevLeftRef.current = leftKind;
    gsap.killTweensOf(proxy);
    if (slide) gsap.killTweensOf(slide);

    if (leftKind && !from) {
      proxy.v = 0;
      setLeftOpen(0);
      if (slide) gsap.set(slide, { x: -LEFT_W });
      gsap.to(proxy, {
        v: 1,
        duration,
        ease: PANEL_EASE_OUT,
        onUpdate: () => setLeftOpen(proxy.v),
      });
      if (slide) {
        gsap.to(slide, {
          x: 0,
          duration,
          ease: PANEL_EASE_OUT,
          clearProps: "transform",
        });
      }
      return;
    }

    if (!leftKind && from) {
      if (slide) {
        gsap.to(slide, { x: -LEFT_W, duration, ease: PANEL_EASE_IN });
      }
      gsap.to(proxy, {
        v: 0,
        duration,
        ease: PANEL_EASE_IN,
        onUpdate: () => setLeftOpen(proxy.v),
      });
      return;
    }

    if (leftKind && from && leftKind !== from && slide) {
      const half = duration * 0.55;
      const nextKind = leftKind;
      gsap.to(slide, {
        x: -LEFT_W,
        duration: half,
        ease: PANEL_EASE_IN,
        onComplete: () => {
          flushSync(() => setDisplayedLeft(nextKind));
          gsap.fromTo(
            slide,
            { x: -LEFT_W },
            {
              x: 0,
              duration: half,
              ease: PANEL_EASE_OUT,
              clearProps: "transform",
            },
          );
        },
      });
    }
  }, [leftKind, leftPresent]);

  useLayoutEffect(() => {
    const slide = rightSlideRef.current;
    const proxy = rightProxyRef.current;
    const duration = panelDuration();
    const prev = prevThemeRef.current;

    if (!bootedRef.current) {
      proxy.v = showTheme ? 1 : 0;
      setRightOpen(proxy.v);
      if (slide) gsap.set(slide, { x: 0, clearProps: "transform" });
      prevThemeRef.current = showTheme;
      return;
    }

    if (showTheme === prev) return;
    prevThemeRef.current = showTheme;
    gsap.killTweensOf(proxy);
    if (slide) gsap.killTweensOf(slide);

    if (showTheme) {
      proxy.v = 0;
      setRightOpen(0);
      if (slide) gsap.set(slide, { x: RIGHT_W });
      gsap.to(proxy, {
        v: 1,
        duration,
        ease: PANEL_EASE_OUT,
        onUpdate: () => setRightOpen(proxy.v),
      });
      if (slide) {
        gsap.to(slide, {
          x: 0,
          duration,
          ease: PANEL_EASE_OUT,
          clearProps: "transform",
        });
      }
      return;
    }

    if (slide) {
      gsap.to(slide, { x: RIGHT_W, duration, ease: PANEL_EASE_IN });
    }
    gsap.to(proxy, {
      v: 0,
      duration,
      ease: PANEL_EASE_IN,
      onUpdate: () => setRightOpen(proxy.v),
    });
  }, [showTheme, rightPresent]);

  useLayoutEffect(() => {
    bootedRef.current = true;
  }, []);

  const leftWidth = leftOpen * LEFT_W;
  const rightWidth = rightOpen * RIGHT_W;
  const leftVisible = leftOpen > 0.02;
  const rightVisible = rightOpen > 0.02;

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      {leftPresent ? (
        <Surface
          className={cn(
            "hidden min-h-0 shrink-0 flex-col overflow-hidden rounded-xlarge mt-[var(--site-chrome-height)] lg:flex",
            leftVisible ? "border-token" : "border-0 opacity-0",
          )}
          style={{ width: leftWidth }}
          aria-hidden={leftKind == null}
        >
          <div
            ref={leftSlideRef}
            className="flex min-h-0 flex-1 flex-col"
            style={{ width: LEFT_W }}
          >
            {visitedDocs ? (
              <div
                className={cn(
                  "flex min-h-0 flex-1 flex-col",
                  displayedLeft !== "docs" && "hidden",
                )}
              >
                <DocsSidebar />
              </div>
            ) : null}
            {visitedShowcase ? (
              <div
                className={cn(
                  "flex min-h-0 flex-1 flex-col",
                  displayedLeft !== "showcase" && "hidden",
                )}
              >
                <ShowcaseSidebar />
              </div>
            ) : null}
          </div>
        </Surface>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>

      {rightPresent && mountedTheme ? (
        <Surface
          className={cn(
            "hidden min-h-0 shrink-0 flex-col overflow-hidden rounded-xlarge mt-[var(--site-chrome-height)] md:flex",
            rightVisible ? "border-token" : "border-0 opacity-0",
          )}
          style={{ width: rightWidth }}
          aria-hidden={!showTheme}
        >
          <div
            ref={rightSlideRef}
            className="flex min-h-0 flex-1 flex-col"
            style={{ width: RIGHT_W }}
          >
            <SiteThemeDesktopPanel />
          </div>
        </Surface>
      ) : null}

      {mountedTheme ? (
        <div className={cn(!showTheme && "hidden")}>
          <SiteThemeMobileDrawer
            open={themeDrawerOpen}
            onOpenChange={setThemeDrawerOpen}
          />
        </div>
      ) : null}
    </div>
  );
}
