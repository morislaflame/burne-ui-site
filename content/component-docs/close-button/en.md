# CloseButton

Round close button with `IoClose` icon (react-icons/io5). Shares the visual variant system with `Button`, supports GSAP hover/press and optional converge-ripple.

## Import

```tsx
import { CloseButton } from "burne-ui";
import type {
  CloseButtonProps,
  CloseButtonVariant,
  CloseButtonSize,
  CloseButtonClassNames,
} from "burne-ui";
```

## API

The component uses **simple API** (a single `<button>` without children). No compound subparts.

### Props

| Prop | Type | Default | Description |
|------|-----|--------------|----------|
| `variant` | `default` \| `primary` \| `outline` \| `secondary` \| `ghost` \| `gloss` | `default` | Visual style (shared with Button) |
| `size` | `small` \| `base` \| `mid` \| `large` | `base` | Square area and icon size |
| `animated` | `boolean` | `true` | Hover lift + press squeeze |
| `ripple` | `boolean` | `false` | Converge-ripple on press |
| `disabled` | `boolean` | `false` | `opacity-50`, `cursor-not-allowed` |
| `aria-label` | `string` | `"Close"` | Accessible name (must be overridden in context) |
| `className` | `string` | — | Classes on the root `<button>` |
| `classNames` | `CloseButtonClassNames` | — | Slots: `root`, `icon`, `ripple` |
| `type` | `button` \| `submit` \| `reset` | `button` | Native type |
| … | `ButtonHTMLAttributes` (without `children`) | — | `onClick`, `onPointer*`, etc. |

### `CloseButtonClassNames`

```tsx
type CloseButtonClassNames = {
  root?: string;    // root <button>
  icon?: string;    // IoClose
  ripple?: string;  // <Ripple /> wrapper
};
```

### Examples

```tsx
// Basic
<CloseButton onClick={onClose} />

// In dialog header
<CloseButton
  variant="ghost"
  size="small"
  aria-label="Close dialog"
  onClick={onClose}
/>

// With ripple
<CloseButton variant="outline" ripple aria-label="Close" />

// Slot customization
<CloseButton
  variant="outline"
  classNames={{
    root: "border-primary/50 bg-primary/5 shadow-token-md hover:bg-primary/10",
    icon: "text-primary",
  }}
  aria-label="Close panel"
/>
```

## variant

Uses the shared surface map `INTERACTIVE_VARIANT_ROOT` from `buttonStyles.ts`:

| variant | Surface | Hover shadow | Ripple tone |
|---------|-------------|--------------|-------------|
| `default` | `bg-surface`, `border-token` | yes | `converge-ripple-neutral` |
| `primary` | `bg-primary` | yes | `converge-ripple-primary-fill` |
| `outline` | transparent + `border-token` | yes | neutral |
| `secondary` | `bg-secondary` | yes | neutral |
| `ghost` | transparent | yes | neutral |
| `gloss` | `gloss-btn` | no (gloss-motion) | neutral |

CloseButton has **no** `status` prop — only variant.

## Sizes

| size | Root | Icon |
|------|--------|--------|
| `small` | `h-control-small w-control-small` | `icon-small` |
| `base` | `h-control-base w-control-base` | `icon-base` |
| `mid` | `h-control-mid w-control-mid` | `icon-large` |
| `large` | `h-control-large w-control-large` | `icon-large` |

Shape is always `rounded-full`.

## Animations

All motion is **GSAP**. Thin wrapper: `closeButtonAnimations.ts` → `useFirstLevelInteractiveMotion` (same hook as `Button`).

**DOM structure:**

```
<button>                    ← motion target (always root, not contentRef)
  <Ripple />                ← optional, rounded-full clip
  <IoClose />               ← z-[1], icon
```

CloseButton has **no** async layers, expand ring, or `groupSegment`.

### 1. Hover lift + press squeeze

Same model as Button (1st level), but `useContentRef: false` always.

**Pointer enter:**

- `animateInteractiveHoverLift` on root `<button>`
- Shadow when variant ∈ `CLOSE_BUTTON_HAS_HOVER_SHADOW` (all except gloss): `firstLevelHoverShadow()` — hover `--shadow-sm`
- Adaptive scale from square size (`hoverLiftScale` cap)

**Pointer down:**

- `animateInteractivePressSqueeze` — adaptive squeeze ~2.4px, cap `pressSqueezeScale[1]`
- Release → restore hover if pointer inside

**Pointer leave:** scale `1`, reset `--el-shadow`.

**Gloss:** `animateGlossInteractiveHoverLift` / `PressSqueeze`, no shadow lift.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  hoverLiftScale: 1.025,
  hoverLiftEase: "sine.inOut",
  pressSqueezeScale: [1, 0.98, 1],
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

