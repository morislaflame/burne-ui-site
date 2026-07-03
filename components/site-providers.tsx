"use client";

import { Toast } from "burne-ui";

import { ShowcaseControlsProvider } from "@/components/showcase-controls/showcase-controls-provider";
import { ThemeTokensProvider } from "@/components/theme/useThemeTokens";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeTokensProvider>
      <ShowcaseControlsProvider>
        <Toast.Provider>{children}</Toast.Provider>
      </ShowcaseControlsProvider>
    </ThemeTokensProvider>
  );
}
