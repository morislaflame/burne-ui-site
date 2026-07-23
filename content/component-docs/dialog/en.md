# Dialog

Modal dialog built on the native `<dialog>` element with a portal (`portalContainer`, default `document.body`), GSAP enter/leave animations, and compound composition. **Controlled** API only (`open` + `onOpenChange`).

## Import

```tsx
import {
  Dialog,
  type DialogProps,
  type DialogVariant,
  type DialogClassNames,
  type DialogPanelProps,
  type DialogTriggerProps,
} from "burne-ui";
```

## API

### Root (`Dialog`)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | yes | Whether the dialog is open |
| `onOpenChange` | `(open: boolean) => void` | yes | State change handler |
| `children` | `ReactNode` | — | `Dialog.Panel`, `Dialog.Trigger`, … |
| `classNames` | `DialogClassNames` | — | Slots for all sub-parts |
| `portalContainer` | `HTMLElement \| null` | `document.body` | Portal host. Custom host → `show()` + `absolute` (not `showModal` top layer) |

Root **does not render DOM** — only context and the `classNames` provider.

### Compound sub-parts

| Part | Purpose |
|------|---------|
| `Dialog.Trigger` | Opens after press-squeeze; `asChild` merges `id` / `data-*` / `className` / `ref` onto the child |
| `Dialog.Panel` | Portal + overlay + animations; props below |
| `Dialog.Content` | Content wrapper (`p-large`, `gap-mid`) |
| `Dialog.Header` | Header: heading + close |
| `Dialog.HeadingBlock` | Title + description block |
| `Dialog.Title` | `<h2>`, `Text` mid |
| `Dialog.Description` | `<p>`, `text-muted` |
| `Dialog.Close` | `CloseButton` small secondary |
| `Dialog.Body` | Scrollable area |
| `Dialog.Footer` | Buttons, `justify-end` |

### `Dialog.Panel` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `default` \| `gloss` | `default` | Panel surface |
| `dismissOnBackdrop` | `boolean` | `true` | Close on overlay click |
| `className` | `string` | — | On focusable panel wrapper |
| `themeAnchor` | `HTMLElement` | auto | Anchor for light theme in portal |
| `portalContainer` | `HTMLElement \| null` | Root | Override portal host |

### `DialogClassNames`

```tsx
type DialogClassNames = {
  dialog?: string;       // <dialog>
  overlay?: string;
  panel?: string;
  glossPanel?: string;
  glossContent?: string;
  content?: string;
  header?: string;
  headingBlock?: string;
  title?: string;
  description?: string;
  body?: string;
  footer?: string;
  close?: string;
};
```

### Basic example

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Panel>
    <Dialog.Header>
      <Dialog.HeadingBlock>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Description>Description</Dialog.Description>
      </Dialog.HeadingBlock>
      <Dialog.Close />
    </Dialog.Header>
    <Dialog.Body>Content</Dialog.Body>
    <Dialog.Footer>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>OK</Button>
    </Dialog.Footer>
  </Dialog.Panel>
</Dialog>
```

### With `Dialog.Trigger`

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Trigger asChild>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Panel>…</Dialog.Panel>
</Dialog>
```

Trigger calls `e.preventDefault()` on `pointerdown` to suppress the `Button`'s own animation, then `runOpenAfterSqueeze` opens the dialog after the squeeze.

## variant

| variant | Panel |
|---------|-------|
| `default` | `bg-surface border-token shadow-token-lg rounded-mid` |
| `gloss` | `gloss-panel gloss-deep` + `gloss-content` |

`max-w-component-mid`, `max-h-[min(90dvh,36rem)]`.

## Animations

Portal + native `<dialog>`. Motion: `dialogAnimations.ts` (`useDialogModalMotion`) + `modalSurfaceMotion.ts`. Trigger: `runOpenAfterSqueeze`.

**DOM structure (portal):**

```
<dialog>
  <div overlayRef>              ← opacity 0→1
  <div panelRef tabIndex={-1}>  ← scale enter/exit
    <Dialog.Content>            ← layout, no separate motion
      Header / Body / Footer
```

### 1. Open — overlay fade + panel scale

When `open=true`, `mounted=true`:

