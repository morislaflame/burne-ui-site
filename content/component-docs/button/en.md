# Button

First-level interactive button: surface variants, semantic statuses, async states, converge-ripple, and GSAP hover/press animations.

## Import

```tsx
import { Button } from "burne-ui";
import type {
  ButtonProps,
  ButtonVariant,
  ButtonStatus,
  ButtonSize,
  ButtonAsyncState,
} from "burne-ui";
```

Additionally, style utilities are exported from the package (for custom controls with the same shell):

```tsx
import {
  buttonSpinnerClass,
  buttonRippleTone,
} from "burne-ui";
```

## API

The component uses a **simple API** (single root `<button>` element).

### Props

| Prop | Type | Default | Description |
|------|-----|--------------|----------|
| `variant` | `default` \| `primary` \| `outline` \| `secondary` \| `ghost` \| `gloss` | `default` | Surface visual style |
| `status` | `default` \| `danger` \| `success` \| `info` \| `warning` | `default` | Semantic tone (color, hover, focus, ripple) |
| `size` | `small` \| `base` \| `mid` \| `large` | `base` | Size; inherited from `ButtonGroup` / `Form` |
| `animated` | `boolean` | `true` | Hover lift + press squeeze (GSAP) |
| `ripple` | `boolean` | `false` | Converge-ripple from press point (`<Ripple />`) |
| `icon` | `ReactNode` | — | Icon to the left of the text |
| `iconOnly` | `boolean` | `false` | Compact width (`min-w-fit`); `aria-label` is required |
| `disabled` | `boolean` | `false` | Disabled state; inherited from `Form` |
| `asyncState` | `idle` \| `loading` \| `success` \| `error` | — | Controlled async state |
| `onAsyncStateChange` | `(state) => void` | — | Callback on async state change (uncontrolled) |
| `onAsyncClick` | `(e) => Promise<boolean>` | — | Uncontrolled async: `true` → success, `false` → error |
| `asyncFeedbackMs` | `number` | `2000` | Delay before returning to `idle` after success/error |
| `groupSegment` | `ButtonGroupSegment` | — | Segment in `ButtonGroup` (rounding, glue) |
| `className` | `string` | — | Additional classes on the root `<button>` |
| `type` | `button` \| `submit` \| `reset` | `button` | Native type |
| … | `ButtonHTMLAttributes` | — | Remaining button attributes |

### Examples

```tsx
// Basic
<Button variant="primary">Save</Button>

// With icon
<Button icon={<IoAdd aria-hidden />}>Add</Button>

// Icon only
<Button iconOnly aria-label="Add">
  <IoAdd aria-hidden className="icon-base" />
</Button>

// Async (uncontrolled)
<Button
  ripple
  onAsyncClick={async () => {
    await save();
    return true; // success; false → error
  }}
>
  Save
</Button>

// Async (controlled)
const [state, setState] = useState<ButtonAsyncState>("idle");
<Button asyncState={state} onClick={run} disabled={state !== "idle"} />
```

## variant and status

- **`variant`** — visual style: background, border, shadow.
- **`status`** — semantics: danger / success / info / warning are applied on top of variant.

| variant | Surface | Shadow on hover | Note |
|---------|-------------|----------------|------------|
| `default` | `bg-surface`, `border-token` | yes | Default button |
| `primary` | `bg-primary` | yes | Accent |
| `outline` | transparent background, `border-token` | yes | When status ≠ default, border/text follow status |
| `secondary` | `bg-secondary` | yes | Secondary |
| `ghost` | transparent, no border | yes | Minimal |
| `gloss` | CSS class `gloss-btn` | no (gloss-motion) | Status via `gloss-btn-*` |

When `status !== "default"`, the hover variant is recalculated (e.g. `primary` + `danger` → fill-danger).

## Sizes

Sizes come from `CONTROL_SIZE_LAYOUT` (`controlSizeLayout.ts`):

| size | Height | min-width (button) | Text (`Text`) | Icon in slot |
|------|--------|--------------------|----------------|----------------|
| `small` | `h-control-small` | `min-w-button-small` | `small` | `icon-small` |
| `base` | `h-control-base` | `min-w-button-base` | `base` | `icon-base` |
| `mid` | `h-control-mid` | `min-w-button-mid` | `mid` | `icon-large` |
| `large` | `h-control-large` | `min-w-button-large` | `mid` | `icon-large` |

With `iconOnly`, minimum width is not applied (`min-w-fit`).

**Size cascade:** `size` prop → `ButtonGroup` context → `Form` context → `"base"`.

**Variant cascade:** `variant` prop → `ButtonGroup` context → `"default"`.

## Animations

All motion uses **GSAP**. Orchestration: `buttonAnimations.ts` + shared hook `useFirstLevelInteractiveMotion` (1st-level interactive).

**DOM structure (simplified):**

