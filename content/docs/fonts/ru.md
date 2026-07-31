# Шрифты

## Токены

| CSS-переменная | Назначение |
|---|---|
| `--font-family-sans` | Основной UI-шрифт |
| `--font-family-mono` | Моноширинный (код, Kbd) |
| `--font-w-small` … `--font-w-bold` | Веса типографики |

Утилиты: `font-sans`, `font-mono`, `font-w-base`, `text-base` и связанные type roles.

## Статический override

Подключайте override **после** `burne-ui/styles.css`:

```css
/* app/burne-theme-overrides.css */
:root {
  --font-family-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

```css
@import "burne-ui/styles.css";
@import "./burne-theme-overrides.css";
```

Также держите `@import "burne-ui/theme-bridge.css"` и `html, body { font-family: var(--font-family-sans); }` из [Стилей](/docs/styles).

## Runtime-смена

```ts
document.documentElement.style.setProperty(
  "--font-family-sans",
  '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
);
```

На этом сайте theme panel делает это через `applyThemeTokens()`.

## Подключение web-шрифтов

Если в стеке указаны `"Inter"`, `"Roboto"` и т.п., **файлы** шрифта должны быть загружены — иначе браузер откатится на system-ui.

Пример (Next.js):

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link rel="stylesheet" href={THEME_SANS_FONTS_URL} />
<link rel="stylesheet" href={THEME_MONO_FONTS_URL} />
```

Для фиксированного production-шрифта удобнее `next/font` и `--font-family-sans` из его CSS-класса.

## Пресеты Theme panel (этот сайт)

**Sans:** System UI, Inter, Geist, IBM Plex Sans, DM Sans, Manrope, Source Sans 3, Outfit, Plus Jakarta Sans, Roboto, Open Sans, Figtree, Nunito Sans, Work Sans.

**Mono:** System Mono, JetBrains Mono, Fira Code, Source Code Pro, Roboto Mono, IBM Plex Mono, Space Mono.
