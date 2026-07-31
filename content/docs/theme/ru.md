# Тема

Светлая тема включается атрибутом на корне документа (ставит `ThemeProvider` / `BurneUIProvider`):

```html
<html data-theme="light">
```

## Root layout с `ThemeScript`

```tsx
import { ThemeScript } from "burne-ui";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="min-h-[100dvh] antialiased" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="system" />
      </head>
      <body className="min-h-[100dvh] bg-background text-foreground">{children}</body>
    </html>
  );
}
```

`ThemeScript` читает `localStorage` и ставит `data-theme` **до первой отрисовки**. Без него SSR-HTML всегда тёмный — у пользователя со светлой темой будет вспышка.

`storageKey` / `defaultTheme` должны совпадать с `BurneUIProvider` / `ThemeProvider`.

Строковая форма для `index.html` / CSP:

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

Провайдер объединяет:

- **ThemeProvider** — `light` | `dark` | `system`, опционально `localStorage`
- **токены** — shared `config.tokens` + `config.colors.light` / `colors.dark`
- **motion** — `configureMotion` из `config.motion`
- **labels** — дефолтные accessible / UI-строки; оверрайд через `labels` или `BURNE_LABELS_RU`
- **Toast.Provider** — включён по умолчанию (`toast={false}` чтобы отключить)

Только тема:

```tsx
import { ThemeProvider, useBurneTheme } from "burne-ui";

<ThemeProvider defaultTheme="dark" storageKey="burne-ui-theme">
  {children}
</ThemeProvider>
```

## Runtime-переключатель

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

Портальные поверхности (`Dialog`, `Drawer`, `Tooltip`, `Toast`, …) наследуют тему с якоря/триггера или с `<html>`.

## Конфиг с этого сайта

1. Настройте токены в theme playground на сайте.
2. **Copy config** → сохраните как `burne-theme.ts`.
3. Передайте в `BurneUIProvider`.
