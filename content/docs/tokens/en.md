# Design tokens

Override CSS variables **after** importing `burne-ui/styles.css`:

```css
/* app/burne-theme-overrides.css */
:root {
  --color-primary: #6366f1;
  --color-surface: #121212;
  --space: 0.5625rem;   /* fixed rem — disables fluid by viewport */
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

To **keep fluid** spacing/size/radius, do not hard-code fixed rem — set knobs in theme config (`tokens.space` / `size` / `radius` / …). `applyThemeTokens` writes scaled `clamp` values.

Runtime / config writes **inline only tokens that differ from kit defaults**. Point CSS overrides still work for everything not set in config.

## From JS

```ts
import { designTokenNames, colorToken } from "burne-ui";

const ripple = colorToken("converge-ripple-neutral"); // var(--color-…)
```

Variables inherit down the DOM — you can scope them on a widget wrapper instead of `html`.

## Theme config

Export a `burne-theme.ts` from this site’s **Copy config** and pass it to `BurneUIProvider`. Edit `colors.dark` / `colors.light` and shared `tokens` as needed; omitted keys fall back to kit defaults.

`customTokens` can store app CSS variables (keys always start with `--`) next to the theme for production + optional devtools controls.