**Locally:** `animated={false}`.

**Reduced motion / touch:** `shouldSkipInteractiveHoverLift()` — no lift or squeeze.

### 2. Converge ripple (`ripple={true}`)

`<CloseButtonRipple>` → `<Ripple color={convergeBg} className="rounded-full" />`.

**Animation:** see Ripple.md — `ConvergeRippleDot`, default `direction="out"`.

| variant | Tone |
|---------|-----|
| `primary` | `converge-ripple-primary-fill` |
| others | `converge-ripple-neutral` |

```ts
configureMotion({
  rippleDefaultDuration: 700,
  rippleDefaultOpacityFrom: 0.42,
  enableRipple: true,
});
```

The `duration` prop on Ripple overrides the global duration. Disabled when `disabled`.

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|----------|---------|---------------------------|----------------|
| Hover lift | `useFirstLevelInteractiveMotion` | `hoverLiftScale`, `enableHoverLift` | `animated` |
| Press squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale`, `enablePressSqueeze` | `animated` |
| Ripple | `<Ripple />` | `rippleDefaultDuration`, `enableRipple` | `ripple` |
| Gloss | `glossInteractiveMotion` | interactive tokens | `variant="gloss"` |

## Tokens and CSS classes

### Color tokens (ripple)

| variant | Token |
|---------|-------|
| `default`, `outline`, `secondary`, `ghost`, `gloss` | `converge-ripple-neutral` |
| `primary` | `converge-ripple-primary-fill` |

### Surface and motion

- Base: `INTERACTIVE_VARIANT_ROOT[variant]` (from Button)
- Hover: `hoverVariant(CLOSE_BUTTON_HOVER_VARIANT[variant])`
- Focus: `focus-ring` (`--color-focus-ring`; width/offset via `--focus-ring-width` / `--focus-ring-offset`)
- Disabled: `opacity-50`, `cursor-not-allowed`

### Size tokens

`h-control-*`, `w-control-*` (square), `icon-small` / `icon-base` / `icon-large`.

## Styling and customization

CloseButton is a leaf component (no compound/simple split): a single `<button>` with an icon.

### Two levels

1. **`className`** — additional classes on root (merged after base classes).
2. **`classNames`** — `root`, `icon`, `ripple` via `CloseButtonClassNamesProvider`.

### `CloseButtonClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------------|
| `root` | `<button>` | Background, ring, hit-area size (`rounded-full`) |
| `icon` | `IoClose` | Icon color, size |
| `ripple` | Ripple overlay | Opacity, clip shape |

```tsx
<CloseButton
  variant="ghost"
  size="mid"
  className="ring-2 ring-primary/20"
  classNames={{
    root: "bg-surface-elevated",
    icon: "text-muted",
    ripple: "opacity-80",
  }}
  aria-label="Close dialog"
/>
```

`variant`, `size` — surface and `toggleBox` from tokens. In Dialog/Drawer, the `close` slot passes styles to CloseButton.

### Disabling animations

```tsx
<CloseButton animated={false} aria-label="Close" />
```

### Practical notes

- **aria-label** is required (default "Close" — specify context: "Close dialog").
- **Merge order:** `closeButtonRootClass` → `classNames.root` → `className`.

## Accessibility

- Icon only — **always** needs `aria-label` (default `"Close"` works for generic close; in UI prefer specifics: "Close dialog", "Hide panel").
- `IoClose` icon — `aria-hidden`.
- Native `disabled` on `<button>`.
- Focus ring: `outline-none` + `focus-ring`.

## Differences from Button

| | Button | CloseButton |
|---|--------|-------------|
| Children | text / icon | none (`IoClose` inside) |
| `status` | yes | no |
| Async states | yes | no |
| `icon` / `iconOnly` | yes | no (always icon-only) |
| `classNames` | no | `root`, `icon`, `ripple` |
| Shape | `rounded-base` (or segment) | `rounded-full` |
| Size grid | `minWButton`, padding | `toggleBox` (square) |

## Component file structure

```
CloseButton/
├── CloseButton.tsx
├── index.ts
├── closeButtonTypes.ts
├── closeButtonStyles.ts
├── closeButtonAPI.ts          # mergeCloseButtonSlotClass
├── closeButtonA11y.ts         # default aria-label
├── closeButtonContext.tsx     # classNames provider
├── closeButtonParts.tsx       # Icon, Ripple
├── closeButtonAnimations.ts
├── useCloseButtonRootState.ts
└── CloseButton.stories.tsx
```

## Storybook

`Core Components/CloseButton` — sizes, variants, variant×size matrix, ripple, `classNames` customization, light/dark theme.
