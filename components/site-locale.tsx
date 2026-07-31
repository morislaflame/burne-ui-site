"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { DocsLocale } from "@/lib/docs/docs.types";

const STORAGE_KEY = "burne-ui-site-locale";

export const SITE_LOCALE_LABELS: Record<DocsLocale, string> = {
  en: "EN",
  ru: "RU",
};

type SiteLocaleContextValue = {
  locale: DocsLocale;
  setLocale: (locale: DocsLocale) => void;
};

const SiteLocaleContext = createContext<SiteLocaleContextValue | null>(null);

function readStoredLocale(): DocsLocale {
  if (typeof window === "undefined") return "ru";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ru") return stored;
  } catch {
    /* ignore */
  }
  return "ru";
}

export function SiteLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<DocsLocale>("ru");

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((next: DocsLocale) => {
    setLocaleState(next);
  }, []);

  return (
    <SiteLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </SiteLocaleContext.Provider>
  );
}

export function useSiteLocale(): SiteLocaleContextValue {
  const ctx = useContext(SiteLocaleContext);
  if (!ctx) {
    throw new Error("useSiteLocale must be used within SiteLocaleProvider.");
  }
  return ctx;
}
