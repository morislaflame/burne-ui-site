# Getting started

Integrate `burne-ui` into a React app: install packages, connect styles, wrap providers, and render your first component.

## Scaffold (recommended)

```bash
npm create burne-app@latest my-app
# pnpm create burne-app my-app
# bunx create-burne-app my-app
```

Into an existing project:

```bash
npx burne-ui@latest init
```

## Install manually

```bash
npm install burne-ui react-icons gsap
```

### Peer dependencies

| Package | Version |
|---------|---------|
| `react`, `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `react-icons` | `^5.0.0` |
| `gsap` | `^3.12.0` |

`gsap` is a **peer** (not bundled in `dist`). `@gsap/react` is not part of the kit — add it separately if you need `useGSAP` in your own screens.

## First component

```tsx
"use client";

import { Button } from "burne-ui";

export function Demo() {
  return <Button variant="primary">Click me</Button>;
}
```

Styles must be imported once globally — see [Styles & Tailwind](/docs/styles). Providers and theme — see [Theme](/docs/theme).

## Checklist

- [ ] Installed `burne-ui` + `react-icons` + `gsap`
- [ ] Connected `burne-ui/styles.css`
- [ ] Tailwind v4: `@source` on app code (not `burne-ui/dist`)
- [ ] `@import "burne-ui/theme-bridge.css"` (full `@theme` bridge)
- [ ] `html, body { font-family: var(--font-family-sans); }`
- [ ] `ThemeScript` + `BurneUIProvider` (or `ThemeProvider`) for light/dark
- [ ] Optional: `configureMotion(...)`, Toast via provider
