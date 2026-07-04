# Loading

Loading indicator: CSS spinner or three bouncing dots powered by GSAP. Used in buttons (async), Toast, and inline states.

## Import

```tsx
import {
  Loading,
  type LoadingProps,
  type LoadingVariant,
  type LoadingSize,
  type LoadingColor,
} from "burne-ui";
```

## API

Simple API — a single `<span role="status">`.

### Props

| Prop | Type | Default | Description |
|------|-----|--------------|----------|
| `variant` | `spinner` \| `dots` | `spinner` | Indicator type |
| `size` | `small` \| `base` \| `mid` \| `large` | `base` | Size |
| `color` | see below | `primary` | Semantic color |
| `label` | `string` | `"Loading"` | `aria-label` for screen readers |
| `className` | `string` | — | On root |

### `LoadingColor`

`primary` | `foreground` | `muted` | `secondary` | `danger` | `success` | `info` | `warning`

### Examples

```tsx
<Loading />

<Loading variant="dots" size="mid" color="success" label="Saving…" />

// In Toast with isLoading
<Toast status="default" isLoading title="Loading" />
```

## variant

| variant | Implementation | Motion |
|---------|------------|--------|
| `spinner` | CSS `animate-spin` | Tailwind keyframes |
| `dots` | 3 × `<span data-loading-dot>` | GSAP wave |

## Sizes

### Spinner

From `CONTROL_SIZE_LAYOUT`: `spinnerIcon` + `spinnerBorder` (`border-2`).

### Dots

`LOADING_DOTS_LAYOUT` — dot size, gap, jump amplitude:

| size | jumpPx | scalePeak | dot size |
|------|--------|-----------|----------|
| `small` | 5 | 1.25 | `icon-xsmall * 0.45` |
| `base` | 7 | 1.3 | `icon-xsmall * 0.6` |
| `mid` | 9 | 1.35 | `icon-xsmall * 0.75` |
| `large` | 12 | 1.4 | `icon-small * 0.75` |

Track height: `dotSize + jumpPx` (inline style).

## Animations

### 1. Spinner (`variant="spinner"`)

**DOM:**

```
<span role="status">
  <span class="animate-spin border-current border-t-transparent" />
```

- CSS `@keyframes spin` via the `animate-spin` class
- `motion-reduce:animate-none` — stops on reduced motion
- **Not GSAP**, not `configureMotion`

Color: `text-{color}` on the ring (`border-current`).

### 2. Dots wave (`variant="dots"`)

**DOM:**

```
<span role="status">
  <span ref=trackRef>           ← flex items-end, fixed height
    <span data-loading-dot /> × 3
```

`useLoadingDotsAnimation(trackRef, size)` in `loadingAnimations.ts`.

**Cycle per dot** (`runLoadingDotsWave`):

1. GSAP keyframes:
   - **up:** `y: 0 → -jumpPx`, `scale: 1 → scalePeak`, `halfCycleSec`, `easeUp`
   - **down:** `y → 0`, `scale → 1`, `halfCycleSec`, `easeDown`
2. `repeat: -1` (infinite)
3. `delay: staggerSec * index` — wave 1 → 2 → 3
4. `transformOrigin: "50% 100%"` (from the bottom of the dot)

Parameters from `motionLoadingDots()`:

| Parameter | Default | Description |
|----------|---------|----------|
| `loadingDotsDuration` | 900 ms | full up+down cycle for one dot |
| `staggerSec` | duration / 3 | delay between dots |
| `halfCycleSec` | duration / 2 | duration of up or down |
| `loadingDotsEaseUp` | `power2.out` | rise |
| `loadingDotsEaseDown` | `power2.in` | fall |
| `enableLoadingDots` | `true` | GSAP toggle |

**Reduced motion:** dots are static (`y: 0`, `scale: 1`), tweens are not created.

**Config reaction:** `useSyncExternalStore(subscribeMotionConfig)` — tweens are recreated on `configureMotion()`.

#### Dots customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  loadingDotsDuration: 1200,     // slower wave (stagger = 400ms)
  loadingDotsEaseUp: "power2.out",
  loadingDotsEaseDown: "power2.in",
  enableLoadingDots: true,       // false → static dots
});
```

**Not in config:** `jumpPx`, `scalePeak` per size — constants in `LOADING_DOTS_LAYOUT` (`loadingStyles.ts`).

### 3. Where Loading is used

| Location | variant | color |
|-------|---------|-------|
| `Button` async loader | spinner | based on button variant |
| `Toast` `isLoading` | spinner | via `toastLoadingColor(status)` |
| Standalone | both | `color` prop |

### Summary: what is configured where

| Animation | variant | `configureMotion` | Hardcode |
|----------|---------|-------------------|----------|
| Spin | `spinner` | — | CSS `animate-spin` |
| Dots wave | `dots` | `loadingDotsDuration`, eases, `enableLoadingDots` | `jumpPx`, `scalePeak` per size |
| Reduced motion | both | — | `motion-reduce` / prefers-reduced |

## Tokens and CSS

| Element | Classes / tokens |
|---------|-----------------|
| Spinner | `rounded-full border-current border-t-transparent` |
| Dots | `bg-primary` / semantic, `rounded-full` |
| Dots spacing | `gap-xsmall`, `var(--icon-size-xsmall)` |
| Root | `inline-flex shrink-0 items-center justify-center` |

## Styling and customization

Loading is a leaf component: **only `className` on root** (`<span role="status">`). No separate `classNames`.

### What you can customize

| Method | What it changes |
|--------|------------|
| `variant` | `spinner` (ring) or `dots` (three dots) |
| `size` | Spinner / dots layout size |
| `color` | Semantic tint (`primary`, `info`, `danger`, …) |
| `className` | Opacity, margin, display on root |
| `label` | A11y only (`aria-label`), not visible text |

```tsx
<Loading
  variant="dots"
  size="large"
  color="info"
  className="opacity-90 mx-auto"
  label="Syncing"
/>
```

### Spinner vs dots

- **Spinner:** ring is drawn with CSS; `className` affects the whole block, not the ring alone.
- **Dots:** layout from `LOADING_DOTS_LAYOUT`; jump animation via GSAP — `configureMotion({ interactiveDuration })`.

### Embedding

```tsx
<Button disabled className="gap-small">
  <Loading variant="spinner" size="small" color="foreground" className="shrink-0" />
  Saving…
</Button>
```

For custom ring/dots colors, prefer the `color` prop over raw Tailwind on child elements (they are `aria-hidden`).

## Accessibility

- Root: `role="status"`, `aria-live="polite"`, `aria-label={label}`
- Visual parts: `aria-hidden`
- Provide a meaningful `label`: "Saving…", "Loading list"

## File structure

```
Loading/
├── Loading.tsx
├── index.ts
├── loadingTypes.ts
├── loadingStyles.ts          # LOADING_DOTS_LAYOUT
├── loadingParts.tsx          # Spinner, Dots
├── loadingAnimations.ts      # useLoadingDotsAnimation
└── Loading.stories.tsx
```

## Storybook

`Core Components/Loading` — spinner/dots, sizes, color matrix, `configureMotion` for dots.
