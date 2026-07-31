"use client";

import { ToggleButton, ToggleButtonGroup } from "burne-ui";

import {
  SITE_LOCALE_LABELS,
  useSiteLocale,
} from "@/components/site-locale";
import type { DocsLocale } from "@/lib/docs/docs.types";

const LOCALES = Object.keys(SITE_LOCALE_LABELS) as DocsLocale[];

export function SiteLocaleSwitch() {
  const { locale, setLocale } = useSiteLocale();

  return (
    <ToggleButtonGroup
      type="single"
      size="small"
      aria-label="Language"
      value={locale}
      onValueChange={(next) => {
        if (next === "en" || next === "ru") {
          setLocale(next);
        }
      }}
    >
      {LOCALES.map((key) => (
        <ToggleButton key={key} value={key}>
          {SITE_LOCALE_LABELS[key]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
