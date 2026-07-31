# Styles & Tailwind

Styles are **not** pulled from the JS barrel (`import { Button } from "burne-ui"`). Import the built CSS **once** at the global entry:

```ts
import "burne-ui/styles.css";
```

```css
@import "burne-ui/styles.css";
```

`burne-ui/styles.css` (build artifact `dist/ui.css`) includes:

- **design tokens** — colors, space, size, radius, type scale, control sizes, z-index, fonts, shadows
- **Tailwind bridge** (`@theme inline`) — utilities like `bg-background`, `text-muted`, `gap-large`, `rounded-base` (prebuilt only includes classes seen when building the kit)
- **custom utilities** — `border-token`, `text-header-1`, `shadow-token-base`, focus rings, and more

Full token name list: export `designTokenNames` from `burne-ui`.

## Recommended `globals.css` (Tailwind CSS v4)

```css
@import "tailwindcss";

/* Scan app code only — burne-ui classes are already in prebuilt ui.css */
@source "../app/**/*.{tsx,ts}";
@source "../components/**/*.{tsx,ts}";
@source "../lib/**/*.{tsx,ts}";

@import "burne-ui/styles.css";
/* Full @theme bridge: spacing, colors, radius, fonts, z-index, … */
@import "burne-ui/theme-bridge.css";

html,
body {
  font-family: var(--font-family-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

`burne-ui/theme-bridge.css` is required because prebuilt `ui.css` does not contain every utility combination (`px-2xlarge`, `pt-xlarge`, …). The bridge re-binds kit tokens to the app’s Tailwind so `@source` can emit missing classes.

`burne-ui init` adds this import automatically.
## Do not scan all of `node_modules/burne-ui/dist`

Prebuilt `ui.css` already contains kit utilities. Re-scanning the whole `dist/` is usually unnecessary, slows HMR, and can trigger Turbopack/PostCSS panics.

Add `@source` on `dist` only if you use kit classes that are missing from prebuilt CSS and never appear in your app sources.

## Layer order

App overrides go **after** `@import "burne-ui/styles.css"`, otherwise kit utilities can win over your responsive classes at equal specificity.
