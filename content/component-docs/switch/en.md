# Switch

On/off toggle with an animated thumb along the track. Simple API (`label` + props control) and compound (`Control` / `Track` / `Thumb` / `Content`). Supports `gloss`, custom `color`, and on/off icons.

## Import

```tsx
import {
  Switch,
  SWITCH_LAYOUT,
  type SwitchRootProps,
  type SwitchSimpleProps,
  type SwitchSize,
  type SwitchLabelPosition,
  type SwitchClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
<Switch
  label="Dark theme"
  hint="Saved to profile"
  defaultChecked
  gloss
  iconOff={<IoMoon aria-hidden />}
  iconOn={<IoSunny aria-hidden />}
/>
```

Control props (`checked`, `iconOff`, `color`, `gloss`, …) can be passed on the root in simple mode.

### Compound API

```tsx
<Switch defaultChecked gloss labelPosition="right">
  <Switch.Control iconOff={<IoMoon aria-hidden />} iconOn={<IoSunny aria-hidden />} />
  <Switch.Content>
    <Switch.Label>Push notifications</Switch.Label>
    <Switch.Hint>Can be disabled in settings</Switch.Hint>
  </Switch.Content>
</Switch>
```

Low-level track markup:

```tsx
<Switch.Control>
  <Switch.Track size="base" gloss>
    <Switch.Fill />
    <Switch.Thumb>
      <Switch.Icon when="off">…</Switch.Icon>
      <Switch.Icon when="on">…</Switch.Icon>
    </Switch.Thumb>
  </Switch.Track>
</Switch.Control>
```

### Root props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `labelPosition` | `right` | `left` \| `right` — control vs text column |
| `disabled` | `false` | opacity track + block input |
| `gloss` | `false` | gloss track/fill/thumb |
| `color` | — | CSS custom fill (`switchFillColorStyle`) |
| `thickness` | — | Custom thumb height (px/rem) |
| `iconOff` / `iconOn` | — | Icons in thumb |
| `label` / `hint` / `error` | — | Simple API |
| `classNames` | — | see styling |

### `SwitchClassNames`

`root`, `control`, `input`, `track`, `fill`, `thumb`, `thumbShell`, `icon`, `content`, `label`, `labelText`, `hint`, `error`, `simpleLabelWrap`, `simpleLabelText`.

`Switch.Control` accepts a local `classNames` pick: `control`, `input`, `track`, `fill`, `thumb`, `thumbShell`, `icon` — merged with root.

### Compound subparts

| Part | Role |
|------|------|
| `Switch.Control` | `<label htmlFor>` + hidden checkbox + track |
| `Switch.Track` | Rail, animations host |
| `Switch.Fill` | Colored track fill when checked |
| `Switch.Thumb` | `SelectionThumb` + slide |
| `Switch.Icon` | `when="off"|"on"` + crossfade |
| `Switch.Content` | Label column |
| `Switch.Label` / `Hint` / `Error` | Text |

## Sizes

From `SWITCH_LAYOUT` / `switchGeometry` — track `2×` thumb diameter (`--selection-indicator-*`).

| size | Track proportion |
|------|------------------|
| `small` … `large` | `w-[calc(2*var(--selection-indicator-{size}))]` |

## Animations

`switchAnimations.ts` — track bundle + text squeeze.

**DOM:**

```
<label root>
  Switch.Control (label htmlFor)
    <input type=checkbox hidden />
    <span track ref=trackRef>
      <span trackFill ref=trackFillRef>     ← opacity fade
      <span thumb ref=thumbRef>             ← translateX slide
        SelectionThumb (thumbShell, thumbFill)
        Switch.Icon off/on refs
```

### 1. Thumb slide

`useSwitchTrackAnimations` → `syncThumbPosition`:

- `travelPx = measureSwitchTravel(track, thumbShell)` (+ ResizeObserver)
- checked: `gsap.to(thumb, { x: travelPx, ...motionSwitchThumb() })`
- unchecked: `x: 0`
- First layout / reduced motion: instant `translate(x, 0)`