```
<button>                          ← refs, pointer handlers, shadow (if not groupSegment)
  <Ripple />                      ← optional, z-0
  <span clipLayer>                ← expand ripples async
  <span contentMotionRef>         ← squeeze target when groupSegment
    grid: label | loader | success | error
```

### 1. Hover lift + press squeeze

`useFirstLevelInteractiveMotion` — target element: root `<button>` or `contentMotionRef` when `groupSegment`.

**Pointer enter (hover lift):**

1. Checks: `animated && !blocked`, not `defaultPrevented`, `shouldSkipInteractiveHoverLift()`
2. `animateInteractiveHoverLift` — adaptive `scale` (from element size, cap = `hoverLiftScale`, default `1.025`)
3. Shadow: `firstLevelHoverShadow()` — rest `--shadow-none`, hover `--shadow-sm` via `--el-shadow` + class `animate-shadow`

**Pointer down (press squeeze):**

1. `animateInteractivePressSqueeze` — 3 keyframes scale: `1 → adaptiveSqueeze → 1`
2. Adaptive squeeze: ~2.4px per side, but no stronger than `pressSqueezeScale[1]` (default `0.98`)
3. After release: if cursor is still inside — restores hover lift (`afterPressEnabled` checks `asyncState === "idle"`)

**Pointer leave:** reset scale + shadow, `killMotion` when `blocked`.

**Gloss (`variant="gloss"`):** instead of shadow lift — `animateGlossInteractiveHoverLift` / `animateGlossInteractivePressSqueeze` + `GLOSS_INTERACTIVE_MOTION_CLASS`.

**ButtonGroup:** `useContentRef: true` — squeeze/lift on `contentMotionRef`, not on glue root; `SHADOW_LIFT_MOTION_CLASS` on root is disabled.

#### Customizing hover/squeeze

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,              // duration of lift and squeeze
  interactiveEase: "power2.out",
  hoverLiftEase: "sine.inOut",           // hover lift only
  hoverLiftScale: 1.025,                 // upper bound of adaptive lift
  pressSqueezeScale: [1, 0.98, 1],       // rest → min → rest (cap for adaptive)
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

**Locally:** `animated={false}` — disables lift/squeeze on this button.

**Reduced motion / touch:** `prefers-reduced-motion`, viewport ≤ tablet, `hover: none` — via `shouldSkipInteractiveHoverLift()`.

### 2. Converge ripple (`ripple={true}`)

Built-in `<Ripple />` in the clip layer. `pointerdown` listener on the button → wave from click point.

**Point animation** (`ConvergeRippleLayer`, `direction` default `"out"` for Ripple in Button):

- `scale`: `0.12 → 1` (out) or `1 → 0.12` (in)
- `autoAlpha`: `opacityFrom → 0`
- `ease`: `ensureRippleEase()` from `rippleEaseCss`
- `duration`: prop `rippleDefaultDuration` (default 700 ms)

Color: `buttonConvergeRippleColor(variant, status)`. Disabled when `blocked` or `asyncState !== "idle"`.

```ts
configureMotion({
  rippleDefaultDuration: 700,
  rippleDefaultOpacityFrom: 0.42,
  rippleEaseCss: "cubic-bezier(0.25, 0.55, 0.35, 0.95)",
  enableRipple: true,
});
```

### 3. Async crossfade (label ↔ loader ↔ success/error)

Four layers in CSS grid, refs via `createButtonAsyncLayerRefCallback`:

| Layer | `asyncState` | scale in | scale out |
|------|--------------|----------|-----------|
| label | `idle` | 1 | 0.92 |
| loader | `loading` | 1 | 0.85 |
| success | `success` | 1 | 0.85 |
| error | `error` | 1 | 0.85 |

**Transition:** GSAP `to` on each layer — `autoAlpha` + `scale`, vars = `motionInteractive()`.

**First mount:** instant `gsap.set` without animation.

**Uncontrolled `onAsyncClick`:** loading → then success/error + `pushExpandRipple`.

```ts
configureMotion({
  enableAsyncButtonCrossfade: true,
  interactiveDuration: 280,  // crossfade duration
});
```

**Reduced motion:** instant visibility change without GSAP.

### 4. Feedback expand ring

After `loading → success|error` — `ButtonFeedbackExpandRipple` from the button center:

- `fromTo`: `scale: 0, autoAlpha: 0.5` → `scale: 1, autoAlpha: 0`
- Size: `centerCoverDiameter(w, h)` — covers the entire button
- Color: `color-mix(success|danger 55%)`
- `ease`: `ensureRippleEase()`, duration: `motionFeedbackExpand()`

```ts
configureMotion({
  enableFeedbackExpand: true,
  feedbackExpandDuration: 720,
});
```

### Summary: what is configured where

