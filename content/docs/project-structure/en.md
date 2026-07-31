# Project structure

Recommended layout for a Next.js App Router consumer:

```text
app/
  globals.css
  layout.tsx              # ThemeScript, fonts, providers
  burne-theme.ts          # config from scaffold / Copy config
components/
  providers/
    app-providers.tsx     # BurneUIProvider (+ optional motion / toast)
```

```tsx
// components/providers/app-providers.tsx
"use client";

import { BurneUIProvider } from "burne-ui";
import burneTheme from "@/burne-theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BurneUIProvider config={burneTheme} defaultTheme="system" toast>
      {children}
    </BurneUIProvider>
  );
}
```

```tsx
// app/layout.tsx
import { ThemeScript } from "burne-ui";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="system" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
```

Note: this documentation site uses a live token editor (`ThemeTokensProvider`) instead of persisting theme via `ThemeProvider` / `ThemeScript` — that pattern is for the playground, not a typical app.
