# ColorPicker

Color selection in a popover: 2D saturation/value area, hue/alpha sliders, hex input, presets. Compound API built on `Popover`. Standalone `ColorSlider`, `ColorSwatch`, and color utils are also exported.

## Import

```tsx
import {
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  useColorPicker,
  hsvaToHex,
  hexToHsva,
  hsvaToRgba,
  rgbaToHsva,
  type ColorPickerProps,
  type ColorPickerTriggerProps,
  type ColorPickerContentProps,
  type ColorPickerSize,
  type ColorPickerVariant,
  type ColorPickerClassNames,
  type ColorSliderTrackProps,
  type ColorSwatchProps,
  type HSVA,
  type RGBA,
} from "burne-ui";
```

## API

### Compound API

```tsx
<ColorPicker defaultValue="#3b82f6" onValueChange={setColor}>
  <ColorPicker.Trigger />
  <ColorPicker.Content showAlpha presets={["#ef4444", "#22c55e", "#3b82f6"]} />
</ColorPicker>
```

### Controlled

```tsx
<ColorPicker value={color} onValueChange={setColor} open={open} onOpenChange={setOpen}>
  <ColorPicker.Trigger swatchSize="large" />
  <ColorPicker.Content showAlpha />
</ColorPicker>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `value` / `defaultValue` | `#3b82f6` | Hex string |
| `onValueChange` | — | `(hex: string) => void` |
| `open` / `defaultOpen` / `onOpenChange` | — | Popover state |
| `size` | `base` | `small` \| `base` \| `mid` |
| `variant` | `default` | `default` \| `gloss` (→ `Popover`) |
| `side` | `bottom` | Popover side |
| `disabled` | `false` | Disables trigger |
| `classNames` | — | Slots |

### `ColorPicker.Trigger` props

| Prop | Description |
|------|-------------|
| `swatchSize` | `ColorSwatchSize` for preview |
| `className` | On trigger button |

### `ColorPicker.Content` props

| Prop | Default | Description |
|------|---------|-------------|
| `showAlpha` | `false` | Alpha slider + input |
| `presets` | — | Array of hex values for quick pick |
| `className` | — | On content wrapper |

### `ColorPickerClassNames`

`content`, `contentPanel`, `trigger`, `area`, `areaThumb`, `slidersRow`, `previewSwatch`, `hueSlider`, `alphaSlider`, `inputsRow`, `hexInput`, `hexPrefix`, `hexInputField`, `alphaInput`, `alphaInputField`, `alphaSuffix`, `presets`, `presetSwatch`.

### Standalone `ColorSlider`

```tsx
<ColorSlider channel="hue" value={hue} onValueChange={setHue} size="base">
  <ColorSlider.Track />
</ColorSlider>
```

Channels: `hue`, `saturation`, `value`, `alpha`, `red`, `green`, `blue`.

### Standalone `ColorSwatch`

```tsx
<ColorSwatch color="#3b82f6" size="base" shape="circle" onClick={handlePick} />
```

## variant and sizes

| `ColorPicker` size | Panel width | Area height |
|--------------------|-------------|-------------|
| `small` | `w-52` | `h-32` |
| `base` | `w-64` | `h-40` |
| `mid` | `w-72` | `h-48` |

| `ColorPicker` variant | Behavior |
|-----------------------|----------|
| `default` | Standard popover panel |
| `gloss` | Gloss popover surface |

No `status`.

**ColorSwatch sizes:** `xsmall` … `xlarge`. **Shapes:** `square`, `rounded`, `circle`.

## Animations

Motion is split: pointer drag (no GSAP) + Popover portal + optional swatch GSAP.

**DOM:**

```
<Popover>
  <Trigger>
    <ColorSwatch />                    ← optional GSAP hover (interactive)
  <Content>
    <div class=area>                   ← pointer drag 2D (sat × val)
      <div class=areaThumb />
    <ColorSlider channel=hue />
    <ColorSlider channel=alpha />      ← if showAlpha
    <input hex /> <input alpha />
    <presets row of ColorSwatch />
```

### 1. Popover open/close

`ColorPicker` is wrapped in `Popover` — portal `motionTooltip()`, trigger squeeze. See `Popover.md`.

### 2. 2D area drag (`useColorPickerAreaDrag`)

`colorPickerAnimations.ts` — **no GSAP**:

- `pointerdown` / `pointermove` on saturation×value canvas
- Updates HSVA → `onValueChange` hex
- Thumb position — CSS left/top %