1. `dialog.showModal()`
2. `animateModalOpen({ overlay, panel, vars: motionInteractive() })`:
   - **overlay:** `opacity: 0 → 1`
   - **panel:** `scale: 0.97` (`MODAL_PANEL_SCALE_FROM`) → `scale: 1`
3. `panel.focus()` — focus trap

**Important:** scale only on panel, **not** `autoAlpha` on panel at open — gloss `backdrop-filter` on children is not broken.

**Scroll lock:** `body.overflow = hidden` while `mounted`.

#### Customizing open/close

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,    // overlay + panel scale
  interactiveEase: "power2.out",
});
```

`MODAL_PANEL_SCALE_FROM = 0.97` — constant in `modalSurfaceMotion.ts`, not in config.

### 2. Close — overlay fade + panel fade + scale

When `open=false`:

1. `animateModalClose`:
   - **overlay:** `opacity → 0`
   - **panel:** `autoAlpha: 0`, `scale: 0.97` (default `panelExit`)
2. `onComplete` → `setMounted(false)` — unmount portal
3. Native `onClose` on `<dialog>` → `onOpenChange(false)`

Kill tweens on unmount via `killMotion(overlay, panel)`.

### 3. Reduced motion

`isReducedModalMotion()` (= `prefers-reduced-motion`):

- `applyReducedModalMotion(overlay, panel, { focusPanel: true })` — instant, no GSAP
- Close — instant unmount

### 4. Dialog.Trigger — open after squeeze

`runOpenAfterSqueeze({ triggerRef, openingRef, setOpen })`:

1. `pointerdown` on Trigger → `e.preventDefault()` **before** child Button (suppresses duplicate squeeze)
2. `animateInteractivePressSqueeze(triggerEl)` → Promise
3. `setOpen(true)` after complete

With reduced motion — `setOpen(true)` immediately. Keyboard click (no pointerdown) — open immediately in `handleClick`.

Uses the same `pressSqueezeScale` / `interactiveDuration` as Button.

### 5. Gloss panel

`createGlossInteractiveRefCallback(glossPanelRef, variant === "gloss")` — gloss surface on inner wrapper. Slide/scale motion on outer `panelRef`; gloss ref for hover on panel (if interactive).

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Note |
|-----------|---------|------------------------|------|
| Open overlay | `animateModalOpen` | `interactiveDuration`, `interactiveEase` | opacity fade |
| Open panel | `animateModalOpen` | same | scale 0.97→1 |
| Close | `animateModalClose` | same | autoAlpha + scale out |
| Trigger squeeze | `runOpenAfterSqueeze` | `pressSqueezeScale`, `enablePressSqueeze` | Dialog.Trigger |
| Reduced motion | `isReducedModalMotion` | — | system setting |
| Scale from | `MODAL_PANEL_SCALE_FROM` | — | constant 0.97 |

## Overlay and theme

| UI theme | Overlay |
|----------|---------|
| Light | `foreground 14%` + `backdrop-blur` |
| Dark | `black 58%` |

Portal theme: `usePortalThemeAnchor`, `useBurneLightTheme`, `burneLightThemePortalProps` — overlay adapts to anchor (e.g. `[data-theme="light"]` in the app).

## Layout

From `modalPanelLayout`:

- `Dialog.Content` — `MODAL_CONTENT_CLASS` (`p-large`, `gap-mid` between Header/Body/Footer)
- `Dialog.Body` — `MODAL_BODY_SCROLL_CLASS` (scroll only in body)

## Tokens and CSS

| Class | Purpose |
|-------|---------|
| `shadow-token-lg` | Panel shadow |
| `border-token`, `bg-surface` | Default surface |
| `max-w-component-mid` | Panel width |
| `rounded-mid` | Border radius |
| `z-dialog` | Stacking dialog (`--z-dialog`) |
| `gloss-panel`, `gloss-deep` | Gloss variant |

## Styling and customization

### Two levels

1. **`classNames` on `<Dialog>`** — portal and layout slots via `DialogClassNamesProvider` (available inside `Dialog.Panel` through portal context).
2. **`className` on `Dialog.Panel`** — additional classes on panel surface (merged with `classNames.panel` / gloss wrapper).

Sub-parts (`Dialog.Title`, `Dialog.Body`, …) accept **`className`** on top of the slot from `classNames`.

### `DialogClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------|
| `dialog` | Native `<dialog>` | Rarely — global dialog element tweaks |
| `overlay` | Backdrop | Blur, opacity, dim color |
| `panel` | Panel surface | Max-width, border, shadow, gloss/default |
| `glossPanel` | Gloss panel wrapper | When `variant="gloss"` |
| `content` | `Dialog.Content` | Padding/gap inside panel |
| `glossContent` | Gloss content wrap | Inner gloss layer |
| `header` | `Dialog.Header` | Title + close layout |
| `headingBlock` | `Dialog.HeadingBlock` | Title + description stack |
| `title` | `Dialog.Title` | Title typography |
| `description` | `Dialog.Description` | Subtitle |
| `body` | `Dialog.Body` | Scroll area, content padding |
| `footer` | `Dialog.Footer` | Buttons, border-top |
| `close` | `Dialog.Close` | Close button styles (passed to CloseButton) |

