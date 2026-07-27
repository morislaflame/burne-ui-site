# Popover

Interactive floating panel: click/pointer toggle, outside dismiss, portal positioning. Compound API with `Header` / `Label` / `Hint` / `Body`. Positioning and arrow reuse `tooltipPosition`.

## Import

```tsx
import {
  Popover,
  type PopoverRootProps,
  type PopoverVariant,
  type PopoverSize,
  type PopoverSide,
  type PopoverContentGap,
  type PopoverClassNames,
  type PopoverAlign,
} from "burne-ui";
```

## API

### Basic usage

```tsx
<Popover side="bottom" variant="default">
  <Popover.Trigger>
    <Button variant="outline" type="button">
      Settings
    </Button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Header>
      <Popover.Title>Filters</Popover.Title>
      <Popover.Description>Changes apply immediately</Popover.Description>
    </Popover.Header>
    <Popover.Body>
      Panel content
    </Popover.Body>
  </Popover.Content>
</Popover>
```

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>...</Popover.Content>
</Popover>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `side` | `bottom` | Anchor side |
| `open` / `defaultOpen` | `false` | Controlled / uncontrolled |
| `onOpenChange` | — | Callback |
| `anchorRef` | trigger | External anchor for positioning |
| `shouldDismiss` | — | `(target) => boolean` — veto outside dismiss |
| `classNames` | — | Slots |

### `Popover.Content` props

| Prop | Default | Description |
|------|---------|-------------|
| `showArrow` | `false` | Arrow pointing to anchor |
| `offset` | token default | Offset from anchor |
| `gap` | per size | Inner panel gap |
| `matchAnchorWidth` | `false` | `minWidth` = anchor width |
| `align` | `center` / `start` | Alignment (`FloatingAlign`) |
| `unstyled` | `false` | Without default panel surface |
| `contentRole` | `dialog` | `dialog` \| `undefined` |

### Compound subparts

| Part | Purpose |
|------|---------|
| `Popover.Trigger` | Toggle button / `asChild` clone |
| `Popover.Content` | Portal + panel shell |
| `Popover.Header` | Label + hint row |
| `Popover.Title` | `h2` title |
| `Popover.Description` | `FieldHint` subtitle |
| `Popover.Body` | Main content |
| `Popover.Arrow` | Custom arrow |

### `PopoverClassNames`

`root`, `trigger`, `content`, `panel`, `glossPanel`, `glossContent`, `arrow`, `header`, `label`, `hint`, `body`.

## Variant / sizes

| Variant | Surface |
|---------|---------|
| `default` | `bg-surface border-token` + persistent `shadowSm` |
| `gloss` | `gloss-panel` + gloss interactive handlers |

Sizes control padding, typography (`Popover.Title` / `Hint`), radius, and default `gap` via shared `PANEL_SIZE_LAYOUT` (with Dialog / AlertDialog / Card).

| size | panel padding | title / desc |
|------|---------------|--------------|
| `small` | `px-small py-xsmall` | `small` / `xsmall` |
| `base` | `px-mid py-base` | `base` / `small` |
| `mid` | `px-large py-mid` | `mid` / `base` |
| `large` | `px-xlarge py-large` | `large` / `base` |

## Animations

`popoverAnimations.ts` → `usePopoverContentLifecycle` + trigger squeeze in `popoverParts`.

**DOM:**

```
<div class=root>                         ← inline wrapper
  <button|asChild> Trigger               ← squeeze + aria-expanded
  portal → document.body
    <div ref=panelRef role=dialog>       ← fixed position target
      [Popover.Arrow]
      <div class=panel | glossPanel>     ← surface + persistent shadow
        <Popover.Header>
          <h2 Label> <FieldHint>
        <Popover.Body>
```

### 1. Open / close portal

`usePopoverContentLifecycle` (`useLayoutEffect` on `open` + `portalMounted`):

**Open sequence:**

1. `open=true` → `setPortalMounted(true)`
2. `reposition()` — `computeTooltipPlacement`, `position: fixed`, `left`/`top`
3. `animatePortalOpen({ surface: panel, vars: motionTooltip() })` — scale `0.97→1`, fade in
4. `usePersistentElShadow(panelRef, !isGloss, shadowSm)` — rest shadow on default

**Close sequence:**

1. `open=false` → `animatePortalClose({ autoAlpha: 0, ...motionTooltip() })`
2. `onComplete` → `setPortalMounted(false)` — unmount portal

**Reduced motion:** `isReducedModalMotion()` → `applyReducedPortalMotion` / instant unmount.