`motionSwitchThumb()` — `switchThumbDuration`, `switchThumbEase` in `configureMotion`.

### 2. Track fill opacity

On `checked` toggle:

- on: `fromTo trackFill { autoAlpha:0 } → { autoAlpha:1 }`
- off: `to { autoAlpha:0 }`
- `motionInteractive()`

### 3. Icon crossfade

`iconOffRef` / `iconOnRef`:

- checked: off fade out + scale 0.88; on fade in from 0.88
- unchecked: reverse
- `motionInteractive()`

### 4. Thumb press squeeze

`squeezeToken` increment on `pointerdown` input → `animateInteractivePressSqueeze(thumbShell)`.

### 5. Label text squeeze

`useSwitchTextMotion` → `usePressableElementTextMotion` on root label (like Checkbox).

### 6. Disabled

Track opacity `0.48` instant on `trackRef`.

### Summary

| Animation | `configureMotion` |
|-----------|---------------------|
| Thumb slide | `switchThumbDuration`, `switchThumbEase` |
| Track fill / icons | `interactiveDuration`, `interactiveEase` |
| Press squeeze | `pressSqueezeScale`, `enablePressSqueeze` |

## Styling and customization

### Two levels

1. **`className` on root** — grid `<label>` (in `switchRootGridClass`).
2. **`classNames` on root** — all slots; `Switch.Control` can override track slots locally.

### `SwitchClassNames` slots

| Slot | DOM | Purpose |
|------|-----|---------|
| `root` | Root label grid | Padding, border, gap |
| `control` | Control label cell | Alignment |
| `input` | Hidden checkbox | Hit overlay |
| `track` | Track rail | Ring, gloss surface |
| `fill` | Track fill layer | Checked color (`color` prop) |
| `thumb` | Thumb wrapper | Position (do not break transform) |
| `thumbShell` | SelectionThumb shell | Border, gloss |
| `icon` | Icon wrapper in thumb | Color on/off |
| `content` | Content column | Label stack |
| `label` / `labelText` | Label | Typography |
| `hint` / `error` | Secondary | Muted/error |
| `simpleLabelWrap` / `simpleLabelText` | Simple column | Simple API label |

### Simple API

```tsx
<Switch
  defaultChecked
  label="Push notifications"
  hint="classNames.label on the label cell"
  classNames={{
    root: "rounded-mid border border-primary/25 p-base",
    track: "ring-1 ring-primary/20",
    fill: "bg-primary/90",
    label: "text-success",
    labelText: "font-semibold",
    hint: "text-muted/80",
  }}
/>
```

### Compound API

```tsx
<Switch
  defaultChecked
  gloss
  classNames={{
    root: "rounded-mid border border-primary/25 p-base",
    track: "ring-1 ring-primary/20",
    fill: "bg-primary/90",
    labelText: "text-primary font-semibold",
    hint: "text-muted/80",
  }}
>
  <Switch.Control />
  <Switch.Content>
    <Switch.Label>Dark theme</Switch.Label>
    <Switch.Hint>All slots via classNames.</Switch.Hint>
  </Switch.Content>
</Switch>
```

### Practical notes

- **Do not override `transform` on `thumb`** — GSAP slide uses `x`.
- **`color` prop** — inline style on fill; `classNames.fill` complements it.
- **`labelPosition="left"`** — mirror grid: text on the left, control on the right.
- **Merge order:** root `classNames` → `Control.classNames` → part `className`.

## Accessibility

- Native `input type="checkbox"` + `role="switch"` semantics via label
- `aria-describedby` hint/error
- Icons: `aria-hidden`

## File structure

```
Switch/
├── Switch.tsx
├── index.ts
├── switchTypes.ts
├── switchStyles.ts
├── switchGeometry.ts          # travel measure, SWITCH_LAYOUT
├── switchAnimations.ts        # track + text motion
├── switchParts.tsx
├── useSwitchRootState.ts
├── switchAPI.ts
├── switchA11y.ts
└── Switch.stories.tsx
```

## Storybook

`Core Components/Switch` — simple/compound, gloss, icons, color, `labelPosition`, `classNames`.
