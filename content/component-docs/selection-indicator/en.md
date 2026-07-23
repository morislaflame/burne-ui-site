# SelectionIndicator

Visual selection indicator: a round shell, fill layer, and mark (checkmark, dot, or custom icon). Low-level primitive for Checkbox, Radio, ListBox, and other controls. Not interactive on its own (`aria-hidden`).

## Import

```tsx
import {
  SelectionIndicator,
  useSelectionIndicatorAnimation,
  selectionIndicatorShellClass,
  selectionIndicatorFallbackPx,
  type SelectionIndicatorProps,
  type SelectionIndicatorSize,
  type SelectionIndicatorVariant,
  type SelectionIndicatorClassNames,
} from "burne-ui";
```

## API

### Simple API (props)

```tsx
<SelectionIndicator
  selected={checked}
  size="base"
  variant="outline"
  check
/>

<SelectionIndicator selected={isOn} dot variant="gloss" />

<SelectionIndicator selected={active} icon={<IoStar aria-hidden />} />
```

### Compound API (Fill / Mark slots)

```tsx
<SelectionIndicator selected={checked} size="mid" variant="secondary">
  <SelectionIndicator.Fill className="bg-primary/20" />
  <SelectionIndicator.Mark>
    <IoCheckmark aria-hidden />
  </SelectionIndicator.Mark>
</SelectionIndicator>
```

If `children` contains `SelectionIndicator.Fill` or `.Mark`, compound layout mode is enabled.

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `selected` | — | **Required.** Active state → fill/mark animation |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `variant` | `base` | `base` \| `secondary` \| `outline` \| `gloss` |
| `check` | `false` | Default checkmark `IoCheckmarkSharp` |
| `dot` | `false` | Radio dot (inner circle) |
| `icon` | — | Custom mark (takes priority over check/dot) |
| `className` | — | Merged into **shell** |
| `classNames` | — | `shell`, `fill`, `mark` |

### `SelectionIndicatorClassNames`

```tsx
type SelectionIndicatorClassNames = {
  shell?: string;
  fill?: string;
  mark?: string;
};
```

### Compound sub-parts

| Part | Role |
|------|------|
| `SelectionIndicator.Fill` | Fill layer with ref for GSAP |
| `SelectionIndicator.Mark` | Mark layer (icon/dot) with ref for GSAP |

## variant

| variant | Shell | Fill | Mark |
|---------|-------|------|------|
| `base` | `border-primary bg-surface` | `bg-indicator` | `text-indicator-foreground` |
| `secondary` | `border-token bg-secondary` | `bg-secondary` | `text-secondary-foreground` |
| `outline` | `border-primary bg-surface` | **no fill** | dot/check foreground color |
| `gloss` | `gloss-indicator` | `gloss-indicator-fill` | `text-foreground` |

`outline` — border only; fill is not rendered (`selectionIndicatorShowsFill`).

## Sizes

CSS variables: `--selection-indicator-small` … `--selection-indicator-large`.

| size | CSS class | Icon class |
|------|-----------|------------|
| `small` | `selection-indicator-small` | `icon-xsmall` |
| `base` | `selection-indicator-base` | `icon-xsmall` |
| `mid` | `selection-indicator-mid` | `icon-base` |
| `large` | `selection-indicator-large` | `icon-mid` |

Utility `selectionIndicatorFallbackPx(size)` — px for layout without DOM.

## Animations

`useSelectionIndicatorAnimation.ts` — the only motion hook.

**DOM structure:**

```
<span shell aria-hidden>              ← rounded-full shell
  <span fill ref=fillRef>             ← scale 0→1, z-0
  <span mark ref=markRef>             ← check/dot/icon, z-2
</span>
```

### Pipeline (`selected` toggle)

1. **First layout:** instant `applyInstant(selected)` — no GSAP
2. **Reduced motion:** instant scale/opacity, `killMotion`
3. **Fill (if variant ≠ outline):**
   - select: `gsap.fromTo(fill, { scale:0, autoAlpha:0 }, { scale:1, autoAlpha:1, ...motionSelectionFill() })`
   - deselect: `gsap.to(fill, { scale:0, autoAlpha:0, ... })`
