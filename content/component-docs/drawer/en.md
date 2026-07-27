# Drawer

A side (or top/bottom) panel over content: native `<dialog>`, slide-in/out by `placement`, optional drag-to-dismiss via handle. Controlled API (`open` + `onOpenChange`).

## Import

```tsx
import {
  Drawer,
  type DrawerProps,
  type DrawerPlacement,
  type DrawerSize,
  type DrawerVariant,
  type DrawerClassNames,
} from "burne-ui";
```

## API

### Root (`Drawer`)

| Prop | Default | Description |
|------|---------|-------------|
| `open` | — | Controlled state |
| `onOpenChange` | — | Open/close callback |
| `placement` | `right` | `left` \| `right` \| `top` \| `bottom` |
| `size` | `base` | Chrome density (`PANEL_SIZE_LAYOUT`): padding, typography, close/footer buttons |
| `classNames` | — | Portal and panel slots |

### Compound sub-parts

| Part | Role |
|------|------|
| `Drawer.Trigger` | Opens after press-squeeze; `asChild` |
| `Drawer.Panel` | Portal + overlay + slide motion |
| `Drawer.Backdrop` | Marker `isDismissable={false}` (renders `null`) |
| `Drawer.Handle` | Drag handle for swipe-dismiss |
| `Drawer.Content` | Layout wrapper (`p-xlarge`, `gap-large`) |
| `Drawer.Header` / `HeadingBlock` / `Title` / `Description` | Header |
| `Drawer.Body` | Scrollable area |
| `Drawer.Footer` | Buttons |
| `Drawer.Close` | `CloseButton` |

### `Drawer.Panel`

| Prop | Default | Description |
|------|---------|-------------|
| `extent` | `default` | `default` \| `mid` \| `full` |
| `variant` | `default` | `default` \| `gloss` |
| `themeAnchor` | auto | Theme anchor for portal overlay |
| `className` | — | On focusable panel wrapper |

### Example

```tsx
const [open, setOpen] = useState(false);

<Drawer open={open} onOpenChange={setOpen} placement="right">
  <Drawer.Trigger asChild>
    <Button>Menu</Button>
  </Drawer.Trigger>
  <Drawer.Panel extent="default">
    <Drawer.Handle />
    <Drawer.Header>
      <Drawer.HeadingBlock>
        <Drawer.Title>Filters</Drawer.Title>
      </Drawer.HeadingBlock>
      <Drawer.Close />
    </Drawer.Header>
    <Drawer.Body>…</Drawer.Body>
  </Drawer.Panel>
</Drawer>
```

`Drawer.Backdrop isDismissable={false}` — disable closing on overlay click.

## placement, extent, and size

| placement | Slide axis | Panel position |
|-----------|------------|----------------|
| `left` | `xPercent: -100 → 0` | `left-0 top-0 h-full` |
| `right` | `xPercent: 100 → 0` | `right-0 top-0 h-full` |
| `top` | `yPercent: -100 → 0` | `top-0 inset-x-0` |
| `bottom` | `yPercent: 100 → 0` | `bottom-0 inset-x-0` |

`extent` on `Drawer.Panel` — viewport share. `size` on `Drawer` — chrome from `PANEL_SIZE_LAYOUT` (same as Dialog / Card).

| extent | horizontal drawer | vertical drawer |
|------|-------------------|-----------------|
| `default` | `max-w-[min(100vw,24rem)]` | `max-h-[90dvh]` |
| `mid` | `50vw` | `max-h-[50dvh]` |
| `full` | `w-screen` | `h-dvh` |

Edge rounding: `rounded-*-{size}` (`extent="full"` — no rounding).

## Animations

`drawerAnimations.ts` (`useDrawerModalMotion`) + `useDrawerHandleDrag.ts` + `runOpenAfterSqueeze` on Trigger.

**DOM structure (portal):**

