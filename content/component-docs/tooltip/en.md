# Tooltip

Hint on **hover** and **focus**. Renders in a portal (`document.body`), positioned relative to the trigger. Compound API: `Tooltip.Trigger` + `Tooltip.Content`; optional grid slots like `Alert` (`Icon`, `Title`, `Description`).

## Import

```tsx
import {
  Tooltip,
  type TooltipRootProps,
  type TooltipVariant,
  type TooltipSurface,
  type TooltipSize,
  type TooltipSide,
  type TooltipClassNames,
  type TooltipTriggerProps,
  type TooltipContentProps,
} from "burne-ui";
```

## API

### Basic usage

```tsx
<Tooltip delayShowMs={240} variant="default" side="top">
  <Tooltip.Trigger>
    <Button variant="outline" type="button">
      Hover or focus
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content showArrow>
    <Tooltip.Arrow />
    Tooltip
  </Tooltip.Content>
</Tooltip>
```

### Compound with title / description

```tsx
<Tooltip variant="info" surface="gloss" delayShowMs={0}>
  <Tooltip.Trigger>
    <Button type="button">Status</Button>
  </Tooltip.Trigger>
  <Tooltip.Content showArrow>
    <Tooltip.Arrow />
    <Tooltip.Icon />
    <Tooltip.Title>Information</Tooltip.Title>
    <Tooltip.Description>Additional context</Tooltip.Description>
  </Tooltip.Content>
</Tooltip>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `outline` \| `secondary` \| `danger` \| `success` \| `info` \| `warning` |
| `surface` | `default` | `default` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `side` | `top` | `top` \| `bottom` \| `left` \| `right` (+ auto-flip) |
| `delayShowMs` | `240` | Delay before show |
| `icon` | — | Icon for semantic variants |
| `showIcon` | auto | Show/hide indicator |
| `classNames` | — | Slots (see below) |

### Compound sub-parts

| Part | Role |
|------|------|
| `Tooltip.Trigger` | Hover/focus target; `aria-describedby` |
| `Tooltip.Content` | Portal wrapper + positioning |
| `Tooltip.Panel` | Bubble surface (simple title/description inside) |
| `Tooltip.Arrow` | Arrow pointing to trigger |
| `Tooltip.Icon` / `Indicator` | Semantic icon slot |
| `Tooltip.Message` | Grid wrapper (`display: contents`) |
| `Tooltip.Title` / `Description` | Text slots |

### `TooltipClassNames`

`root`, `trigger`, `content`, `arrow`, `panel`, `glossContent`, `message`, `indicator`, `icon`, `title`, `description`.

`root` and `trigger` apply to the trigger (including when using `cloneElement` on a single child).

## Variant / surface / sizes

### Variant

Semantic variants (`danger`, `success`, `info`, `warning`) automatically show a status icon via `SEMANTIC_STATUS_ICONS` (react-icons/io5) unless a custom `icon` is passed.

### Surface

| Surface | Behavior |
|---------|----------|
| `default` | `bg-surface` + persistent `shadowSm` |
| `gloss` | `gloss-panel` + gloss interactive ref on panel |

Size affects panel padding, typography (`Text` variants), and icon box.

| size | Panel padding | Title Text |
|------|---------------|------------|
| `small` | compact | `small` |
| `base` | default | `base` |
| `mid` / `large` | enlarged | `mid` |

## Animations

`tooltipAnimations.ts` → `useTooltipPortalMotion` + `tooltipPosition.ts`.

**DOM:**

```
<div class=root>                         ← wraps trigger
  <button|span|asChild> Trigger        ← aria-describedby when open
  portal → document.body
    <div role=tooltip id=tooltipId ref=tipRef>
      [Tooltip.Arrow]
      <Tooltip.Panel | gloss-panel>
        <Tooltip.Message>              ← display:contents grid
          <Tooltip.Icon />
          <Tooltip.Title />
          <Tooltip.Description />
```

No trigger squeeze (unlike Popover) — show on hover/focus.

### 1. Show / hide pipeline

**Schedule show:**

1. `pointerenter` / `focus` → `scheduleShow()` after `delayShowMs`
2. `pointerleave` / `blur` / `Escape` → `hide()` + cancel timer

**Portal mount + animate:**

1. `open=true` → mount portal
2. `computeTooltipPlacement()` — fixed `left`/`top`, auto side flip
3. `animatePortalOpen({ scale: 0.97→1, ...motionTooltip() })`
4. Close: `animatePortalClose({ autoAlpha: 0 })` → unmount

**Reduced motion:** `applyReducedPortalMotion` / instant unmount.

#### Timing customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  tooltipDuration: 200,
  interactiveEase: "power2.out",
});
```

Locally: `delayShowMs` on root (default `240`).

### 2. Shadow / gloss surface

| surface | Behavior |
|---------|----------|
| `default` | `usePersistentElShadow(tipRef, shadowSm)` — persistent sm on bubble |
| `gloss` | `createGlossInteractiveRefCallback` on gloss panel |

