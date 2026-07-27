# ProgressBar

Progress indicator (`role="progressbar"`): determinate value or **indeterminate** loading. Simple API and compound. Similar layout to Meter, but different semantics and animations.

## Import

```tsx
import {
  ProgressBar,
  useProgressBarFieldContext,
  type ProgressBarRootProps,
  type ProgressBarTrackProps,
  type ProgressBarSize,
  type ProgressBarOrientation,
  type ProgressBarClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
<ProgressBar
  label="Loading"
  showValue
  value={62}
  color="var(--color-info)"
  hint="Depends on network speed"
/>
```

### Indeterminate

```tsx
<ProgressBar label="Syncing" indeterminate />
```

### Compound API

```tsx
<ProgressBar value={40} showValue>
  <ProgressBar.Header>
    <ProgressBar.Label>File upload</ProgressBar.Label>
    <ProgressBar.Value />
  </ProgressBar.Header>
  <ProgressBar.Track value={40} />
  <ProgressBar.Hint>62% complete</ProgressBar.Hint>
</ProgressBar>
```

### Root props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `value` | `0` | Progress (determinate) |
| `indeterminate` | `false` | Running fill animation |
| `min` / `max` | `0` / `100` | Range |
| `orientation` | `horizontal` | `horizontal` \| `vertical` |
| `size` | `base` | Track thickness |
| `thickness` | — | Custom px/rem |
| `color` | — | CSS color fill |
| `formatValue` | — | Value text / `aria-valuetext` |
| `showValue` | simple | Header value |
| `classNames` | — | see styling |

### `ProgressBarClassNames`

`root`, `label`, `header`, `value`, `track`, `fill`, `indeterminateFill`, `hint`, `error`.

### Compound subparts

| Part | Role |
|------|------|
| `ProgressBar.Header` | Label + value row |
| `ProgressBar.Label` / `Value` | Title / percentage |
| `ProgressBar.Track` | `role="progressbar"` |
| `ProgressBar.Hint` / `Error` | Hint / error |

## Meter vs ProgressBar

| | Meter | ProgressBar |
|---|-------|-------------|
| role | `meter` | `progressbar` |
| Semantics | Current level | Progress toward a goal |
| Indeterminate | no | yes |
| Fill motion | `motionInteractive` | `motionProgressFill` |

## Animations

`progressBarAnimations.ts` → `useProgressBarFillAnimation`.

**DOM (determinate):**

```
<div role=progressbar track>
  <span fill ref=fillRef>    ← 100% box + GSAP scaleX/scaleY
</div>
```

**DOM (indeterminate):**

```
<div role=progressbar aria-busy track>
  <span indeterminateFill ref=fillRef>   ← translate loop
</div>
```

### 1. Determinate fill

When `value` changes:

- fill spans the full track (`width/height: 100%`); progress = `scaleX` (horizontal, origin left) / `scaleY` (vertical, origin bottom)
- **First layout / reduced / `enableProgressFill: false`:** instant `gsap.set`
- Otherwise: `gsap.to(fill, { scaleX|scaleY, ...motionProgressFill() })`

`motionProgressFill()` — `progressFillDuration`, `progressFillEase`.

### 2. Indeterminate slide

`indeterminate={true}`:

```ts
gsap.fromTo(fill,
  { x: -fillSize },      // horizontal
  { x: trackSize, duration: 1.5, ease: "expo.inOut", repeat: -1 }
);
```

Constants: `PROGRESS_INDETERMINATE_MS = 1500`, `PROGRESS_INDETERMINATE_EASE = "expo.inOut"`.

ResizeObserver on track/fill — restart on resize.

Reduced motion: no translate loop.

### Customization

```ts
configureMotion({
  progressFillDuration: 400,
  progressFillEase: "power2.out",
  enableProgressFill: true,
});
```

### Summary

| Mode | Animation | Configuration |
|------|-----------|---------------|
| Determinate | GSAP `scaleX`/`scaleY` | `progressFillDuration`, `enableProgressFill` |
| Indeterminate | GSAP translate loop | hardcode 1500ms, expo.inOut |
| Value text | React re-render | `formatValue` |

## Styling and customization

### Two levels

1. **`className` on root** — `Field`.
2. **`classNames` on root** — all slots.

### `ProgressBarClassNames` slots

| Slot | DOM | Purpose |
|------|-----|---------|
| `root` | `Field` | Padding, border |
| `label` | Label | Typography |
| `header` | Header row | Layout |
| `value` | Value text | Percentage / status |
| `track` | progressbar rail | Background |
| `fill` | Determinate fill | Color, opacity |
| `indeterminateFill` | Indeterminate bar | Width fraction, color |
| `hint` / `error` | Secondary | Muted/error |

### Simple API

```tsx
<ProgressBar
  label="Loading"
  showValue
  value={62}
  color="var(--color-info)"
  classNames={{
    root: "rounded-mid border border-primary/20 p-base",
    value: "text-info font-semibold",
    track: "bg-primary/10",
    fill: "opacity-95",
    hint: "text-muted/80",
  }}
  hint="Remaining time depends on network"
/>
```

### Indeterminate styling

```tsx
<ProgressBar
  indeterminate
  label="Processing"
  classNames={{
    track: "bg-muted/20",
    indeterminateFill: "bg-primary w-1/3",
  }}
/>
```

### Compound API

```tsx
<ProgressBar value={75} classNames={{ fill: "bg-success" }}>
  <ProgressBar.Header>
    <ProgressBar.Label>Export</ProgressBar.Label>
    <ProgressBar.Value />
  </ProgressBar.Header>
  <ProgressBar.Track />
</ProgressBar>
```

### Practical notes

- **`indeterminateFill` vs `fill`:** different DOM elements — style the appropriate slot.
- **`color` prop** — inline tint; classNames complement it.
- **Do not set `transform` / scale on determinate fill** — controlled by animation (`scaleX`/`scaleY`).
- **Merge order:** base → `classNames` → `className`.

## Accessibility

- `role="progressbar"`
- Determinate: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`
- Indeterminate: `aria-busy={true}`, no `valuenow`
- Label / describedby same as Meter

## Context

`useProgressBarFieldContext()` — `display` with `indeterminate` flag.

## File structure

```
ProgressBar/
├── ProgressBar.tsx
├── index.ts
├── progressBarTypes.ts
├── progressBarStyles.ts
├── progressBarAnimations.ts    # determinate + indeterminate
├── progressBarParts.tsx
├── useProgressBarRootState.ts
├── useProgressBarTrackState.ts
├── progressBarAPI.ts
├── progressBarA11y.ts
└── ProgressBar.stories.tsx
```

## Storybook

`Core Components/ProgressBar` — determinate, indeterminate, vertical, color, `classNames`.
