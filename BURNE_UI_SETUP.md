# Burne UI: полная начальная установка и кастомизация

Этот файл описывает рабочую интеграцию `burne-ui` в приложение (на примере `Next.js + Tailwind CSS v4`), включая тему, токены, шрифты и анимации.

---

## 1) Установка зависимостей

```bash
npm i burne-ui react-icons
```

Peer-зависимости библиотеки:

- `react`, `react-dom`: `^18 || ^19`
- `react-icons`: `^5`

---

## 2) Подключение Tailwind и стилей библиотеки

В глобальном CSS (например, `app/globals.css`) подключите Tailwind и стили пакета **в таком порядке**:

```css
@import "tailwindcss";

/* Tailwind v4: сканируем prebuilt bundle и ваш код */
@source "../node_modules/burne-ui/dist";
@source "../components/**/*.{tsx,ts}";
@source "../app/**/*.{tsx,ts}";
@source "../lib/**/*.{tsx,ts}";

@import "burne-ui/styles.css";

/*
 * Tailwind v4 через @source перегенерирует часть theme-токенов.
 * Привязываем их обратно к runtime-переменным burne-ui.
 */
@theme {
  --text-base: var(--text-base-size);
  --text-base--line-height: var(--text-base-line-height);
  --text-base--font-weight: var(--text-base-weight);
  --font-sans: var(--font-family-sans);
  --font-mono: var(--font-family-mono);
}

/* Наследуем runtime-шрифт (см. раздел 6) */
html,
body {
  font-family: var(--font-family-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Почему это важно:

- `burne-ui/styles.css` содержит токены (`--color-*`, `--space`, `--radius`, `--font-family-*`, и т.д.) и utility-bridge.
- `@source "../node_modules/burne-ui/dist"` нужен, чтобы Tailwind не выкинул классы из библиотеки и ваших `className`.
- Блок `@theme` после импорта `burne-ui/styles.css` **обязателен** для корректных `text-base`, `font-sans` / `font-mono` и runtime-смены шрифтов.
- Правило `html, body { font-family: var(--font-family-sans) }` нужно, чтобы смена `--font-family-sans` сразу отражалась на всём UI.
- Gloss `backdrop-filter` уже в пакете с **1.5.3+** (порядок `-webkit` → unprefixed) — копировать в `globals.css` не нужно.

---

## 3) Базовый RootLayout (Next.js, App Router)

Минимально:

```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="min-h-[100dvh] antialiased">
      <body className="min-h-[100dvh] bg-background text-foreground">{children}</body>
    </html>
  );
}
```

`bg-background` и `text-foreground` работают из токенов `burne-ui`.

---

## 4) Первый компонент

```tsx
"use client";

import { Button } from "burne-ui";

