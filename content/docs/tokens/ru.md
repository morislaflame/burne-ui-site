# Дизайн-токены

Переопределяйте CSS-переменные **после** импорта `burne-ui/styles.css`:

```css
/* app/burne-theme-overrides.css */
:root {
  --color-primary: #6366f1;
  --color-surface: #121212;
  --space: 0.5625rem;   /* фиксированный rem — без fluid по viewport */
  --size: 1.0625rem;
  --radius: 0.625rem;
}

[data-theme="light"] {
  --color-primary: #4f46e5;
}
```

```css
@import "burne-ui/styles.css";
@import "./burne-theme-overrides.css";
```

Чтобы **сохранить fluid** spacing/size/radius, не пишите fixed rem вручную — задайте knobs в theme config (`tokens.space` / `size` / `radius` / …). `applyThemeTokens` пишет scaled `clamp`.

Runtime / config пишут **инлайн только токены, отличающиеся от дефолтов кита**. Точечный CSS-оверрайд по-прежнему работает для всего, что не задано в конфиге.

## Из JS

```ts
import { designTokenNames, colorToken } from "burne-ui";

const ripple = colorToken("converge-ripple-neutral"); // var(--color-…)
```

Переменные наследуются по DOM — можно задать их на обёртке виджета вместо `html`.

## Theme config

Экспортируйте `burne-theme.ts` с этого сайта (**Copy config**) и передайте в `BurneUIProvider`. Правите `colors.dark` / `colors.light` и shared `tokens`; незаданные ключи берутся из дефолтов кита.

`customTokens` позволяет хранить CSS-переменные приложения (ключи всегда с `--`) рядом с темой для production и опциональных контролов в devtools.