#### Portal customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  tooltipDuration: 200,
  interactiveEase: "power2.out",
});
```

### 2. Trigger squeeze (`runOpenAfterSqueeze`)

`Popover.Trigger` on `pointerdown` (when closed):

1. `e.preventDefault()` with `asChild` — avoid duplicating squeeze on child Button
2. `runOpenAfterSqueeze({ triggerRef, openingRef, setOpen: true })`

**Close:** `click` when `open=true` → immediate close; `Enter`/`Space` toggle.

### 3. Positioning + reflow

`reposition()` on:

- open + `requestAnimationFrame`
- `scroll` (capture), `resize`
- `ResizeObserver` on panel

`matchAnchorWidth` → `minWidth = max(anchor.width, 12rem)`.

`align` prop or auto `start` when `matchAnchorWidth`.

`resolvedSide` — actual side after flip.

### 4. Shadow / gloss

| variant | Behavior |
|---------|----------|
| `default` | `usePersistentElShadow` — `shadowSm` at rest (2nd level panel) |
| `gloss` | `createGlossInteractiveRefCallback` on gloss panel; gloss pointer handlers |

Gloss panel ref: `bindGlossPanelRef` on inner gloss layer.

### 5. Outside dismiss

`pointerdown` on document → close if target is not in trigger/panel and `shouldDismiss(target)` !== false.

`Escape` → close + focus trigger.

### What's not included

- Hover lift on trigger (squeeze only)
- Ripple (can be added on Trigger child)
- Height collapse inside panel
- FLIP on content change

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Portal enter/exit | `animatePortalOpen/Close` | `tooltipDuration`, `interactiveEase` | `variant` |
| Trigger squeeze | `runOpenAfterSqueeze` | `pressSqueezeScale` | `asChild` |
| Persistent shadow | `usePersistentElShadow` | — | `variant="default"` |
| Gloss interactive | gloss utils | gloss tokens | `variant="gloss"` |
| Reposition | `computeTooltipPlacement` | — | `side`, `align`, `offset` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `POPOVER_DEFAULT_PANEL_CLASS` | `bg-surface border-token` + radius from `PANEL_SIZE_LAYOUT` |
| `POPOVER_GLOSS_PANEL_CLASS` | `gloss-panel gloss-deep` |
| `shadowSm()` via persistent shadow | Rest panel shadow |
| `burneLightThemePortalProps` | Theme sync in portal |
| `z-popover` stacking | Panel above page / dialog (`--z-popover`) |

## Styling and customization

### Two levels

1. **`className` on subparts** — `Trigger`, `Content`, `Label`, `Body` merge into the slot.
2. **`classNames` on root `Popover`** — all slots via provider.

`unstyled` on `Content` — without default `panel` surface; style `Body` or children.

### `PopoverClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | Wrapper | Outer layout (rare) |
| `trigger` | Trigger element | Ring, rounding on button |
| `content` | Portal outer shell | z-index, outer ring |
| `panel` | Default inner panel | Surface, padding, border |
| `glossPanel` / `glossContent` | Gloss layers | Glass surface + inner grid |
| `arrow` | Arrow span | Side tint, size |
| `header` | Header row | Label + hint layout |
| `label` | `h2` title | Title typography |
| `hint` | `FieldHint` | Muted subtitle |
| `body` | Body block | Main content padding |

### Default panel with header

```tsx
<Popover
  side="bottom"
  classNames={{
    panel: "border-primary/25",
    label: "text-primary",
    hint: "text-muted/80",
    body: "text-foreground",
  }}
>
  <Popover.Trigger>
    <Button variant="outline" type="button">Settings</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Header>
      <Popover.Title>Filters</Popover.Title>
      <Popover.Description>Changes apply immediately</Popover.Description>
    </Popover.Header>
    <Popover.Body>Panel content</Popover.Body>
  </Popover.Content>
</Popover>
```

### `matchAnchorWidth` + `unstyled` (like Dropdown)

```tsx
<Popover classNames={{ content: "ring-1 ring-primary/20" }}>
  <Popover.Trigger>Menu</Popover.Trigger>
  <Popover.Content matchAnchorWidth unstyled>
    <Popover.Body className="rounded-mid border border-token bg-surface p-base shadow-token-md">
      Custom surface
    </Popover.Body>
  </Popover.Content>
</Popover>
```

### `anchorRef` + `shouldDismiss`

```tsx
const anchorRef = useRef<HTMLDivElement>(null);

<div ref={anchorRef}>Custom anchor</div>
<Popover anchorRef={anchorRef} shouldDismiss={(t) => !nestedPortalContains(t)}>
  ...
</Popover>
```

### Practical notes

- `anchorRef` — panel to an arbitrary element, not only the trigger.
- `shouldDismiss` — veto for nested portals (Dropdown submenu pattern).
- `contentRole={undefined}` — remove dialog semantics for decorative panels.
- `unstyled` + custom layout in `Body` for custom menus.
- **Do not override `position`/`left`/`top`/`transform` on content** — positioning + GSAP scale.
- Gloss: panel styles on `glossPanel`, content in `glossContent`.
- **Merge order:** variant panel → `classNames.slot` → subpart `className`.

## Integrations

| Component | Scenario |
|-----------|----------|
| `Dropdown` | Action menus (separate component) |
| `Select` / `ComboBox` | Popover-like positioning patterns |
| `Breadcrumbs` | Ellipsis menu via `Dropdown` |

## Accessibility

- Trigger: `aria-expanded`, `aria-controls={popoverId}` when open
- Content: `role="dialog"` (default), `aria-labelledby`, `aria-describedby`
- `Popover.Title` / `Hint` linked via `labelId` / `hintId`
- `Escape` closes
- Outside `pointerdown` dismiss (respects `shouldDismiss`)
- Portal theme sync via `burneLightThemePortalProps`

## File structure

```
Popover/
├── Popover.tsx
├── index.ts
├── popoverTypes.ts
├── popoverStyles.ts
├── popoverAnimations.ts       # lifecycle + positioning
├── popoverParts.tsx
├── usePopoverRootState.ts
├── popoverAPI.ts
├── popoverA11y.ts
├── popoverContext.tsx
└── Popover.stories.tsx
```

## Storybook

`Core Components/Popover` — default/gloss, controlled, anchorRef, matchAnchorWidth, arrow, light theme, `classNames`.
