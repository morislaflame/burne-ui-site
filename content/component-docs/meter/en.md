# Meter

Indicator of the current value within a range (`role="meter"`). Do not confuse with ProgressBar: meter shows a **level** (memory, charge), not task progress. Simple API and compound (`Header` / `Track` / `Hint`).

## Import

```tsx
import {
  Meter,
  useMeterFieldContext,
  type MeterRootProps,
  type MeterTrackProps,
  type MeterSize,
  type MeterOrientation,
  type MeterClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
<Meter
  label="Storage"
  showValue
  value={72}
  min={0}
  max={100}
  color="var(--color-info)"
  hint="Read-only scale"
/>
```

### Compound API

```tsx
<Meter value={45} min={0} max={100} orientation="vertical">
  <Meter.Header>
    <Meter.Label>CPU</Meter.Label>
    <Meter.Value />
  </Meter.Header>
  <Meter.Track value={45} color="var(--color-warning)" />
  <Meter.Hint>Current load</Meter.Hint>
</Meter>
```

### Root props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `value` | — | Current value (required for track) |
| `min` / `max` | `0` / `100` | Range |
| `orientation` | `horizontal` | `horizontal` \| `vertical` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` — track thickness |
| `thickness` | — | Custom thickness (px/rem) |
| `color` | — | CSS color fill |
| `formatValue` | — | Text for `Meter.Value` / `aria-valuetext` |
| `showValue` | simple | Show formatted value in header |
| `label` / `hint` / `error` | — | Simple API |
| `classNames` | — | see styling |

### `MeterClassNames`

`root`, `label`, `header`, `value`, `track`, `fill`, `hint`, `error`.

### Compound subparts

| Part | Role |
|------|------|
| `Meter.Header` | Row label + value |
| `Meter.Label` | Title |
| `Meter.Value` | Formatted value (`display.statusText`) |
| `Meter.Track` | `role="meter"` + fill |
| `Meter.Hint` / `Meter.Error` | Hint / error |

## Behavior

- Value is clamped to `[min, max]`
- Fill width/height = percent of range
- **Read-only** — no user interaction on track
- `Meter.Value` reads `display` from field context (auto sync on value change)

## Animations

`meterAnimations.ts` → `useMeterFillAnimation`.

**DOM:**

```
Field
  Meter.Header (optional)
  <div role=meter track style=thickness>
    <span fill ref=fillRef style=initial %>   ← GSAP width/height
  </div>
```

### Fill resize (value change)

When `value` changes:

1. `fillTargetStyle` — target `width` (horizontal) or `height` (vertical)
2. **First layout / reduced motion:** instant inline style
3. Otherwise: `gsap.to(fill, { width|height: target, ...motionInteractive() })`

No indeterminate mode. No thumb/drag.

### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 320,
  interactiveEase: "power2.out",
});
```

### Summary

| Animation | GSAP | `configureMotion` |
|-----------|------|-------------------|
| Fill resize | Yes | `interactiveDuration`, `interactiveEase` |
| Track | CSS | — |

## Styling and customization

### Two levels

1. **`className` on root** — `Field` wrapper.
2. **`classNames` on root** — `MeterClassNamesProvider`.

Subparts accept **`className`** on top of the slot.

### `MeterClassNames` slots

| Slot | DOM | Purpose |
|------|-----|---------|
| `root` | `Field` | Padding, border, orientation layout |
| `label` | `Meter.Label` | Typography |
| `header` | `Meter.Header` | Row layout label + value |
| `value` | `Meter.Value` | Value color/weight |
| `track` | `role="meter"` | Rail, ring, thickness |
| `fill` | Fill span | Tint, opacity (`color` prop) |
| `hint` / `error` | Field hint/error | Secondary text |

### Simple API

```tsx
<Meter
  label="Storage"
  showValue
  value={72}
  color="var(--color-info)"
  classNames={{
    root: "rounded-mid border border-primary/20 p-base",
    header: "text-primary",
    value: "text-info font-semibold",
    track: "ring-1 ring-primary/15",
    fill: "opacity-90",
    hint: "text-muted/80",
  }}
  hint="Read-only scale"
/>
```

### Compound API

```tsx
<Meter
  value={85}
  classNames={{
    root: "max-w-md",
    track: "bg-surface-elevated",
    fill: "bg-success/80",
  }}
>
  <Meter.Header>
    <Meter.Label className="font-semibold">Memory</Meter.Label>
    <Meter.Value className="text-success" />
  </Meter.Header>
  <Meter.Track />
</Meter>
```

### Practical notes

- **`color` prop** — inline on fill; `classNames.fill` for opacity/gradient.
- **Vertical:** `orientation="vertical"` — fill by `height`.
- **Do not set a fixed width on fill** — animated via GSAP/inline.
- **Merge order:** base → `classNames.slot` → subpart `className`.

## Accessibility

- `role="meter"` on track
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`
- `aria-labelledby` from label; `aria-describedby` hint/error
- Fill: `aria-hidden`

## Context

`useMeterFieldContext()` — `display`, `orientation`, ids for a11y.

## File structure

```
Meter/
├── Meter.tsx
├── index.ts
├── meterTypes.ts
├── meterStyles.ts
├── meterAnimations.ts       # useMeterFillAnimation
├── meterParts.tsx
├── useMeterRootState.ts
├── useMeterTrackState.ts
├── meterAPI.ts
├── meterA11y.ts
└── Meter.stories.tsx
```

## Storybook

`Core Components/Meter` — horizontal/vertical, sizes, color, compound, `classNames`.
