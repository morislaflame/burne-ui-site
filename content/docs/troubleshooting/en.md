# Troubleshooting

## Component renders but styles look broken

1. Is `@import "burne-ui/styles.css"` connected?
2. Is `@source` pointed at app code (`app/`, `components/`, …) — **without** `node_modules/burne-ui/dist`?
3. Are overrides applied **after** the kit import?
4. Is `@import "burne-ui/theme-bridge.css"` present (full `@theme` bridge)? See [Styles](/docs/styles).

## Turbopack / PostCSS fatal panic in `next dev`

Usually caused by `@source` on the whole `burne-ui/dist` together with prebuilt `styles.css`. Remove that `@source` and clear `.next`.

## Gloss panels without blur

From **1.5.3+** blur ships in `burne-ui/styles.css`. Do not copy a fallback into `globals.css`. If blur is missing, update the package and check for app CSS overriding gloss.

## Font in theme panel does not change visually

1. In DevTools, confirm `--font-family-sans` updates on `<html>`
2. `@import "burne-ui/theme-bridge.css"` after kit import (or equivalent `@theme inline` with `--font-sans`)
3. `html, body { font-family: var(--font-family-sans); }`
4. Google Fonts / `next/font` loaded for the chosen family

## `text-base` looks like 1rem instead of ~0.875rem

Import `burne-ui/theme-bridge.css` (or add to `@theme inline`: `--text-base: var(--text-base-size);`).

## `useToast()` does nothing

- No `Toast.Provider` (or `BurneUIProvider` with toast) above in the tree.

## Theme does not switch

- Attribute is set on a node other than `document.documentElement` (`<html>`).

## Theme flash on load (SSR)

- Missing `ThemeScript` / `getThemeScript` in root layout
- Mismatched `storageKey` / `defaultTheme` between script and provider
- Missing `suppressHydrationWarning` on `<html>`

## Animations “do not change”

- `configureMotion(...)` called too late or outside a client layer

## Final checklist

- [ ] `burne-ui` + `react-icons` + `gsap`
- [ ] `burne-ui/styles.css`
- [ ] Tailwind `@source` on app only
- [ ] `@import "burne-ui/theme-bridge.css"` + body font-family
- [ ] `ThemeScript` + provider for light/dark
- [ ] Optional motion + toast
