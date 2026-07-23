# ToggleButton

A button with pressed state and animated fill. Used standalone and in `ToggleButtonGroup`. Variants match secondary controls; motion coordinates fill with press squeeze.

## Import

```tsx
import {
  ToggleButton,
  type ToggleButtonProps,
  type ToggleButtonSize,
  type ToggleButtonVariant,
  type ToggleButtonClassNames,
} from "burne-ui";
```

## API

### Standalone

```tsx
<ToggleButton
  defaultPressed
  variant="outline"
  icon={<IoHeartOutline aria-hidden />}
  onPressedChange={setLiked}
>
  Like
</ToggleButton>
```

### In ToggleButtonGroup

```tsx
<ToggleButtonGroup type="multiple" defaultValue={["bold"]}>
  <ToggleButton value="bold">Bold</ToggleButton>
  <ToggleButton value="italic">Italic</ToggleButton>
</ToggleButtonGroup>
```

In a group: `value` is required; `pressed` / selection comes from context; `role` and `aria-pressed` / `aria-checked` depend on `type`.

### Props

| Prop | Default | Description |
|------|--------------|----------|
| `pressed` / `defaultPressed` | — | Controlled / uncontrolled |
| `onPressedChange` | — | `(pressed: boolean) => void` |
| `onFillStart` | — | Callback at the start of the fill animation |
| `variant` | `default` | `default` \| `outline` \| `ghost` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `fillColor` | auto | CSS color for the fill |
| `value` | — | For ToggleButtonGroup |
| `groupSegment` | — | ButtonGroup segment |
| `icon` + `iconPosition` | — | Icons |
| `animated` | `true` | Hover lift + squeeze + fill |
| `disabled` | `false` | |
| `classNames` | — | see styling |

### `ToggleButtonClassNames`

`root`, `fill`, `content`, `icon`, `icon` + `iconPosition="end"`, `label`.

Leaf component: no compound API; customization via props + `classNames`.

## variant

| variant | Behavior |
|---------|-----------|
| `default` | Surface + hover shadow lift |
| `outline` | Border, hover lift |
| `ghost` | Transparent |
| `gloss` | `gloss-btn` + gloss squeeze (no hover shadow) |

## Animations

`toggleButtonAnimations.ts` + `useToggleButtonFillAnimation.ts` + `useFirstLevelInteractiveMotion`.

**DOM:**

```
<button ref=setRefs>
  <span fill ref=fillRef>          ← scale fill (pressed)
  <span content ref=contentMotionRef>
    icon | label | icon (end)
</button>
```

### 1. Fill (pressed state)

`animateToggleButtonFill(fill, pressed)`:

- pressed: `fromTo { scale:0, autoAlpha:0 } → { scale:1, autoAlpha:1 }`
- unpressed: `to { scale:0, autoAlpha:0 }`
- vars: `motionSelectionFill()` — `interactiveDuration * 1.15`, `selectionFillEase`
- `enableToggleButtonFill: false` → instant

**Coordination with press:** when `animated`, fill starts in the **release phase of squeeze** (`onPressReleaseStart`), not on pointerdown — so the fill aligns with button release.

Flow:

1. `pointerdown` → `deferFillFromPressRef = true`, `pendingFill = !pressed`
2. squeeze release → `runPendingFill()` → `animateTo(next)`
3. `click` → `queueFillOnClick` if release already passed
4. `pointerleave` → reset coordination

### 2. Hover lift + squeeze (1st level)

`useFirstLevelInteractiveMotion`:

- **default/outline/ghost:** sm→md shadow + hover lift + press squeeze
- **gloss:** gloss squeeze, no hover shadow
- **ButtonGroup segment:** squeeze on `contentMotionRef` instead of root

### 3. Disabling

```tsx
<ToggleButton animated={false}>No motion</ToggleButton>
```

```ts
configureMotion({ enableHoverLift: false, enablePressSqueeze: false, enableToggleButtonFill: false });
```

### Summary

| Animation | `configureMotion` |
|----------|-------------------|
| Fill scale | `selectionFillEase`, `interactiveDuration`, `enableToggleButtonFill` |
| Hover/squeeze | `enableHoverLift`, `pressSqueezeScale` |
| Gloss squeeze | gloss interactive tokens |

## Styling and customization

### Two levels

1. **`className`** — merged into the `root` slot of the button.
2. **`classNames`** — `root`, `fill`, `content`, `icon`, `icon` + `iconPosition="end"`, `label`.

### Slots

| Slot | DOM | Purpose |
|------|-----|------------|
| `root` | `<button>` | Ring, min-width, segment rounding |
| `fill` | Absolute fill layer | Tint pressed (`fillColor`) |
| `content` | Flex row | Gap icons + label |
| `icon` + `iconPosition` | Icon wrappers | Size/color |
| `label` | `Text` children | Font weight |

### Example

```tsx
<ToggleButton
  defaultPressed
  variant="outline"
  icon={<IoHeartOutline aria-hidden />}
  className="min-w-[8rem]"
  classNames={{
    root: "rounded-mid ring-1 ring-danger/25",
    fill: "bg-danger/20",
    content: "gap-small",
    icon: "text-danger",
    label: "font-semibold text-danger",
  }}
>
  Like
</ToggleButton>
```

### In ToggleButtonGroup

Styles on each button; the group sets `size` / `variant` / `disabled` via context.

```tsx
<ToggleButtonGroup type="single" variant="ghost" size="small">
  <ToggleButton value="a" classNames={{ label: "text-mid" }}>A</ToggleButton>
  <ToggleButton value="b">B</ToggleButton>
</ToggleButtonGroup>
```

### Practical notes

- **Do not set `style={{ transform, opacity }}` on fill** — React will overwrite GSAP.
- **`fillColor`:** semantic tint; `classNames.fill` for opacity/rounded.
- **Segment glue:** `groupSegment` — rounding from ButtonGroup, do not duplicate on root.
- **Merge order:** variant classes → `classNames` → `className`.

## Accessibility

- `role="button"` standalone; in group — `role` depends on `type` (`group` radiogroup-like)
- `aria-pressed` (multiple) / `aria-checked` (single)
- `tabIndex` in group: roving `0` / `-1`
- Focus ring: `focus-ring`

## Integration

| Context | Behavior |
|----------|-----------|
| `ToggleButtonGroup` | selection, `tabIndexFor`, shared `variant`/`size` |
| `ButtonGroup` | `groupSegment` glue |

## File structure

```
ToggleButton/
├── ToggleButton.tsx
├── index.ts
├── toggleButtonTypes.ts
├── toggleButtonStyles.ts
├── toggleButtonAnimations.ts      # motion + fill coordination
├── useToggleButtonFillAnimation.ts
├── toggleButtonParts.tsx          # Fill, Content
├── useToggleButtonRootState.ts
├── toggleButtonAPI.ts
├── toggleButtonA11y.ts
└── ToggleButton.stories.tsx
```

## Storybook

`Core Components/ToggleButton` — variants, sizes, gloss, group, icons, `classNames`, fill coordination.
