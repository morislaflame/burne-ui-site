# ToggleButtonGroup

A group of toggle buttons based on `ToggleButton`. Joined (`separated={false}`) like `ButtonGroup` or with a gap. **multiple** and **single** (radio-like) modes.

## Import

```tsx
import {
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonGroupType,
  type ToggleButtonGroupOrientation,
} from "burne-ui";
import { ToggleButton } from "burne-ui";
```

## API

### Basic usage

```tsx
<ToggleButtonGroup
  type="multiple"
  defaultValue={["bold"]}
  aria-label="Formatting"
  variant="default"
  size="base"
>
  <ToggleButton value="bold" icon={<IoTextOutline aria-hidden />}>
    Bold
  </ToggleButton>
  <ToggleButton value="italic">Italic</ToggleButton>
</ToggleButtonGroup>
```

### Single selection

```tsx
<ToggleButtonGroup
  type="single"
  value={align}
  onValueChange={setAlign}
  aria-label="Alignment"
>
  <ToggleButton value="left">Left</ToggleButton>
  <ToggleButton value="center">Center</ToggleButton>
  <ToggleButton value="right">Right</ToggleButton>
</ToggleButtonGroup>
```

No compound API — only root + child `ToggleButton` elements.

### Root props

| Prop | Default | Description |
|------|--------------|----------|
| `type` | `multiple` | `multiple` \| `single` |
| `orientation` | `horizontal` | `horizontal` \| `vertical` |
| `separated` | `false` | `true` — gap between buttons |
| `disabled` | `false` | Disables the group and all `ToggleButton` elements |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` → context |
| `variant` | `default` | `default` \| `outline` \| `ghost` \| `gloss` |
| `value` | — | Controlled: `string[]` (multiple) or `string` (single) |
| `defaultValue` | — | Uncontrolled initial |
| `onValueChange` | — | `(value: string \| string[]) => void` |
| `className` | — | On root `<div role="toolbar">` |

No `status` or `classNames` on the group.

### Child elements

Only **`ToggleButton`** with a required `value`. Arbitrary Fragment wrappers are flattened via `toggleButtonGroupAPI`.

## variant and sizes

| `variant` | Behavior |
|-----------|-----------|
| `default` | Standard toggle surface |
| `outline` | Border shell |
| `ghost` | Transparent |
| `gloss` | `gloss-panel`; separators are **not** rendered |

| `size` | Passed through to each `ToggleButton` |

Button customization — `classNames` on `ToggleButton` (`root`, `fill`, `content`, `icon`, `label`).

## Animations

No separate `toggleButtonGroupAnimations.ts`. Motion lives on `ToggleButton`:

**DOM (joined):**

```
<div role=toolbar>
  <ButtonGroupSegmentProvider segment=first>
    <ToggleButton value=bold>
      <span class=fill ref=fillRef />   ← GSAP fill on pressed
      <span contentMotionRef>           ← squeeze
```

### 1. Toggle fill

`useToggleButtonFillAnimation` — GSAP fill on `pressed` / selected.

### 2. Press squeeze

`useFirstLevelInteractiveMotion` on content ref.

### 3. Gloss

`variant="gloss"` on the group → gloss handlers on buttons.

The group adds: segmentation (`ButtonGroupSegmentProvider`), keyboard nav when `type="single"`.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  pressSqueezeScale: [1, 0.98, 1],
  enableToggleButtonFill: true,
});
```

### What's missing

- Group-level FLIP on selection change
- Dedicated GSAP on root

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|----------|---------|---------------------------|----------------|
| Toggle fill | `useToggleButtonFillAnimation` | `enableToggleButtonFill` | `pressed` |
| Press squeeze | first-level motion | `pressSqueezeScale` | `disabled` |
| Segment glue | CSS only | — | `separated` |

## Tokens and CSS

`toggleButtonGroupStyles.ts` delegates to `ButtonGroup`:

| Function | Purpose |
|---------|------------|
| `toggleButtonGroupRootClass` | → `buttonGroupRootClass` |
| `toggleButtonGroupSeparatorClass` | → `buttonGroupSeparatorClass` |

Root: `role="toolbar"`, `aria-orientation`, `aria-disabled`.

## Styling and customization

### Single level

| Part | Customization |
|-------|--------------|
| root | `ToggleButtonGroup className` |
| buttons | `ToggleButton className` / `classNames` |

### Connected horizontal

```tsx
<ToggleButtonGroup
  type="multiple"
  defaultValue={["list"]}
  aria-label="View mode"
  className="w-fit"
>
  <ToggleButton value="list" icon={<IoList aria-hidden />}>List</ToggleButton>
  <ToggleButton value="grid" icon={<IoGrid aria-hidden />}>Grid</ToggleButton>
</ToggleButtonGroup>
```

### Separated variants

```tsx
<ToggleButtonGroup separated type="single" variant="outline" aria-label="Theme">
  <ToggleButton value="light">Light</ToggleButton>
  <ToggleButton value="dark">Dark</ToggleButton>
</ToggleButtonGroup>
```

### Practical notes

- **`aria-label` is required** on the toolbar (not validated in code).
- `type="single"`: buttons use `role="radio"`, `aria-checked`; arrow keys on root.
- `type="multiple"`: `aria-pressed` on buttons.
- `data-toggle-button-value` on buttons — for keyboard navigation.
- `separated` — when independent borders/shadows are needed.
- `disabled` on the group disables all toggle buttons.

## Integrations

| Component | Role |
|-----------|------|
| `ToggleButton` | Child elements; reads group context |
| `ButtonGroup` | Shared segment styles + `buttonGroupAPI` |
| `ButtonGroupSegmentProvider` | Glue positioning |

## Accessibility

| Mode | Behavior |
|-------|-----------|
| Root | `role="toolbar"`, `tabIndex={0\|-1}`, **`aria-label` required** |
| `multiple` | `aria-pressed` on buttons |
| `single` | `role="radio"`, `aria-checked`; roving `tabIndex` |
| Arrows | Arrow Left/Right (horizontal) or Up/Down (vertical) when `single` |
| Icons | `aria-hidden` on decorative `icon` |

## File structure

```
ToggleButtonGroup/
├── ToggleButtonGroup.tsx
├── index.ts
├── toggleButtonGroupTypes.ts
├── toggleButtonGroupStyles.ts
├── toggleButtonGroupAPI.ts
├── toggleButtonGroupA11y.ts
├── toggleButtonGroupContext.tsx
├── toggleButtonGroupParts.tsx      # Separator (internal)
├── useToggleButtonGroupRootState.ts
└── ToggleButtonGroup.stories.tsx
```

## Storybook

`Composite Components/ToggleButtonGroup` — connected H/V, separated, single, single separated, disabled, variants.

Playground: `playground/showcase/demos/toggleButtonGroup/`.
