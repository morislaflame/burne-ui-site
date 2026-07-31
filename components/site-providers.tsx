"use client";

import { Toast } from "burne-ui";

import { ShowcaseMobileNavProvider } from "@/components/showcase/showcase-mobile-nav";
import { ShowcaseControlsProvider } from "@/components/showcase-controls/showcase-controls-provider";
import { SiteLocaleProvider } from "@/components/site-locale";
import { ThemeTokensProvider } from "@/components/theme/useThemeTokens";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeTokensProvider>
      <SiteLocaleProvider>
        <ShowcaseControlsProvider>
          <ShowcaseMobileNavProvider>
            <Toast.Provider>{children}</Toast.Provider>
          </ShowcaseMobileNavProvider>
        </ShowcaseControlsProvider>
      </SiteLocaleProvider>
    </ThemeTokensProvider>
  );
}
