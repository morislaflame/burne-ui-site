"use client";

import { Button } from "burne-ui";
import { useEffect, useState } from "react";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";

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

export function SiteHeader() {
  const [theme, setTheme] = useState<SiteTheme>("dark");

  useEffect(() => {
    const stored = readStoredTheme();
    const prefersLight =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    const next: SiteTheme =
      stored ?? (prefersLight ? "light" : "dark");
    // Синхронизация с localStorage после гидрации (сервер не знает тему).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- тема только на клиенте
    setTheme(next);
    applyBrnTheme(next);
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
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com";

  return (
    <header className="sticky top-0 z-50 border-b border-base bg-surface/90 shadow-token-sm backdrop-blur-md">
      <div className="flex items-center justify-between gap-mid px-8 py-mid sm:px-large">
        <span className="text-header-2 text-foreground">Burne UI</span>
        <div className="flex flex-wrap items-center justify-end gap-small">
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
            onClick={() =>
              setSiteTheme(theme === "light" ? "dark" : "light")
            }
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
