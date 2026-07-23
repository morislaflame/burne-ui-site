# ButtonGroup

Layout wrapper for joined or separate segments: `Button`, `Input.Control`, `ComboBox`, `SearchInput`, `Dropdown`, `ButtonGroup.Text`. **Not compound API** — root + separate `ButtonGroup.Text`.

## Import

```tsx
import {
  ButtonGroup,
  type ButtonGroupProps,
  type ButtonGroupTextProps,
  type ButtonGroupOrientation,
  type ButtonGroupSegment,
} from "burne-ui";
```

Style helpers (from module): `buttonGroupRoundingClasses`, `buttonGroupSegmentSurfaceClasses`, `buttonGroupTextFrameClass`.

## API

### Joined (fused) group

```tsx
<ButtonGroup aria-label="Document actions" buttonSize="base" variant="default">
  <ButtonGroup.Text>View</ButtonGroup.Text>
  <Button variant="secondary">List</Button>
  <Button variant="primary">Grid</Button>
  <Dropdown>
    <Dropdown.Trigger asChild>
      <Button
        variant="outline"
        iconOnly
        aria-label="More"
        groupSegment={{ orientation: "horizontal", position: "last" }}
      >
        <IoEllipsisHorizontal aria-hidden />
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>...</Dropdown.Popover>
  </Dropdown>
</ButtonGroup>
```

### Segmented (with gaps)

```tsx
<ButtonGroup segmented aria-label="Actions" buttonSize="base">
  <Button variant="outline">Cancel</Button>
  <Button variant="outline">Draft</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>
```

Simple API and compound `ButtonGroup.Text` **do not exist** — only `ButtonGroup.Text`.

### Root props

| Prop | Default | Description |
|------|--------------|----------|
| `orientation` | `horizontal` | `horizontal` \| `vertical` |
| `segmented` | `false` | `true` — gap between segments, no glue |
| `buttonSize` | `base` | Cascade to segments: `small` \| `base` \| `mid` \| `large` |
| `variant` | `default` | `default` \| `outline` \| `secondary` \| `gloss` \| `primary` |
| `className` | — | On root `<div role="group">` |
| `children` | — | Segments |

No `status` on group — on child `Button`s. No `classNames` on root.

### `ButtonGroup.Text` props

| Prop | Description |
|------|----------|
| `buttonSize` | Frame height (from context or prop) |
| `groupSegment` | Segment position override |
| `className` | On span wrapper |
| `children` | Text (via `Text`) |

### Auto-detect segments

`buttonGroupAPI.isGroupSegmentSlot` recognizes:

| Child | Glue in joined mode |
|-------|-------------------|
| `Button` | yes |
| `Input.Control` | yes |
| `ComboBox` | yes |
| `SearchInput` | yes |
| `Dropdown` | yes (root) |
| `ButtonGroup.Text` | yes |

Position: `first` \| `middle` \| `last` \| `only` — auto or `groupSegment` on child.

## variant / size / modes

| Mode | Behavior |
|-------|-----------|
| joined (`segmented=false`) | Shared border, rounding by position, separators |
| segmented | `gap-xsmall`, each segment `rounded-base` |
| `variant="gloss"` | `gloss-panel`; separators hidden |
| `orientation="vertical"` | `flex-col`, separators `border-b-token` |

| `buttonSize` | `ButtonGroup.Text` Text variant |
|--------------|-------------------------------|
| `small` | `small` |
| `base` | `base` |
| `mid` | `mid` |
| `large` | `mid` |

## Animations

`ButtonGroup` has **no** `*Animations.ts`. Motion is delegated to segments.

**DOM (joined horizontal):**

```
<div role=group>
  <ButtonGroupSegmentProvider segment=first>
    <Button groupSegment>          ← squeeze on contentMotionRef
  <span separator aria-hidden>
  <ButtonGroupSegmentProvider segment=last>
    <Input.Control groupSegment>   ← shell hover off when glued
```

### Button in group

`useFirstLevelInteractiveMotion` with `useContentRef: !!groupSegment` — squeeze/lift on inner content, not on glue root. `SHADOW_LIFT_MOTION_CLASS` disabled on root.