Tooltip is a **2nd level** floating surface with a persistent shadow at rest (like Popover default).

### 3. Reposition on reflow

On `open`, `scroll`, `resize` — placement is recalculated without re-mount.

Arrow position is synchronized with `resolvedSide`.

### 4. Semantic icon

Status variants auto-inject icon (`SEMANTIC_STATUS_ICONS`, io5). Icon cell is not animated separately.

### What's not included

- Trigger press squeeze
- Hover lift on trigger
- Ripple
- Outside click dismiss (tooltip is not modal)

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Portal enter/exit | `animatePortalOpen/Close` | `tooltipDuration`, `interactiveEase` | `surface` |
| Show delay | `setTimeout` | — | `delayShowMs` |
| Persistent shadow | `usePersistentElShadow` | — | `surface="default"` |
| Gloss ref | gloss utils | — | `surface="gloss"` |
| Reposition | `computeTooltipPlacement` | — | `side` |

## Tokens and CSS

| Class / token | Role |
|---------------|------|
| `TOOLTIP_PANEL_CLASS` | Bubble surface, border, padding per size |
| `TOOLTIP_MESSAGE_GRID` | Alert-like grid for Icon/Title/Description |
| semantic status surfaces | `danger`/`success`/… tint on panel |
| `gloss-panel` + `gloss-content` | Gloss surface |
| `burneLightThemePortalProps` | Light theme inheritance in portal |

## Styling and customization

### Two levels

1. **`className` on sub-parts** — `Trigger`, `Content`, `Panel`, `Arrow` merge into the slot.
2. **`classNames` on root `Tooltip`** — all slots via `TooltipClassNamesProvider`.

`root` and `trigger` apply to the trigger element (including `cloneElement` on a single child).

### `TooltipClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` / `trigger` | Trigger element | Ring, focus outline helpers |
| `content` | Portal wrapper | Outer shell, ring |
| `arrow` | Arrow span | Arrow tint/border |
| `panel` | Bubble surface | Background, border, padding |
| `glossContent` | Inner gloss grid | Content area in gloss |
| `message` | Grid wrapper (`display:contents`) | Compound layout spacing |
| `indicator` / `icon` | Icon cell | Semantic icon color/size |
| `title` / `description` | Text cells | Typography hierarchy |

### Simple text tooltip

```tsx
<Tooltip delayShowMs={240} side="top">
  <Tooltip.Trigger>
    <Button variant="outline" type="button">Hover</Button>
  </Tooltip.Trigger>
  <Tooltip.Content showArrow>
    <Tooltip.Arrow />
    Short tooltip
  </Tooltip.Content>
</Tooltip>
```

### Semantic compound (Alert-like grid)

```tsx
<Tooltip
  delayShowMs={0}
  variant="info"
  surface="gloss"
  classNames={{
    panel: "border-primary/30",
    title: "text-primary font-semibold",
    description: "text-muted/80",
  }}
>
  <Tooltip.Trigger>
    <Button variant="outline" type="button">Status</Button>
  </Tooltip.Trigger>
  <Tooltip.Content showArrow>
    <Tooltip.Arrow />
    <Tooltip.Icon />
    <Tooltip.Title>Information</Tooltip.Title>
    <Tooltip.Description>Additional context</Tooltip.Description>
  </Tooltip.Content>
</Tooltip>
```

### asChild trigger

When there is a single child, handlers and `aria-describedby` merge onto the child — set `aria-label` on icon-only buttons.

### Practical notes

- `delayShowMs={0}` — Storybook / instant tooltips.
- Portal inherits light theme via `burneLightThemePortalProps`.
- **Do not fix `transform`/`left`/`top` on `content`** — positioning + GSAP.
- Semantic variants: icon auto unless `showIcon={false}` or custom `icon`.
- Gloss grid: `Tooltip.Message` + Icon/Title/Description like `Alert`.
- **Merge order:** variant/surface → `classNames.slot` → sub-part `className`.

## Integrations

| Component | Usage |
|-----------|-------|
| `Avatar` | Tooltip on `nickname` |
| `Button` | Common trigger |
| `Alert` | Shared message banner grid layout |

## Accessibility

- Trigger: `aria-describedby={tooltipId}` when `open`
- Content: `role="tooltip"`, `id={tooltipId}`
- Keyboard: `Escape` closes
- Focus: trigger gets `tabIndex={0}` when rendered as a `<span>` wrapper
- Arrow / icons: `aria-hidden`

## File structure

```
Tooltip/
├── Tooltip.tsx
├── index.ts
├── tooltipTypes.ts
├── tooltipStyles.ts
├── tooltipAnimations.ts      # useTooltipPortalMotion
├── tooltipParts.tsx
├── tooltipPosition.ts
├── useTooltipRootState.ts
├── tooltipAPI.ts
├── tooltipA11y.ts
├── tooltipContext.tsx
└── Tooltip.stories.tsx
```

## Storybook

`Core Components/Tooltip` — variants, surfaces, gloss grid, semantic icons, light theme, a11y, `classNames`.
