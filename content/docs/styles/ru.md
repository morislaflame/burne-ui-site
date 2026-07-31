# Стили и Tailwind

Стили **не** подтягиваются из JS-barrel (`import { Button } from "burne-ui"`). Подключите собранный CSS **один раз** в глобальной точке входа:

```ts
import "burne-ui/styles.css";
```

```css
@import "burne-ui/styles.css";
```

Файл `burne-ui/styles.css` (артефакт `dist/ui.css`) содержит:

- **дизайн-токены** — цвета, space, size, radius, типографика, размеры контролов, z-index, шрифты, тени
- **мост Tailwind** (`@theme inline`) — утилиты вроде `bg-background`, `text-muted`, `gap-large`, `rounded-base` (в prebuilt — только те, что встретились при сборке кита)
- **кастомные утилиты** — `border-token`, `text-header-1`, `shadow-token-base`, focus rings и др.

Полный перечень имён токенов — экспорт `designTokenNames` из `burne-ui`.

## Рекомендуемый `globals.css` (Tailwind CSS v4)

```css
@import "tailwindcss";

/* Сканируем только код приложения — классы burne-ui уже в prebuilt ui.css */
@source "../app/**/*.{tsx,ts}";
@source "../components/**/*.{tsx,ts}";
@source "../lib/**/*.{tsx,ts}";

@import "burne-ui/styles.css";
/* Полный @theme-мост: spacing, colors, radius, fonts, z-index, … */
@import "burne-ui/theme-bridge.css";

html,
body {
  font-family: var(--font-family-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

`burne-ui/theme-bridge.css` нужен, потому что prebuilt `ui.css` не содержит всех комбинаций утилит (`px-2xlarge`, `pt-xlarge`, …). Мост заново привязывает токены кита к Tailwind приложения, чтобы `@source` мог сгенерировать недостающие классы.

`burne-ui init` добавляет этот импорт автоматически.
## Не сканируйте весь `node_modules/burne-ui/dist`

Prebuilt `ui.css` уже содержит утилиты кита. Повторный `@source` на весь `dist/` обычно не нужен, грузит CPU при HMR и может ронять Turbopack/PostCSS.

Добавляйте `@source` на `dist` только если используете классы кита, которых нет в prebuilt CSS и которые не попадают в scan вашего кода.

## Порядок слоёв

Оверрайды приложения — **после** `@import "burne-ui/styles.css"`, иначе утилиты кита могут перекрыть ваши responsive-классы при одинаковой специфичности.