export function Demo() {
  return <Button variant="primary">Нажми меня</Button>;
}
```

---

## 5) Переключение темы (dark/light)

В `burne-ui` светлая тема включается атрибутом:

```html
<html data-theme="light">
```

Простой runtime-переключатель:

```ts
function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
}
```

Примечание: портальные компоненты (`Dialog`, `AlertDialog`, `Drawer`, `Tooltip`, `Toast`) корректно наследуют тему через документ/якорь.

---

## 6) Шрифты и типографика

### 6.1 Токены

| CSS-переменная | Назначение |
|---|---|
| `--font-family-sans` | Основной UI-шрифт |
| `--font-family-mono` | Моноширинный (код, Kbd) |
| `--font-w-small` … `--font-w-bold` | Веса типографики burne-ui |

Utility-классы: `font-sans`, `font-mono`, `font-w-base`, `text-base`, и т.д.

### 6.2 Статическая настройка (CSS override)

Подключите override-файл **после** `burne-ui/styles.css`:

```css
/* app/burne-theme-overrides.css */
:root {
  --font-family-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

```css
@import "burne-ui/styles.css";
@import "./burne-theme-overrides.css";
```

### 6.3 Runtime-смена шрифта (Theme panel / JS)

Для live-переключения шрифта в UI задавайте переменные inline на `<html>`:

```ts
document.documentElement.style.setProperty(
  "--font-family-sans",
  '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
);
document.documentElement.style.setProperty(
  "--font-family-mono",
  '"JetBrains Mono", ui-monospace, monospace',
);
```

На `burne-ui-site` это делает `applyThemeTokens()` из `components/theme/themeDefaults.ts` через `ThemeTokensProvider`.

### 6.4 Подключение web-шрифтов (Google Fonts)

Если в `--font-family-sans` указан `"Inter"`, `"Roboto"` и т.п., **файлы шрифта должны быть загружены** — иначе браузер откатится на system-ui и визуально ничего не изменится.

Пример для Next.js (`app/layout.tsx`):

```tsx
import { THEME_MONO_FONTS_URL, THEME_SANS_FONTS_URL } from "@/lib/theme-font-links";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={THEME_SANS_FONTS_URL} />
        <link rel="stylesheet" href={THEME_MONO_FONTS_URL} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

URL-ы для пресетов Theme panel лежат в `lib/theme-font-links.ts`.  
При добавлении нового пресета обновите **три места**:

1. `FONT_PRESETS` / `MONO_FONT_PRESETS` в `themeDefaults.ts`
2. `lib/theme-font-links.ts` (Google Fonts URL)
3. (для playground) `burne-ui/playground/index.html`

### 6.5 Доступные пресеты (Theme panel)

**Sans:** System UI, Inter, Geist, IBM Plex Sans, DM Sans, Manrope, Source Sans 3, Outfit, Plus Jakarta Sans, Roboto, Open Sans, Figtree, Nunito Sans, Work Sans.

**Mono:** System Mono, JetBrains Mono, Fira Code, Source Code Pro, Roboto Mono, IBM Plex Mono, Space Mono.

### 6.6 Альтернатива: `next/font`

Для production-проекта с одним фиксированным шрифтом удобнее `next/font/google` или `next/font/local` — тогда задайте `--font-family-sans` через CSS-класс от `next/font`, а не через Google Fonts `<link>`.

---

## 7) Кастомизация дизайн-токенов (цвета, spacing, radius)

Подключите override-файл после `burne-ui/styles.css`, например:

```css
/* app/burne-theme-overrides.css */
:root {
  --color-primary: #6366f1;
  --color-surface: #121212;
  --space: 0.5625rem;
  --size: 1.0625rem;
  --radius: 0.625rem;
}

[data-theme="light"] {
  --color-primary: #4f46e5;
}
```

Полный runtime-пример (цвета + layout + шрифты) — см. `components/theme/themeDefaults.ts` → `applyThemeTokens()`.

Также из пакета можно использовать:

- `designTokenNames` — список имён токенов
- `colorToken("converge-ripple-neutral")` — удобная ссылка на CSS var (`var(--color-...)`)

---

## 8) Кастомизация анимаций (GSAP motion config)

У `burne-ui` есть глобальная конфигурация motion. Вызывайте один раз до первого рендера клиентского UI.

### 8.1 Где вызывать

- Vite/CRA: в `main.tsx` перед `createRoot(...).render(...)`
- Next.js: в client-провайдере (`providers.tsx`) и подключать его в `layout.tsx`

### 8.2 Пример

```tsx
"use client";

import { configureMotion } from "burne-ui";
import { useEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    configureMotion({
      interactiveDuration: 220,
      interactiveEase: "power2.out",
      hoverLiftEase: "sine.inOut",
      switchThumbDuration: 300,
      switchThumbEase: "back.out(1.4)",
      rippleDefaultDuration: 500,
      rippleExpandableDuration: 650,
      rippleEaseCss: "cubic-bezier(0.25, 0.55, 0.35, 0.95)",
      progressFillDuration: 450,
      enableHoverLift: true,
      enablePressSqueeze: true,
      enableRipple: true,
      enableExpandable: true,
      enableToastStack: true,
      enableProgressFill: true,
    });
  }, []);

  return <>{children}</>;
}
```

### 8.3 Что можно настраивать

Основные группы `MotionConfig`:

- тайминги/ease: `interactiveDuration`, `tooltipDuration`, `selectionFillDuration`, `expandDuration`, `progressFillDuration`, и `*Ease`
- hover/press: `hoverLiftScale`, `pressSqueezeScale`, `badgeAnchorHoverLiftScale`
- ripple: `rippleDefaultDuration`, `rippleDefaultOpacityFrom`, `rippleExpandableDuration`, `rippleEaseCss`
- feature flags: `enableHoverLift`, `enablePressSqueeze`, `enableToggleButtonFill`, `enableRipple`, `enableExpandable`, `enableToastStack`, `enableAsyncButtonCrossfade`, `enableContentFade`, `enableFeedbackExpand`, `enableProgressFill`

Важно: библиотека учитывает `prefers-reduced-motion`.

---

## 9) Toast: полноценное подключение провайдера и API

Чтобы `useToast()` работал, оберните приложение:

```tsx
"use client";

