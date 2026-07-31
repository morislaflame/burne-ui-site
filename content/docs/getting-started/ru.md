# Начало работы

Интеграция `burne-ui` в React-приложение: установка, стили, провайдеры и первый компонент.

## Scaffold (рекомендуется)

```bash
npm create burne-app@latest my-app
# pnpm create burne-app my-app
# bunx create-burne-app my-app
```

В существующий проект:

```bash
npx burne-ui@latest init
```

## Установка вручную

```bash
npm install burne-ui react-icons gsap
```

### Peer-зависимости

| Пакет | Версия |
|-------|--------|
| `react`, `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `react-icons` | `^5.0.0` |
| `gsap` | `^3.12.0` |

`gsap` — **peer** (не бандлится в `dist`). `@gsap/react` не входит в кит — ставьте отдельно, если нужен `useGSAP` на своих экранах.

## Первый компонент

```tsx
"use client";

import { Button } from "burne-ui";

export function Demo() {
  return <Button variant="primary">Нажми меня</Button>;
}
```

Стили подключаются один раз глобально — см. [Стили и Tailwind](/docs/styles). Провайдеры и тема — см. [Тема](/docs/theme).

## Checklist

- [ ] Установили `burne-ui` + `react-icons` + `gsap`
- [ ] Подключили `burne-ui/styles.css`
- [ ] Tailwind v4: `@source` на код приложения (не на `burne-ui/dist`)
- [ ] `@import "burne-ui/theme-bridge.css"` (полный `@theme`-мост)
- [ ] `html, body { font-family: var(--font-family-sans); }`
- [ ] `ThemeScript` + `BurneUIProvider` (или `ThemeProvider`) для светлой/тёмной темы
- [ ] Опционально: `configureMotion(...)`, Toast через провайдер
