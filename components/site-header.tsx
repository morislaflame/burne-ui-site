"use client";

import { Button, Separator, Switch, Text } from "burne-ui";
import { useLayoutEffect, useRef } from "react";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";

import { ShowcaseMobileNavTrigger } from "@/components/showcase/showcase-mobile-nav-trigger";
import { useThemeTokens } from "@/components/theme/useThemeTokens";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
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
  }, []);

  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/morislaflame/burne-ui-site";

  return (
    <header
      ref={headerRef}
      data-site-header
      className="shrink-0 border-b-token bg-surface/90 shadow-token-sm backdrop-blur-md"
    >
      <div className="flex items-center gap-large px-large py-base sm:px-xlarge">
        <span className="shrink-0 text-header-2 text-foreground">Burne UI</span>

        <Text as="span" variant="small" className="hidden min-w-0 flex-1 text-muted lg:inline">
          Component catalog & theme playground
        </Text>

        <div className="ml-auto flex shrink-0 items-center gap-small sm:gap-large">
          <Switch
            gloss
            checked={state.theme === "light"}
            onChange={(event) => setTheme(event.target.checked ? "light" : "dark")}
            label={<span className="hidden sm:inline">Light theme</span>}
            className="shrink-0"
            iconOff={<IoMoon aria-hidden />}
            iconOn={<IoSunny aria-hidden />}
          />

          <Separator orientation="vertical" />

          <Button
            type="button"
            variant="outline"
            size="small"
            animated
            ripple
            icon={<IoLogoGithub />}
            onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
          >
            GitHub
          </Button>

          <ShowcaseMobileNavTrigger />
        </div>
      </div>
    </header>
  );
}