4. **Mark (if present):**
   - select: `fromTo mark { scale:0.88, autoAlpha:0 } → { scale:1, autoAlpha:1 }` — same `motionSelectionFill()`
   - deselect: `to { scale:0.92, autoAlpha:0 }`

Initial inline style on Fill/Mark: `scale(0)`, `opacity: 0`.

### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  selectionFillDuration: 280,
  selectionFillEase: "back.out(1.25)",
});
```

### Summary

| Layer | Animated | `configureMotion` |
|-------|----------|-------------------|
| Fill | scale + autoAlpha | `selectionFillDuration`, `selectionFillEase` |
| Mark | scale + autoAlpha | same |
| Shell | CSS only | — |

## Styling and customization

### Two levels

1. **`className`** — merged into **shell** (along with `classNames.shell`).
2. **`classNames`** — `shell`, `fill`, `mark`.

In compound API, `SelectionIndicator.Fill` / `.Mark` accept their own **`className`** on top of the slot.

### Slots

| Slot | Element | Purpose |
|------|---------|---------|
| `shell` | Outer circle | Border, gloss, size |
| `fill` | Absolute inset fill | Checked fill color |
| `mark` | Check/dot/icon | Icon size, mark color |

### Standalone

```tsx
<SelectionIndicator
  selected={isSelected}
  variant="outline"
  check
  className="ring-2 ring-primary/30"
  classNames={{
    root: "border-primary/50",
    fill: "bg-primary/30",
    mark: "text-primary",
  }}
/>
```

### Via parent controls

Slots are forwarded from the control root:

```tsx
// Checkbox
<Checkbox classNames={{ indicator: "…", indicatorFill: "…", indicatorMark: "…" }}>

// Radio — same
// ListBox.ItemIndicator classNames={{ itemIndicatorShell, itemIndicatorFill, … }}
```

Mapping: `indicator` → shell, `indicatorFill` → fill, `indicatorMark` → mark.

### Compound custom mark

```tsx
<SelectionIndicator selected dot variant="gloss" size="large">
  <SelectionIndicator.Fill className="bg-primary-tint" />
  <SelectionIndicator.Mark className="text-primary">
    <span className="size-2 rounded-full bg-current" />
  </SelectionIndicator.Mark>
</SelectionIndicator>
```

### Practical notes

- **`check` vs `dot` vs `icon`:** mutually exclusive priorities — `icon` > custom Mark child > `check` > `dot`.
- **outline:** no fill — style only shell + mark.
- **Not interactive:** do not attach pointer-events; click on the parent.
- **Merge order:** variant classes → `classNames` → `className` (shell).

## Built-in usage

| Component | Mode |
|-----------|------|
| `Checkbox` | `check`, variants mapped |
| `Radio` | `dot` |
| `ListBox.ItemIndicator` | `check` / radio dot per `indicatorMode` |
| `Checkbox.Indicator` / `Radio.Indicator` | compound `.Fill` / `.Mark` |

## Accessibility

- Root: `aria-hidden` — semantics on the native input parent
- Mark/fill: decorative

## Exported utilities

```tsx
selectionIndicatorShellClass(size, className?)
selectionIndicatorVariantClass(variant, selected)
selectionIndicatorFallbackPx(size)
useSelectionIndicatorAnimation(active, fillRef?, iconRef?)
```

## File structure

```
SelectionIndicator/
├── SelectionIndicator.tsx
├── index.ts
├── selectionIndicatorTypes.ts
├── selectionIndicatorTokens.ts    # sizes, variant CSS
├── selectionIndicatorAPI.ts       # compound partition, mark resolve
├── selectionIndicatorParts.tsx    # Fill, Mark
├── selectionIndicatorContext.tsx
├── useSelectionIndicatorRootState.ts
└── useSelectionIndicatorAnimation.ts
```

## Storybook

No dedicated story — see Checkbox, Radio, ListBox stories with indicator variants.