```
<dialog>
  <div overlayRef>              ← opacity, drag-sync fade
  <div panelRef tabIndex={-1}>  ← slide x/yPercent, drag translate
    [Drawer.Handle]             ← pointer capture drag
    <Drawer.Content> …
```

### 1. Open — slide + overlay fade

When `open=true`, `mounted=true`:

1. `dialog.showModal()`
2. `animateModalOpen`:
   - **overlay:** `opacity: 0 → 1`
   - **panel from→to** by `placement`:

| placement | panelFrom | panelTo |
|-----------|-----------|---------|
| `left` | `xPercent: -100` | `xPercent: 0` |
| `right` | `xPercent: 100` | `0` |
| `top` | `yPercent: -100` | `0` |
| `bottom` | `yPercent: 100` | `0` |

**vars:** `motionInteractive()`. No scale (unlike Dialog).

**Focus:** `panelRef.focus()`. **Scroll lock:** `body.overflow = hidden`.

### 2. Close — slide out + overlay fade

`animateModalClose` + `panelExit: getDrawerSlideOutTo(placement)` — mirror of slide-in.

**Skip close anim:** after successful drag-dismiss `skipCloseAnimRef = true` → unmount without repeating exit.

### 3. Drag-to-dismiss (`Drawer.Handle`)

`useDrawerHandleDrag(panelRef, overlayRef, placement, onClose)`:

**pointerdown** → capture → `killMotion`

**pointermove:**

- `gsap.set(panel, { x|y: clampedDelta })` — only outward from the edge
- overlay `opacity = 1 - progress`

**pointerup:**

| Condition | Action |
|-----------|--------|
| `ratio ≥ 0.38` of path OR velocity ≥ `0.45` px/ms | dismiss timeline → `onClose()` + `skipCloseAnimRef` |
| otherwise | snap-back panel→0, overlay→1 |

Axis: `left/right` → `x`, `top/bottom` → `y`.

**Reduced motion:** drag is fully disabled.

Thresholds `0.38` / `0.45` — constants in `useDrawerHandleDrag.ts`.

### 4. Trigger open squeeze

Same as `Dialog.Trigger`: `e.preventDefault()` + `runOpenAfterSqueeze` → `animateInteractivePressSqueeze` → `onOpenChange(true)`.

### 5. Gloss panel

Slide on `panelRef`; `bindGlossPanelRef` on gloss wrapper — surface gloss motion.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 350,
  interactiveEase: "power3.out",
  pressSqueezeScale: [1, 0.98, 1],
  enablePressSqueeze: true,
});
```

Slide keyframes — in `drawerAPI.ts`, not in config.

### Summary: what is configured where

| Animation | Utility | `configureMotion` | Hardcode |
|-----------|---------|-------------------|----------|
| Open slide | `animateModalOpen` | `interactiveDuration`, `interactiveEase` | slide % in `drawerAPI` |
| Close slide | `animateModalClose` | same | `getDrawerSlideOutTo` |
| Drag dismiss | `useDrawerHandleDrag` | interactive (finish) | ratio 0.38, velocity 0.45 |
| Drag snap-back | `useDrawerHandleDrag` | interactive | — |
| Trigger squeeze | `runOpenAfterSqueeze` | `pressSqueezeScale` | — |
| Skip close after drag | `skipCloseAnimRef` | — | internal flag |

### Comparison with Dialog

| | Dialog | Drawer |
|---|--------|--------|
| Panel enter | scale 0.97→1 | slide x/yPercent |
| Drag dismiss | no | `Drawer.Handle` |
| Close skip | no | after drag |

## Tokens and CSS

| Element | Classes |
|---------|---------|
| Overlay light | `overlay-backdrop` (`--overlay-backdrop-color` + blur) |
| Overlay dark | `overlay-backdrop-scrim` (`--overlay-backdrop-scrim`) |
| Panel | `bg-surface border-token shadow-token-lg` |
| Gloss | `gloss-panel gloss-deep` |
| Handle grip | `bg-tertiary`, `rounded-full` |
| z-index | `z-dialog` (`--z-dialog`) |

## Styling and customization

### Two levels

1. **`classNames` on `<Drawer>`** — portal slots via `DrawerClassNamesProvider`.
2. **`className` on `Drawer.Panel`** — additional surface classes (size, placement, variant).

Sub-parts (`Drawer.Title`, `Drawer.Handle`, …) accept **`className`** on top of the slot.

### `DrawerClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------|
| `dialog` | Native `<dialog>` | Global dialog tweaks |
| `overlay` | Backdrop | Blur, opacity |
| `panel` | Panel surface | Width/height by `size`, border, shadow |
| `glossPanel` | Gloss wrapper | When `variant="gloss"` |
| `glossContent` | Gloss inner wrap | Inner gloss layer |
| `content` | `Drawer.Content` | Padding inside panel |
| `handle` | Drag handle | Hit area, padding (top/bottom placement) |
| `handleGrip` | Grip lines | Handle visual |
| `header` | `Drawer.Header` | Title row + close |
| `headingBlock` | Title + description | Header stack |
| `title` | `Drawer.Title` | Typography |
| `description` | `Drawer.Description` | Subtitle |
| `body` | `Drawer.Body` | Scroll area |
| `footer` | `Drawer.Footer` | Actions row |
| `close` | `Drawer.Close` | CloseButton styles |

