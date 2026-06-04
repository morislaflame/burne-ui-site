"use client";

import { Button } from "burne-ui";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";

// ─── Theme helpers ────────────────────────────────────────────────────────────

type SiteTheme = "light" | "dark";

const STORAGE_KEY = "burne-ui-site-theme";

function applyBrnTheme(theme: SiteTheme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.dataset.brnTheme = "light";
  } else {
    delete root.dataset.brnTheme;
  }
}

function readStoredTheme(): SiteTheme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return null;
}

// ─── Section nav ──────────────────────────────────────────────────────────────

const SECTION_TITLES = [
  "Button",
  "Input",
  "Alert",
  "Disclosure",
  "Badge & ToggleButton",
  "Tabs",
  "TextArea",
  "ToggleButtonGroup",
  "Skeleton",
  "Calendar",
  "Loading",
  "SearchInput",
  "Card",
  "Avatar",
  "Form Controls",
  "Slider",
  "ButtonGroup",
  "Breadcrumbs & Pagination",
  "TimeField",
  "ColorSwatch & ColorSlider",
  "Meter & ProgressBar",
  "Tooltip",
  "Popover",
  "Dropdown",
  "Dialog",
  "AlertDialog",
  "Drawer",
  "Toast",
  "Table",
  "ColorPicker",
  "Link",
  "Surface & Separator",
  "Accordion",
  "Expandable",
  "ComboBox",
  "ListBox",
  "CheckboxGroup & RadioGroup",
] as const;

type SectionTitle = (typeof SECTION_TITLES)[number];

function scrollItemToCenter(
  container: HTMLDivElement,
  item: HTMLButtonElement,
  behavior: ScrollBehavior = "smooth",
) {
  const target =
    item.offsetLeft + item.offsetWidth / 2 - container.clientWidth / 2;
  container.scrollTo({ left: Math.max(0, target), behavior });
}

function SectionNavBar({ active }: { active: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const autoScrolling = useRef(false);
  const hasScrolledRef = useRef(false);

  const activeIndex = SECTION_TITLES.indexOf(active as SectionTitle);
  const safeActiveIndex = activeIndex < 0 ? 0 : activeIndex;

  const [centeredIndex, setCenteredIndex] = useState(safeActiveIndex);
  const [edgePad, setEdgePad] = useState(0);

  // Measure visible width of the nav slot.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => setEdgePad(Math.max(wrap.clientWidth / 2, 0));
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Centre the active item when section or width changes.
  useLayoutEffect(() => {
    if (edgePad <= 0) return;

    const container = containerRef.current;
    const item = itemRefs.current[safeActiveIndex];
    if (!container || !item) return;

    setCenteredIndex(safeActiveIndex);

    autoScrolling.current = true;
    scrollItemToCenter(
      container,
      item,
      hasScrolledRef.current ? "smooth" : "auto",
    );
    hasScrolledRef.current = true;

    const t = window.setTimeout(() => {
      autoScrolling.current = false;
    }, 80);
    return () => window.clearTimeout(t);
  }, [safeActiveIndex, edgePad]);

  const handleNavScroll = () => {
    if (autoScrolling.current) return;
    const container = containerRef.current;
    if (!container) return;

    const viewCenter = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(elCenter - viewCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setCenteredIndex(closest);
  };

  const scrollToSection = (title: string) => {
    window.dispatchEvent(new CustomEvent("brn:scroll-to", { detail: { title } }));
  };

  return (
    <div ref={wrapRef} className="relative h-9 w-full min-w-[8rem]">
      <div
        ref={containerRef}
        onScroll={handleNavScroll}
        className="section-nav-scroll flex h-full items-center overflow-x-auto overscroll-x-contain"
      >
        <div aria-hidden className="shrink-0" style={{ width: edgePad }} />

        {SECTION_TITLES.map((title, i) => {
          const distance = Math.abs(i - centeredIndex);
          const opacity =
            distance === 0 ? 1 : distance === 1 ? 0.45 : distance === 2 ? 0.18 : 0;
          const isCentered = i === centeredIndex;

          return (
            <button
              key={title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              onClick={() => scrollToSection(title)}
              className={[
                "shrink-0 cursor-pointer whitespace-nowrap px-[22px] text-sm transition-[opacity,color] duration-300 ease-out focus-visible:outline-none",
                isCentered ? "font-semibold text-foreground" : "font-normal text-muted",
              ].join(" ")}
              style={{ opacity }}
              aria-current={i === safeActiveIndex ? "location" : undefined}
              tabIndex={distance > 3 ? -1 : 0}
            >
              {title}
            </button>
          );
        })}

        <div aria-hidden className="shrink-0" style={{ width: edgePad }} />
      </div>

      {/* Edge fades — more reliable than CSS mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface/95 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface/95 to-transparent"
      />
    </div>
  );
}

// ─── Main header ─────────────────────────────────────────────────────────────

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<SiteTheme>("dark");
  const [activeSection, setActiveSection] = useState<string>(SECTION_TITLES[0]);

  // Sync sticky header height → CSS var for section scroll offset.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const sync = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${el.getBoundingClientRect().height}px`,
      );
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const stored = readStoredTheme();
    const prefersLight =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    const next: SiteTheme = stored ?? (prefersLight ? "light" : "dark");
    setTheme(next);
    applyBrnTheme(next);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { section } = (e as CustomEvent<{ section: string }>).detail;
      if (section) setActiveSection(section);
    };
    window.addEventListener("brn:section", handler);
    return () => window.removeEventListener("brn:section", handler);
  }, []);

  const setSiteTheme = (next: SiteTheme) => {
    setTheme(next);
    applyBrnTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/morislaflame/burne-ui-site";

  return (
    <header
      ref={headerRef}
      data-site-header
      className="sticky top-0 z-50 border-b border-base bg-surface/90 shadow-token-sm backdrop-blur-md"
    >
      <div className="flex items-center gap-mid px-8 py-mid sm:px-large">
        <span className="shrink-0 text-header-2 text-foreground">Burne UI</span>

        <div className="max-sm:hidden flex min-w-0 flex-1 items-center">
          <SectionNavBar active={activeSection} />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-small sm:ml-0">
          <Button
            type="button"
            variant="ghost"
            size="small"
            iconOnly
            animated
            ripple
            aria-label={
              theme === "light"
                ? "Переключить на тёмную тему"
                : "Переключить на светлую тему"
            }
            onClick={() => setSiteTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <IoMoon /> : <IoSunny />}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="small"
            animated
            ripple
            leftIcon={<IoLogoGithub />}
            onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
          >
            GitHub
          </Button>
        </div>
      </div>
    </header>
  );
}
