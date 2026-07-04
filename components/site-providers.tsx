"use client";

import { Toast } from "burne-ui";

import { ShowcaseMobileNavProvider } from "@/components/showcase/showcase-mobile-nav";
import { ShowcaseControlsProvider } from "@/components/showcase-controls/showcase-controls-provider";
import { ThemeTokensProvider } from "@/components/theme/useThemeTokens";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeTokensProvider>
      <ShowcaseControlsProvider>
        <ShowcaseMobileNavProvider>
          <Toast.Provider>{children}</Toast.Provider>
        </ShowcaseMobileNavProvider>
      </ShowcaseControlsProvider>
    </ThemeTokensProvider>
  );
}