import { Toast } from "burne-ui";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider defaultPlacement="bottom-center" defaultVariant="default">
      {children}
    </Toast.Provider>
  );
}
```

Использование:

```tsx
"use client";

import { Button, useToast } from "burne-ui";

export function SaveButton() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast.success("Сохранено", {
          description: "Изменения успешно применены",
        })
      }
    >
      Сохранить
    </Button>
  );
}
```

Доступны:

- `toast.show(...)`
- `toast.success(...)`, `toast.danger(...)`, `toast.warning(...)`, `toast.info(...)`
- `toast.promise(promise, { loading, success, error })`
- `toast.dismiss(id)`

---

## 10) Рекомендуемая структура файлов в проекте

```text
app/
  globals.css
  layout.tsx              // Google Fonts <link>, провайдеры
components/
  theme/
    themeDefaults.ts      // applyThemeTokens, FONT_PRESETS, exportThemeCss
    useThemeTokens.ts     // ThemeTokensProvider
    ThemeControls.tsx     // UI панели токенов
lib/
  theme-font-links.ts     // Google Fonts URL для пресетов
```

В `layout.tsx`:

```tsx
import "./globals.css";
import { THEME_MONO_FONTS_URL, THEME_SANS_FONTS_URL } from "@/lib/theme-font-links";
import { SiteProviders } from "@/components/site-providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={THEME_SANS_FONTS_URL} />
        <link rel="stylesheet" href={THEME_MONO_FONTS_URL} />
      </head>
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
```

---

## 11) Частые проблемы и быстрый чек

### Компонент есть, но стили «сломаны»

Проверьте:

1. Подключен ли `@import "burne-ui/styles.css";`
2. Есть ли `@source "../node_modules/burne-ui/dist";`
3. Не переопределили ли токены слишком рано (override должен идти **после** импорта `burne-ui/styles.css`)
4. Есть ли блок `@theme` с `--font-sans` / `--text-base` (см. раздел 2)

### Gloss-панели без blur (Dialog, Dropdown, ComboBox)

Tailwind v4 при `@source` на `burne-ui/dist` может вырезать `backdrop-filter`. Добавьте fallback из раздела 2.

### Шрифт в Theme panel не меняется визуально

1. Проверьте в DevTools, что на `<html>` меняется `--font-family-sans`
2. Убедитесь, что в `globals.css` есть `@theme { --font-sans: var(--font-family-sans); }` **после** `@import "burne-ui/styles.css"`
3. Убедитесь, что есть `html, body { font-family: var(--font-family-sans); }`
4. Подключены ли Google Fonts / `next/font` для выбранного семейства (Inter, Roboto, …)

### `text-base` выглядит как 1rem вместо 0.875rem

Добавьте в `@theme`: `--text-base: var(--text-base-size);` (см. раздел 2).

### Не работает `useToast()`

- Нет `Toast.Provider` выше по дереву.

### Тема не переключается

- Атрибут ставится не на `document.documentElement` (`<html>`), а на другой узел.

### Анимации «не меняются»

- `configureMotion(...)` вызван слишком поздно или не в клиентском слое.

### Vercel / `npm install`: `playwright: command not found`

У опубликованного `burne-ui` в `postinstall` historically вызывался `playwright install`, но `playwright` — devDependency самой библиотеки и **не ставится** в приложение-потребитель.

**Fix в проекте сайта:**

```ini
# .npmrc
ignore-scripts=true
```

```json
// vercel.json
{
  "installCommand": "npm install --ignore-scripts"
}
```

`burne-ui` поставляется уже собранным (`dist/`) — postinstall-скрипты зависимостей для runtime не нужны.  
Локально для разработки `burne-ui` после `npm i` в репозитории кита: `npm run playwright:install`.

---

## 12) Минимальный final checklist

- [ ] Установили `burne-ui` + `react-icons`
- [ ] Подключили `burne-ui/styles.css`
- [ ] Добавили `@source "../node_modules/burne-ui/dist"`
- [ ] Добавили `@theme` с `--text-base`, `--font-sans`, `--font-mono`
- [ ] Добавили `html, body { font-family: var(--font-family-sans); }`
- [ ] `burne-ui` ≥ 1.5.3 (gloss blur CSS в `styles.css`)
- [ ] (При runtime-шрифтах) подключили Google Fonts или `next/font`
- [ ] (Опционально) theme overrides (`--color-*`, `--space`, `--radius`, …)
- [ ] (Опционально) `configureMotion(...)`
- [ ] Для тостов добавили `Toast.Provider`

Готово: библиотека работает полноценно и кастомизируется через токены + motion-конфиг.
