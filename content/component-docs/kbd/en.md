# Kbd

Displays keyboard keys (`<kbd>`). Supports `variant`, sizes, `Kbd.Group` with separator, and second-level hover-lift (like `Badge`).

## Import

```tsx
import {
  Kbd,
  type KbdProps,
  type KbdVariant,
  type KbdSize,
  type KbdClassNames,
  type KbdGroupProps,
} from "burne-ui";
```

## API

### Basic usage

```tsx
<Kbd>⌘</Kbd>
<Kbd variant="outline" size="base">Enter</Kbd>
```

### Key group

```tsx
<Kbd.Group separator="+">
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</Kbd.Group>

<Kbd.Group separator={null}>
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>P</Kbd>
</Kbd.Group>
```

Compound API only through `Kbd.Group` — root is a leaf component.

### Props (`Kbd`)

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `primary` \| `outline` \| `secondary` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `hoverLift` | `true` | Hover shadow/lift (2nd level) |
| `className` | — | On `<kbd>` |
| `classNames` | — | `root`, `group`, `separator` |

### `Kbd.Group` props

| Prop | Default | Description |
|------|---------|-------------|
| `separator` | `"+"` | Between keys; `null` — hide |
| `classNames` | — | `group`, `separator` |

### `KbdClassNames`

`root`, `group`, `separator`.

## variant

| variant | Root styles |
|---------|-------------|
| `default` | `bg-surface border-token text-foreground` |
| `primary` | `bg-primary border-transparent text-primary-foreground` |
| `outline` | `bg-transparent border-token` |
| `secondary` | `bg-secondary border-token text-secondary-foreground` |
| `gloss` | `gloss-panel gloss-deep border-0` |

Second-level component with `hoverLift={true}` (like `Badge`, `Alert`): shadow at rest + enhancement on hover.

## Sizes

| size | layout (`KBD_LAYOUT`) | Text variant |
|------|------------------------|--------------|
| `small` | `min-h-4 px-xsmall py-0.5` | `xsmall` |
| `base` | `min-h-4 px-small py-xsmall` | `xsmall` |
| `mid` | `min-h-5 px-base py-xsmall` | `small` |
| `large` | `min-h-5 px-base py-xsmall` | `small` |

Shared root: `rounded-small font-mono inline-flex items-center justify-center`.

## Animations

`kbdAnimations.ts` → `useKbdAnimations`. Hover motion only — **no** press squeeze or portal.

**DOM:**

```
<kbd ref=rootRef>              ← motion target, pointer handlers
  <Text inheritColor>Esc</Text>
</kbd>
```

### 1. Hover lift — default / primary / outline / secondary

`useSecondLevelShadow(rootRef, hoverLift && !isGloss)`:

**Init (mount):** `initElementShadow(el, shadowSm())` — at rest `--el-shadow: var(--shadow-sm)`.

**Pointer enter:**

1. `animateInteractiveHoverLift(el, true, …, secondLevelShadow())`
2. Scale ~`hoverLiftScale`, shadow `sm` → `md`

**Pointer leave:** scale `1`, shadow back to `sm`.

Class: `SHADOW_LIFT_MOTION_CLASS` (`animate-shadow origin-center`; `will-change` is set dynamically during the tween).

**Locally:** `hoverLift={false}` — no handlers and `motionClass`.

**Reduced motion / touch:** `shouldSkipInteractiveHoverLift()` — shadow stays `sm`, no scale.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.025,
  hoverLiftEase: "sine.inOut",
  interactiveDuration: 280,
  enableHoverLift: true,
});
```

### 2. Gloss variant (`variant="gloss"`)

Instead of shadow lift:

- `createGlossInteractiveRefCallback(rootRef, hoverLift && isGloss)`
- `useGlossInteractiveHandlers` on `onPointerOver` / `onPointerOut`
- Class: `GLOSS_INTERACTIVE_MOTION_CLASS` + `glossInteractive.css`

Gloss lift uses a separate curve, not sm→md shadow tokens.

### 3. `Kbd.Group`

Group wrapper is **not** animated. Separator is static `Text` (`aria-hidden`).

### What's missing

- Press squeeze (Kbd is not pressable)
- Ripple
- Selection/fill animations

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|----------|---------|---------------------------|----------------|
| Shadow sm→md + lift | `useSecondLevelShadow` | `hoverLiftScale`, `enableHoverLift`, `interactiveDuration` | `hoverLift` |
| Gloss hover | `useGlossInteractiveHandlers` | interactive tokens | `variant="gloss"` |
| Persistent rest shadow | `initElementShadow` + `shadowSm()` | — | `hoverLift={true}` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|------------|
| `KBD_ROOT_BASE_CLASS` | `rounded-small font-mono isolate` |
| `shadow-token-sm` / `md` | Via `--el-shadow` on hover lift |
| `gloss-panel gloss-deep` | Gloss keycap surface |
| `KBD_GROUP_SEPARATOR_CLASS` | `text-muted text-xsmall` |
| `motion-reduce:transition-none` | On root |

## Styling and customization

### Two levels

1. **`className` on `Kbd`** — merged into root (`kbdRootClass` + surface + size).
2. **`classNames.root`** — slot above variant surface.

`Kbd.Group`: `className` on group span + `classNames.group` / `separator`.

### `KbdClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------------|
| `root` | `<kbd>` | Border tint, custom bg, ring |
| `group` | `Kbd.Group` span | Gap, alignment shortcut row |
| `separator` | `+` between keys | Color/size separator |

`variant`, `size` — surface and padding from tokens. `hoverLift={false}` disables motion only.

### Single key

```tsx
<Kbd
  variant="outline"
  size="base"
  classNames={{
    root: "border-primary/40 bg-primary/5 shadow-none",
  }}
>
  /
</Kbd>
```

### Shortcut row (compound group)

```tsx
<Kbd.Group
  separator="+"
  classNames={{
    group: "gap-small",
    separator: "text-primary/60",
  }}
>
  <Kbd variant="default" classNames={{ root: "min-w-[2rem]" }}>
    ⌘
  </Kbd>
  <Kbd variant="default">K</Kbd>
</Kbd.Group>
```

Next to action:

```tsx
<Button size="base">
  Save <Kbd hoverLift={false} size="small" className="ml-small">⌘S</Kbd>
</Button>
```

### Practical notes

- **`hoverLift={false}`** — for kbd inside buttons/static hints (does not compete with button hover).
- **Do not set `transform` on root with `hoverLift`** — conflicts with GSAP lift.
- **Gloss:** do not override `gloss-deep` unless needed — depth comes from CSS.
- **Separator `null`:** tight shortcut chips without `+`.
- **Merge order:** `KBD_ROOT_BASE_CLASS` → variant surface → size → motionClass → `classNames.root` → `className`.

## Integrations

| Context | Example |
|----------|--------|
| Tooltips / docs | Shortcut hints |
| `Button` labels | «Save ⌘S» next to action |

## Accessibility

- Semantic `<kbd>` for keys
- Group separator: `aria-hidden`
- Do not rely on symbols alone — duplicate with text when needed

## File structure

```
Kbd/
├── Kbd.tsx
├── index.ts
├── kbdTypes.ts
├── kbdStyles.ts
├── kbdAnimations.ts
├── kbdParts.tsx
├── useKbdRootState.ts
├── kbdContext.tsx
├── kbdAPI.ts
├── kbdA11y.ts
└── Kbd.stories.tsx
```

## Storybook

`Core Components/Kbd` — variants, sizes, group, gloss, `hoverLift={false}`, `classNames`.
