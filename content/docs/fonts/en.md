# Fonts

## Tokens

| CSS variable | Purpose |
|---|---|
| `--font-family-sans` | Primary UI font |
| `--font-family-mono` | Monospace (code, Kbd) |
| `--font-w-small` … `--font-w-bold` | Type weights |

Utilities: `font-sans`, `font-mono`, `font-w-base`, `text-base`, and related type roles.

## Static override

Load overrides **after** `burne-ui/styles.css`:

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

Also keep `@import "burne-ui/theme-bridge.css"` and `html, body { font-family: var(--font-family-sans); }` from [Styles](/docs/styles).

## Runtime change

```ts
document.documentElement.style.setProperty(
  "--font-family-sans",
  '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
);
```

On this site the theme panel does this via `applyThemeTokens()`.

## Loading web fonts

If the stack names `"Inter"`, `"Roboto"`, etc., the font **files** must be loaded — otherwise the browser falls back to system UI.

Example (Next.js):

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link rel="stylesheet" href={THEME_SANS_FONTS_URL} />
<link rel="stylesheet" href={THEME_MONO_FONTS_URL} />
```

For a fixed production font, prefer `next/font` and set `--font-family-sans` from that class.

## Theme panel presets (this site)

**Sans:** System UI, Inter, Geist, IBM Plex Sans, DM Sans, Manrope, Source Sans 3, Outfit, Plus Jakarta Sans, Roboto, Open Sans, Figtree, Nunito Sans, Work Sans.

**Mono:** System Mono, JetBrains Mono, Fira Code, Source Code Pro, Roboto Mono, IBM Plex Mono, Space Mono.