### 3. ColorSlider drag

Pointer + keyboard on `SliderThumbButton` (shared Slider patterns).

### 4. Interactive ColorSwatch

When `onClick` / in trigger:

- `useFirstLevelInteractiveMotion` — hover lift + press squeeze (GSAP)
- `SHADOW_LIFT_MOTION_CLASS`

#### Swatch motion customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.03,
  pressSqueezeScale: [1, 0.98, 1],
});
```

### What's not included

- GSAP on area thumb / hue slider position
- Built-in ripple
- `status` semantic surfaces

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|--------------------------|------------|
| Popover portal | `Popover` | `tooltipDuration` | `variant` |
| 2D area drag | `useColorPickerAreaDrag` | — | pointer events |
| Slider thumb | ColorSlider | — | `channel` |
| Swatch hover/squeeze | `useFirstLevelInteractiveMotion` | `hoverLiftScale`, `pressSqueezeScale` | `onClick` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| Panel | `rounded-mid shadow-token-md p-plus` |
| Area | `rounded-small bg-secondary` |
| Inputs | `font-mono`, `border-token` |
| Presets row | `gap-xsmall` flex |
| `sliderTrackHitAreaClass` | Shared with `Slider` |

## Styling and customization

### Two levels

1. **`classNames` on `ColorPicker` root** — all panel and trigger slots.
2. **`className` on `Trigger` / `Content`** — additional sub-part classes.

`ColorSwatch` / `ColorSlider` — own `className` (standalone).

### Slots (key)

| Slot | DOM | When to use |
|------|-----|-------------|
| `trigger` | Popover trigger | Ring, size override |
| `contentPanel` | Inner panel | Border, padding |
| `area` | 2D picker | Custom gradient frame |
| `areaThumb` | Thumb handle | Size, border ring |
| `hueSlider` / `alphaSlider` | Slider rows | Track height/color |
| `hexInputField` | Hex input | Monospace, width |
| `presets` / `presetSwatch` | Preset row | Gap, swatch size |

### With alpha and presets

```tsx
<ColorPicker
  value={color}
  onValueChange={setColor}
  size="mid"
  classNames={{
    contentPanel: "border border-primary/20",
    area: "ring-1 ring-primary/15",
    hexInputField: "text-primary font-mono",
    presetSwatch: "ring-1 ring-background",
  }}
>
  <ColorPicker.Trigger swatchSize="large" />
  <ColorPicker.Content
    showAlpha
    presets={["#ef4444", "#22c55e", "#3b82f6", "#a855f7"]}
  />
</ColorPicker>
```

### Practical notes

- `useColorPicker()` — access to HSVA/hex from compound children.
- Utils: `hsvaToHex`, `hexToHsva`, `rgbaToHsva`, etc. for custom UI.
- `disabled` only blocks the trigger; for read-only, do not open the popover.
- Presets — array of hex strings; click immediately changes value.
- **Popover positioning** — do not override `left`/`top` on content.

## Integrations

| Component | Scenario |
|-----------|----------|
| `Popover` | Portal + trigger squeeze |
| `Slider` | `ColorSlider` track/thumb |
| `Input` | Hex field styling patterns |

## Accessibility

- Trigger: `aria-label="Selected color: {hex}"`
- Content: `aria-label="Color selection"`
- 2D area: `role="group"`, `aria-label="Saturation and brightness"`
- Hex input: `aria-label="Hex code of the color"`
- Alpha input: `aria-label="Transparency (%)"`
- ColorSlider thumb: spinbutton semantics + channel labels
- ColorSwatch: `aria-label` when interactive; otherwise `aria-hidden`
- Focus: `focus-visible:ring-2 ring-primary`

## File structure

```
ColorPicker/
├── ColorPicker.tsx
├── index.ts
├── colorPickerTypes.ts
├── colorPickerStyles.ts
├── colorPickerAnimations.ts
├── colorPickerParts.tsx
├── colorPickerContext.tsx
├── colorPickerAPI.ts
├── colorPickerA11y.ts
├── useColorPickerRootState.ts
├── colorUtils.ts
├── ColorSlider.tsx
├── colorSliderTypes.ts
├── colorSliderStyles.ts
├── ColorSwatch.tsx
└── ColorPicker.stories.tsx
```

## Storybook

`Core Components/ColorPicker` — basic, alpha, presets, sizes, uncontrolled, ColorSlider channels, ColorSwatch shapes, `CustomClassNames`.