`Dialog.Panel` prop `variant`: `default` | `gloss`.

### Compound API (primary approach)

```tsx
<Dialog
  open={open}
  onOpenChange={setOpen}
  classNames={{
    overlay: "backdrop-blur-xl",
    panel: "max-w-lg border-primary/40 bg-primary/5 shadow-token-lg",
    title: "text-primary font-semibold",
    description: "text-foreground/80",
    body: "px-large",
    footer: "border-t border-primary/20 pt-small",
    close: "opacity-80",
  }}
>
  <Dialog.Panel variant="gloss" className="ring-1 ring-white/10">
    <Dialog.Header>
      <Dialog.HeadingBlock>
        <Dialog.Title>Settings</Dialog.Title>
        <Dialog.Description>All slots via classNames.</Dialog.Description>
      </Dialog.HeadingBlock>
      <Dialog.Close aria-label="Close dialog" />
    </Dialog.Header>
    <Dialog.Body>
      <p className="text-small text-muted">Modal content.</p>
    </Dialog.Body>
    <Dialog.Footer>
      <Button size="small" onClick={() => setOpen(false)}>Close</Button>
    </Dialog.Footer>
  </Dialog.Panel>
</Dialog>
```

`Dialog.Trigger` — styled with its own `className` (usually a `Button` with `asChild`).

### Practical notes

- **Panel vs Dialog:** `classNames` are set on `<Dialog>`, rendered in the portal inside `Dialog.Panel`.
- **Close:** `Dialog.Close` — `CloseButton` wrapper; accepts `variant`, `size`, `classNames` of CloseButton.
- **Scroll:** only `Dialog.Body` scrolls — set min-height/max-height on the `body` slot.
- **Merge order:** base styles → `classNames.slot` → sub-part `className` / `Dialog.Panel`.

## Accessibility

- Native `<dialog>` + `showModal()` — focus trap, Esc to close.
- `aria-labelledby={titleId}`, `aria-describedby` — when `Dialog.Description` is present.
- `Dialog.Trigger`: `aria-haspopup="dialog"`, `aria-expanded={open}`.
- `Dialog.Close`: default `aria-label="Close"`.
- Backdrop: `aria-hidden`, closes on `mousedown` on overlay (not on panel).

## Context

Internal `useDialog()`:

- `open`, `onOpenChange`, `titleId`, `descriptionId`, `hasDescription`, `setHasDescription`

React context flows through the portal (not through DOM) — `DialogClassNamesProvider` is available in `Dialog.Panel`.

## File structure

```
Dialog/
├── Dialog.tsx
├── index.ts
├── dialogTypes.ts
├── dialogStyles.ts
├── dialogAPI.ts
├── dialogA11y.ts
├── dialogContext.tsx
├── dialogParts.tsx      # Panel, Trigger, portal shell
├── dialogAnimations.ts
├── useDialogRootState.ts
└── Dialog.stories.tsx
```

## Storybook

`Core Components/Dialog` — default, `Dialog.Trigger`, gloss, `classNames`, form in body, light/dark theme, `dismissOnBackdrop={false}`.