| Animation | File / utility | `configureMotion` keys | Local prop |
|----------|----------------|---------------------------|----------------|
| Hover lift | `useFirstLevelInteractiveMotion` | `hoverLiftScale`, `hoverLiftEase`, `enableHoverLift` | `animated` |
| Press squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale`, `interactiveDuration`, `enablePressSqueeze` | `animated` |
| Ripple | `<Ripple />` | `rippleDefaultDuration`, `rippleDefaultOpacityFrom`, `enableRipple` | `ripple` |
| Async crossfade | `buttonAnimations` layoutEffect | `enableAsyncButtonCrossfade`, `interactiveDuration` | `asyncState` |
| Expand ring | `ButtonFeedbackExpandRipple` | `enableFeedbackExpand`, `feedbackExpandDuration` | — |
| Gloss motion | `glossInteractiveMotion` | same interactive | `variant="gloss"` |

## Tokens and CSS classes

### Color tokens (ripple)

| Token | Usage |
|-------|---------------|
| `converge-ripple-neutral` | default, outline, secondary, ghost, gloss |
| `converge-ripple-primary-fill` | primary + default status |
| `converge-ripple-danger` | status danger |
| `converge-ripple-success` | status success |
| `converge-ripple-info` | status info |
| `converge-ripple-warning` | status warning |

### Semantic surfaces (`semanticStatusSurface`)

For `status !== "default"`: `SEMANTIC_STATUS_SURFACE_TINT`, `SEMANTIC_STATUS_FILL`, `SEMANTIC_STATUS_OUTLINE_BORDER`, `SEMANTIC_STATUS_TEXT`, `SEMANTIC_STATUS_FILL_TEXT`.

### Focus

`BUTTON_STATUS_FOCUS_OUTLINE`: `focus-visible:outline-primary` (default) or outline by status.

### Gloss

Classes: `gloss-btn`, `gloss-btn-danger`, `gloss-btn-success`, `gloss-btn-info`, `gloss-btn-warning`.

### Size tokens

`--control-height-*`, `min-w-button-*`, spacing (`px-plus`, `py-small`, …), `icon-small` / `icon-base` / `icon-large`.

## Styling and customization

Button is a leaf component: **`className` on `<button>` only**. No `classNames` slots (unlike CloseButton, Input, Alert).

### Single slot — `className`

```tsx
<Button
  variant="outline"
  status="danger"
  size="mid"
  className="min-w-[10rem] border-primary/40"
  icon={<IoSave aria-hidden />}
>
  Save
</Button>
```

| Prop | What it styles |
|------|---------------|
| `variant` | Surface: default, outline, secondary, gloss, primary |
| `status` | Semantic tint / border |
| `size` | Height, padding, icon size, min-width |
| `iconOnly` | Square hit-area |
| `groupSegment` | Glue in ButtonGroup (segment rounding) |
| `className` | Any additional Tailwind classes on root |

Icons and text are children / `icon`; there are no separate slots for them.

### Compound-like patterns

For non-standard markup inside the button, use children and style wrappers yourself:

```tsx
<Button variant="ghost" className="justify-between gap-large px-large">
  <span className="flex flex-col items-start text-left">
    <span className="font-semibold">Title</span>
    <span className="text-small text-muted">Caption</span>
  </span>
  <IoChevronForward aria-hidden />
</Button>
```

### Exported style helpers

For your own controls with the same layout:

```tsx
import { buttonRippleTone } from "burne-ui/internal";
import { buttonRootClass, controlShellClass } from "burne-ui/internal";

const shell = controlShellClass("base");
const root = buttonRootClass("base", false);
const rippleColor = buttonRippleTone("primary", "danger");
```

### Disabling animations

```tsx
<Button animated={false}>No motion</Button>
```

Or globally: `configureMotion({ enableHoverLift: false, enablePressSqueeze: false })`.

## Accessibility

- Native `<button>` with correct `type`.
- `aria-busy={true}` when `asyncState === "loading"`.
- With `iconOnly` — a meaningful `aria-label` is required.
- Icons in `icon` and async layers — `aria-hidden`.
- Focus ring via `focus-ring` + status outline.
- When blocked (`disabled` or busy async) — `disabled` + `pointer-events-none`, opacity 50%.

## Context integration

| Context | What Button inherits |
|----------|----------------------|
| `ButtonGroup` | `variant`, `size`, `groupSegment`, glue/rounding |
| `Form` | `size`, `disabled`, `isSubmitting` → blocked |

## Component file structure

```
Button/
├── Button.tsx              # orchestrator
├── index.ts                # public exports
├── buttonTypes.ts
├── buttonStyles.ts         # all Tailwind classes
├── buttonAPI.ts            # resolve*, geometry
├── buttonA11y.ts           # aria-busy
├── buttonParts.tsx         # content, spinner, expand ripple
├── buttonAnimations.ts     # GSAP: async crossfade, expand
├── useButtonRootState.ts
└── Button.stories.tsx
```

## Storybook

`Core Components/Button` — variants, statuses, sizes, async, gloss, light/dark theme (`data-theme="light"`).
