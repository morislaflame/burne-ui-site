"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";

import { Button, Link as BurneLink, Separator, Switch, cn } from "burne-ui";

import { SiteLocaleSwitch } from "@/components/site-locale-switch";
import { ShowcaseMobileNavTrigger } from "@/components/showcase/showcase-mobile-nav-trigger";
import { useThemeTokens } from "@/components/theme/useThemeTokens";
import { DOCS_INDEX_PATH } from "@/lib/docs/registry";
import { ProgressiveBlur } from "@/components/effects/ProgressiveBlur";
import {
  DEFAULT_SHOWCASE_PAGE_ID,
  showcasePagePath,
} from "@/lib/showcase/registry";

function HeaderNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <BurneLink
      asChild
      underline={active}
      className={cn(
        "shrink-0 px-small py-xsmall text-large",
        active ? "font-w-mid text-foreground" : "text-muted hover:text-foreground",
      )}
    >
      <Link href={href} aria-current={active ? "page" : undefined}>
        {children}
      </Link>
    </BurneLink>
  );
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { state, setTheme } = useThemeTokens();

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
  }, [pathname]);

  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/morislaflame/burne-ui-site";

  const componentsHref = showcasePagePath(DEFAULT_SHOWCASE_PAGE_ID);
  const docsActive = pathname.startsWith("/docs");
  const componentsActive = pathname.startsWith("/components");
  const playgroundActive = pathname.startsWith("/playground");

  return (
    <header
      ref={headerRef}
      data-site-header
      className="shrink-0 z-10 w-full"
    >
      <div className="flex items-center gap-large rounded-xlarge py-xlarge px-xlarge shadow-token-sm relative z-10">
        
        <Link
          className="shrink-0 text-header-2"
          href="/"
        >
          Burne UI
        </Link>

        <nav
          className="flex min-w-0 flex-1 items-center gap-small sm:gap-mid"
          aria-label="Primary"
        >
          <HeaderNavLink href={DOCS_INDEX_PATH} active={docsActive}>
            Docs
          </HeaderNavLink>
          <HeaderNavLink href={componentsHref} active={componentsActive}>
            Components
          </HeaderNavLink>
          <HeaderNavLink href="/playground" active={playgroundActive}>
            Playground
          </HeaderNavLink>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-small sm:gap-large">
          <SiteLocaleSwitch />

          <Separator orientation="vertical" />

          <Switch
            checked={state.theme === "light"}
            onChange={(event) => setTheme(event.target.checked ? "light" : "dark")}
            iconOff={<IoMoon aria-hidden />}
            iconOn={<IoSunny aria-hidden />}
          />

          <Separator orientation="vertical" />

          <Button
            type="button"
            variant="outline"
            size="small"
            ripple
            icon={<IoLogoGithub />}
            iconOnly
            aria-label="GitHub"
            className="sm:hidden"
            onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
          />
          <Button
            type="button"
            variant="primary"
            size="small"
            ripple
            icon={<IoLogoGithub />}
            className="sm:inline-flex"
            onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
          >
            GitHub
          </Button>

          <ShowcaseMobileNavTrigger />
        </div>
      </div>
      <ProgressiveBlur
          direction="top"
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          blurIntensity={0.45}
        />
    </header>
  );
}