`Drawer.Panel`: `extent` (`default` | `mid` | `full`), `variant` (`default` | `gloss`); `placement` / `size` on `<Drawer>`.

### Compound API

```tsx
<Drawer
  open={open}
  onOpenChange={setOpen}
  placement="bottom"
  classNames={{
    overlay: "backdrop-blur-2xl",
    panel: "max-h-[85vh] border-primary/40 shadow-token-lg",
    handle: "py-mid",
    header: "border-b border-primary/20 pb-small",
    title: "text-primary font-semibold",
    description: "text-foreground/75",
    body: "px-xlarge",
    footer: "border-t border-primary/20 pt-small",
  }}
>
  <Drawer.Panel extent="mid" variant="gloss">
    <Drawer.Handle />
    <Drawer.Header>
      <Drawer.HeadingBlock>
        <Drawer.Title>Settings</Drawer.Title>
        <Drawer.Description>All slots via classNames.</Drawer.Description>
      </Drawer.HeadingBlock>
      <Drawer.Close />
    </Drawer.Header>
    <Drawer.Body>…</Drawer.Body>
    <Drawer.Footer>
      <Button size="small" onClick={() => setOpen(false)}>Close</Button>
    </Drawer.Footer>
  </Drawer.Panel>
</Drawer>
```

`Drawer.Trigger` — `className` on the trigger (often `Button` + `asChild`).

### Practical notes

- **Handle:** rendered only for `placement="top"|"bottom"`; grip styles — `handle` + `handleGrip`.
- **Size:** `full` / `mid` set panel width/height — extend via `classNames.panel`.
- **Swipe dismiss:** do not disable `pointer-events` on handle when customizing.
- **Merge order:** base → `classNames.slot` → sub-part `className` / `Drawer.Panel`.

## Accessibility

- `<dialog>` + `showModal()`, Esc → `onClose`
- `aria-labelledby` / `aria-describedby`
- Handle: `aria-label` by placement ("Pull down to close")
- `Drawer.Close` → `aria-label="Close"`

## File structure

```
Drawer/
├── Drawer.tsx
├── drawerAnimations.ts      # slide open/close
├── useDrawerHandleDrag.ts   # swipe dismiss
├── drawerAPI.ts             # slide keyframes
├── drawerParts.tsx
└── …
```

## Storybook

`Core Components/Drawer` — placement, size, gloss, handle drag, `isDismissable={false}`, Trigger.