### Input / ComboBox / SearchInput

When `groupSegment`: standalone shell hover disabled; `buttonGroupRoundingClasses` + `buttonGroupSegmentSurfaceClasses` applied.

### ButtonGroup.Text

Static span — **no** GSAP.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  pressSqueezeScale: [1, 0.96, 1],
  interactiveDuration: 220,
});
```

### What's missing

- Group-level enter/exit
- Own GSAP hooks in composite

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|----------|---------|---------------------------|----------------|
| Button squeeze | `useFirstLevelInteractiveMotion` | `pressSqueezeScale` | `groupSegment` |
| Input shell | field shell utils | hover tokens | `groupSegment` |
| ButtonGroup.Text | — | — | static |

## Tokens and CSS

`buttonGroupStyles.ts`:

| Function / constant | Purpose |
|---------------------|------------|
| `buttonGroupRootClass` | `inline-flex w-fit`, orientation, gloss border |
| `buttonGroupSeparatorClass` | `border-r-token` / `border-b-token` |
| `buttonGroupRoundingClasses` | Rounding by `segment.position` |
| `buttonGroupOverlapBorderClasses` | `border-l-0` at joins |
| `buttonGroupSegmentSurfaceClasses` | `!border-0 !shadow-none`, z-index focus |
| `buttonGroupTextFrameClass` | Height from `CONTROL_SIZE_LAYOUT` |
| `BUTTON_GROUP_TEXT_LABEL_CLASS` | `truncate font-medium` |

Gloss: `glossInteractive.css` on root.

## Styling and customization

### Single level — `className`

| Part | Customization |
|-------|--------------|
| root | `ButtonGroup className` |
| `ButtonGroup.Text` | `className` |
| segments | `Button className`, `groupSegment` override |

### Toolbar with Input

```tsx
<ButtonGroup aria-label="Search and filters" buttonSize="base" className="w-full max-w-md">
  <Input.Control name="q" placeholder="Search…" />
  <Button variant="outline" iconOnly aria-label="Filter">
    <IoFilter aria-hidden />
  </Button>
</ButtonGroup>
```

### Vertical + danger

```tsx
<ButtonGroup orientation="vertical" aria-label="Actions" className="w-48">
  <Button variant="outline">Edit</Button>
  <Button variant="outline" status="danger">Delete</Button>
</ButtonGroup>
```

### Practical notes

- **Required:** `aria-label` or `aria-labelledby` on the group.
- `segmented` — when independent shadows/hover on buttons are needed.
- `groupSegment` on inner `Button` when `Dropdown` is a child.
- `SearchInput` on one line with group — see story `ToolbarWithSearchInputRow`.
- Separators: `aria-hidden`.
- Focus: `focus-visible:z-[2]` on segments.

## Integrations

| Component | Behavior |
|-----------|-----------|
| `Button` | `groupSegment` from context |
| `Input.Control` | Fused shell, `flex-1` horizontal |
| `ComboBox` / `Select` / `SearchInput` | Glue shell |
| `Dropdown` | Segment slot; trigger Button with `groupSegment` |
| `ToggleButtonGroup` | Reuses `buttonGroupStyles` |
| `Ripple` | On Button inside group |

Context: `ButtonGroupLayoutProvider` (`segmented`), `ButtonGroupSegmentProvider`.

## Accessibility

- Root: `role="group"`
- Separators: `aria-hidden`
- Keyboard — native to Button/Input inside
- Accessible name required on group

## File structure

```
ButtonGroup/
├── ButtonGroup.tsx
├── index.ts
├── buttonGroupTypes.ts
├── buttonGroupStyles.ts
├── buttonGroupAPI.ts
├── buttonGroupParts.tsx
├── buttonGroupContext.tsx
├── useButtonGroupRootState.ts
└── ButtonGroup.stories.tsx
```

## Storybook

`Composite Components/ButtonGroup` — horizontal, segmented, click interaction, vertical, fused input, search row, multiple groups.
