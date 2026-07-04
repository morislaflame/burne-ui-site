# Slider

Value slider (single or range) with draggable thumb, fill along the rail, and optional marks. Simple API and compound (`Header` / `Track` / `Thumb`). Horizontal and vertical orientation.

## Import

```tsx
import {
  Slider,
  sliderThicknessToCss,
  type SliderRootProps,
  type SliderSingleProps,
  type SliderRangeProps,
  type SliderOrientation,
  type SliderSize,
  type SliderClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
<Slider
  label="Volume"
  showValue
  defaultValue={55}
  min={0}
  max={100}
  step={5}
  marks={[0, 25, 50, 75, 100]}
/>
```

### Range

```tsx
<Slider
  range
  defaultValue={[20, 80]}
  label="Range"
  showValue
/>
```

### Compound API

```tsx
<Slider defaultValue={40} min={0} max={100}>
  <Slider.Header>
    <Slider.Label>Brightness</Slider.Label>
    <Slider.Value />
  </Slider.Header>
  <Slider.Track icon={<IoSunny aria-hidden />} gloss />
  <Slider.Hint>Drag the thumb</Slider.Hint>
</Slider>
```

Low-level track:

```tsx
<Slider.Track min={0} max={100} value={v} onValueChange={setV}>
  <Slider.Rail />
  <Slider.Fill />
  <Slider.Thumb />
  <Slider.Icon>…</Slider.Icon>
</Slider.Track>
```

Range compound: `<Slider.Thumb thumb="start" />` + `<Slider.Thumb thumb="end" />`.

### Root props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `orientation` | `horizontal` | `horizontal` \| `vertical` |
| `size` | `base` | thumb/size tokens |
| `thickness` | — | Rail height/width (px/rem) |
| `min` / `max` / `step` | `0` / `100` / `1` | Range |
| `marks` | — | Snap points |
| `range` | `false` | Two thumbs |
| `value` / `defaultValue` | — | `number` or `[number, number]` |
| `formatValue` | — | Text format in `Slider.Value` |
| `gloss` | `false` | Gloss thumb shell |
| `icon` | — | Icon inside thumb |
| `disabled` | `false` | |
| `showValue` | simple | Show value in header |
| `classNames` | — | see styling |

### `SliderClassNames`

`root`, `label`, `header`, `value`, `hint`, `error`, `track`, `rail`, `fill`, `thumb`, `thumbShell`, `mark`.

`Slider.Track` accepts a local pick: `track`, `rail`, `fill`, `thumb`, `thumbShell`, `mark`.

## Animations

`sliderAnimations.ts` + pointer drag in `useSliderTrackState` (no GSAP on position).

**DOM (horizontal):**

```
Field.Root
  Slider.Track ref=trackRef
    <Slider.Rail />
    <span fill ref=fillRef style=left/width>    ← instant CSS updates
    <button role=slider thumb>                  ← left % position
      SelectionThumb active={dragging}
```

### 1. Thumb position (CSS, not GSAP)

On drag / keyboard / value change:

- `percent = sliderThumbCenterPercent(value, min, max, …)`
- thumb `style.left` or `bottom` (vertical)
- fill span via `sliderFillStyleFromSpan` → `applySliderFillStyle` (killMotion + inline styles)

Dragging: `pointerdown` on thumb → capture → `pointermove` → snap step/marks → `onValueChange`.

### 2. Thumb press squeeze

`useSliderThumbPressAnimation` → `animateInteractivePressSqueeze` on thumb `<button>` on pointerdown.

### 3. Thumb shell disabled opacity

`useSliderThumbShellAnimation` — opacity `0.48` when disabled.

### 4. SelectionThumb fill

`SelectionThumb active={activeThumb === kind}` — fill scale via `useSelectionIndicatorAnimation` when thumb is actively dragged/focused.

### 5. Fill cleanup

`useSliderFillCleanup` — `killMotion` on unmount.

### Summary

| What | GSAP? | `configureMotion` |
|------|-------|-------------------|
| Thumb/fill position | No — CSS % | — |
| Press squeeze | Yes | `pressSqueezeScale` |
| Thumb fill pulse | Yes (SelectionThumb) | interactive |
| Marks | CSS position | — |

```ts
configureMotion({ pressSqueezeScale: [1, 0.98, 1], interactiveDuration: 280 });
```

## Styling and customization

### Two levels

1. **`className` on root** — `Field.Root` wrapper.
2. **`classNames` on root** — all slots; `Slider.Track` can override track slots.

### `SliderClassNames` slots

| Slot | DOM | Purpose |
|------|-----|---------|
| `root` | Field root | Padding, border |
| `label` | `Slider.Label` | Label typography |
| `header` | `Slider.Header` | Row label + value |
| `value` | `Slider.Value` | Formatted value text |
| `hint` / `error` | Field hint/error | Secondary |
| `track` | Track hit area | Ring, gloss, orientation size |
| `rail` | Rail background | Track bg |
| `fill` | Selected range fill | Primary tint |
| `thumb` | Thumb button | Hit area |
| `thumbShell` | SelectionThumb | Gloss/border |
| `mark` | Tick marks | Position dots |

### Simple API

```tsx
<Slider
  label="Volume"
  showValue
  defaultValue={55}
  classNames={{
    root: "rounded-mid border border-primary/25 p-base",
    label: "text-primary",
    value: "font-semibold text-primary",
    track: "ring-1 ring-primary/20",
    rail: "bg-primary/10",
    fill: "bg-primary/80",
  }}
/>
```

### Compound API

```tsx
<Slider
  defaultValue={55}
  min={0}
  max={100}
  classNames={{
    root: "rounded-mid border border-primary/25 p-base",
    header: "text-primary",
    value: "font-semibold text-primary",
    track: "ring-1 ring-primary/20",
    rail: "bg-primary/10",
    fill: "bg-primary/80",
    hint: "text-muted/80",
  }}
>
  <Slider.Header>
    <Slider.Label>Volume</Slider.Label>
    <Slider.Value />
  </Slider.Header>
  <Slider.Track />
  <Slider.Hint>All slots via classNames.</Slider.Hint>
</Slider>
```

`thumbClassName` on root/track props — extra classes on thumb button (outside `classNames.thumb` merge chain on track).

### Practical notes

- **Fill/thumb position** — inline styles from logic; do not set a fixed `width` on fill.
- **Vertical:** `orientation="vertical"` — fill via `height`/`bottom`.
- **Range:** two thumbs; fill between start/end values.
- **Merge order:** root `classNames` → `Track.classNames` → part `className`.

## Accessibility

- Thumb: `role="slider"`, `aria-valuemin/max/now`, `aria-valuetext`
- `aria-labelledby` from `Slider.Label` / `aria-label`
- Keyboard: arrows, Home/End, PageUp/Down (step)
- Marks: visual only; value snap on drag

## Utilities

```tsx
sliderThicknessToCss(thickness)  // number | string → CSS
```

## File structure

```
Slider/
├── Slider.tsx
├── index.ts
├── sliderTypes.ts
├── sliderStyles.ts
├── sliderAnimations.ts        # squeeze, fill apply
├── sliderParts.tsx
├── sliderThumbParts.tsx       # SliderThumbButton + SelectionThumb
├── useSliderRootState.ts
├── useSliderTrackState.tsx    # drag, fill geometry
├── sliderAPI.ts
├── sliderA11y.ts
└── Slider.stories.tsx
```

## Storybook

`Core Components/Slider` — single/range, vertical, marks, gloss, compound, `classNames`.
