# Theme

Light theme is enabled with an attribute on the document root (set by `ThemeProvider` / `BurneUIProvider`):

```html
<html data-theme="light">
```

## Root layout with `ThemeScript`

```tsx
import { ThemeScript } from "burne-ui";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-[100dvh] antialiased" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="system" />
      </head>
      <body className="min-h-[100dvh] bg-background text-foreground">{children}</body>
    </html>
  );
}
```

`ThemeScript` reads `localStorage` and sets `data-theme` **before first paint**. Without it, SSR HTML is always dark and light-theme users get a flash.

`storageKey` / `defaultTheme` must match `BurneUIProvider` / `ThemeProvider`.

String form for `index.html` / CSP:

```ts
import { getThemeScript } from "burne-ui";

getThemeScript({ storageKey: "burne-ui-theme", defaultTheme: "dark" });
```

## `BurneUIProvider`

```tsx
"use client";

import { BurneUIProvider } from "burne-ui";
import burneTheme from "./burne-theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BurneUIProvider config={burneTheme} defaultTheme="system" toast>
      {children}
    </BurneUIProvider>
  );
}
```

The provider combines:

- **ThemeProvider** — `light` | `dark` | `system`, optional `localStorage`
- **tokens** — shared `config.tokens` + `config.colors.light` / `colors.dark`
- **motion** — `configureMotion` from `config.motion`
- **labels** — default accessible / UI strings; override with `labels` or `BURNE_LABELS_RU`
- **Toast.Provider** — on by default (`toast={false}` to disable)

Theme only:

```tsx
import { ThemeProvider, useBurneTheme } from "burne-ui";

<ThemeProvider defaultTheme="dark" storageKey="burne-ui-theme">
  {children}
</ThemeProvider>
```

## Runtime toggle

```tsx
"use client";

import { useBurneTheme } from "burne-ui";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useBurneTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme}
    </button>
  );
}
```

Portal surfaces (`Dialog`, `Drawer`, `Tooltip`, `Toast`, …) inherit theme from the anchor/trigger or `<html>`.

## Config from this site

1. Tune tokens in the theme playground on this site.
2. **Copy config** → paste as `burne-theme.ts`.
3. Pass it to `BurneUIProvider`.
