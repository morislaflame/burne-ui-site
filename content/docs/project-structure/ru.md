# Структура проекта

Рекомендуемая раскладка для Next.js App Router:

```text
app/
  globals.css
  layout.tsx              # ThemeScript, шрифты, провайдеры
  burne-theme.ts          # конфиг из scaffold / Copy config
components/
  providers/
    app-providers.tsx     # BurneUIProvider (+ опционально motion / toast)
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
    <html lang="ru" suppressHydrationWarning>
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

Примечание: этот сайт документации использует live-редактор токенов (`ThemeTokensProvider`) вместо персистенции через `ThemeProvider` / `ThemeScript` — это паттерн playground, не типичного приложения.
