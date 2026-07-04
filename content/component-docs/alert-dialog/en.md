# AlertDialog

Confirmation modal built on the native `<dialog>`. Semantics and icons match `Alert`. **Escape and overlay clicks do not close it** — only explicit buttons do.

## Import

```tsx
import {
  AlertDialog,
  useAlertDialog,
  footerButtonSizeForAlertDialog,
  primaryButtonVariantForAlertTone,
  primaryButtonStatusForAlertTone,
  type AlertDialogProps,
  type AlertDialogSize,
  type AlertDialogTriggerProps,
  type AlertDialogHeaderProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogBodyProps,
  type AlertDialogFooterProps,
  type AlertDialogCloseProps,
} from "burne-ui";
```

## API

### Compound API

```tsx
const [open, setOpen] = useState(false);

<AlertDialog open={open} onOpenChange={setOpen} status="danger" size="base">
  <AlertDialog.Trigger asChild>
    <Button variant="outline">Delete account</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Panel>
    <AlertDialog.Header>
      <AlertDialog.HeadingBlock>
        <AlertDialog.Title>Delete account?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. All data will be deleted.
        </AlertDialog.Description>
      </AlertDialog.HeadingBlock>
    </AlertDialog.Header>
    <AlertDialog.Body>Additional context if needed.</AlertDialog.Body>
    <AlertDialog.Footer>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" status="danger" onClick={handleDelete}>
        Delete
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Panel>
</AlertDialog>
```

No simple API — always compound.

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `open` | — | **Required** controlled |
| `onOpenChange` | — | **Required** `(open: boolean) => void` |
| `status` | `default` | `default` \| `danger` \| `success` \| `info` \| `warning` |
| `variant` | `default` | `default` \| `outline` \| `secondary` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `classNames` | — | Customization slots (see below) |
| `children` | — | `Trigger` + `Panel` |

### `AlertDialogClassNames`

| Slot | Element |
|------|---------|
| `dialog` | Native `<dialog>` |
| `overlay` | Backdrop |
| `panel` | Outer panel shell |
| `glossPanel` | Gloss shell (`variant="gloss"`) |
| `glossContent` | Inner gloss content |
| `content` | Content wrapper |
| `trigger` | `AlertDialog.Trigger` |
| `header` | Header grid |
| `indicator` | Status icon |
| `headingBlock` | Title + description grid cell |
| `title` | Heading |
| `description` | Subtitle |
| `body` | Scrollable body |
| `footer` | Actions row |
| `close` | Close button |

### Compound subparts

| Part | Purpose |
|------|---------|
| `AlertDialog.Trigger` | Opens dialog; `asChild`; squeeze before open |
| `AlertDialog.Panel` | Portal → `document.body`; `<dialog>` |
| `AlertDialog.Content` | Inner padding wrapper |
| `AlertDialog.Header` | Grid header; auto `Indicator` + `Close` |
| `AlertDialog.Indicator` | Status icon (`SEMANTIC_STATUS_ICONS`) |
| `AlertDialog.HeadingBlock` | `display: contents` for grid |
| `AlertDialog.Title` | `Text as="h2"` → `aria-labelledby` |
| `AlertDialog.Description` | Muted subtitle → `aria-describedby` |
| `AlertDialog.Body` | Scrollable content |
| `AlertDialog.Footer` | Actions row; auto `Button` size |
| `AlertDialog.Close` | `CloseButton` |

### `useAlertDialog()`

Context: `open`, `titleId`, `descriptionId`, `hasDescription`, `onOpenChange`, `variant`, `status`, `size`, `footerButtonSize`.

### Button tone helpers

```tsx
footerButtonSizeForAlertDialog("base");        // → ButtonSize
primaryButtonVariantForAlertTone("danger");    // → "primary"
primaryButtonStatusForAlertTone("danger");     // → "danger"
```

## variant / status / sizes

| `status` | Effect |
|----------|--------|
| `default` | No semantic icon by default |
| `danger` / `success` / `info` / `warning` | Icon in header, tint indicator |

| `variant` | Panel surface |
|-----------|---------------|
| `default` | `alertSurfaceClass` + `shadow-token-lg` |
| `outline` / `secondary` | Semantic surfaces |
| `gloss` | `gloss-panel gloss-deep` |

| size | max-width | title / body Text |
|------|-----------|-------------------|
| `small` | `max-w-component-small` | `base` / `small` |
| `base` | `max-w-component-mid` | `mid` / `base` |
| `mid` | `max-w-component-mid` | `mid` / `base` |
| `large` | `max-w-component-large` | `large` / `mid` |

## Animations

`alertDialogAnimations.ts` → `useAlertDialogModalMotion`.

**DOM:**

```
<Trigger>                              ← runOpenAfterSqueeze
portal → document.body
  <dialog ref=dialogRef role=alertdialog>
    <div ref=overlayRef />             ← fade overlay
    <div ref=panelRef tabIndex=-1>     ← scale 0.97→1
      <Header grid> Indicator Title Close
      <Body scroll>
      <Footer>
```

### 1. Open pipeline

1. `open=true` → `setMounted(true)`
2. `dialog.showModal()`
3. `animateModalOpen` — overlay fade + panel scale (`motionInteractive()`)
4. `panel.focus()`
5. `document.body.overflow = hidden`

### 2. Close pipeline

1. `animateModalClose` — fade + scale out
2. `setMounted(false)` → unmount portal

**Reduced motion:** `isReducedModalMotion()` → `applyReducedModalMotion`.

### 3. Trigger squeeze

`AlertDialog.Trigger` → `runOpenAfterSqueeze` (same as `Dialog` / `Popover`).

### 4. Gloss panel

`variant="gloss"` → `createGlossInteractiveRefCallback` on gloss shell.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  pressSqueezeScale: [1, 0.98, 1],
});
```

Portal motion: `modalSurfaceMotion.ts` (`animateModalOpen/Close`).

### What's not included

- Dismiss on Escape (`onCancel` → `preventDefault`)
- Dismiss on overlay click
- Built-in ripple

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Modal open/close | `useAlertDialogModalMotion` | `interactiveDuration`, `interactiveEase` | `open` |
| Trigger squeeze | `runOpenAfterSqueeze` | `pressSqueezeScale` | `asChild` |
| Gloss ref | gloss utils | gloss tokens | `variant="gloss"` |
| Body scroll lock | useEffect | — | `open` |

## Tokens and CSS

`alertDialogStyles.ts`:

| Class / preset | Purpose |
|----------------|---------|
| `ALERT_DIALOG_NATIVE_CLASS` | Fixed fullscreen `<dialog>`, z-100 |
| `alertDialogPanelClass` | Shell + max-width/height |
| `alertDialogGlossPanelClass` | Gloss shell |
| `alertDialogOverlayClass` | → `dialogOverlayClass` |
| `ALERT_DIALOG_FOOTER_CLASS` | `flex justify-end gap-base` |
| `messageBannerGridLayout` | Header grid (same as Alert) |
| `MODAL_BODY_SCROLL_CLASS` | Scrollable body |

## Styling and customization

### Two levels

1. **`classNames` on root** — single entry point for all slots (same as `Dialog`).
2. **`className` on subparts** — targeted overrides; merged on top of `classNames`.

| Part | `classNames` slot | `className` prop |
|------|-------------------|------------------|
| Root | all slots | — |
| `Panel` | `panel` | outer shell in portal |
| `Trigger` | `trigger` | button / asChild |
| `Header`, `Title`, `Description`, `Body`, `Footer` | corresponding slots | per-part |
| `Indicator`, `Close`, `Content` | corresponding slots | per-part merge |

### Customization via `classNames`

```tsx
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  status="danger"
  classNames={{
    panel: "ring-1 ring-danger/20",
    title: "text-danger font-semibold",
    footer: "border-t border-danger/20 pt-small",
  }}
>
  ...
</AlertDialog>
```

### Confirm delete (danger)

```tsx
<AlertDialog open={open} onOpenChange={setOpen} status="danger" size="base">
  <AlertDialog.Trigger asChild>
    <Button variant="outline" status="danger">Delete</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Panel className="ring-1 ring-danger/20">
    <AlertDialog.Header>
      <AlertDialog.HeadingBlock>
        <AlertDialog.Title>Delete file?</AlertDialog.Title>
        <AlertDialog.Description>The file cannot be restored.</AlertDialog.Description>
      </AlertDialog.HeadingBlock>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button
        variant={primaryButtonVariantForAlertTone("danger")}
        status={primaryButtonStatusForAlertTone("danger")}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Panel>
</AlertDialog>
```

### Gloss + status

```tsx
<AlertDialog open={open} onOpenChange={setOpen} variant="gloss" status="info">
  ...
</AlertDialog>
```

`themeAnchor` on `Panel` — light theme inheritance in portal.

### Practical notes

- `open` and `onOpenChange` are **required** (fully controlled).
- Primary action: use `primaryButtonStatusForAlertTone(status)`.
- Footer `Button` receives `size` from context automatically (`injectFooterButtonSize`).
- `AlertDialog.Description` registers `hasDescription` → `aria-describedby`.
- `children={null}` on `Indicator` hides the icon.
- **Do not rely on Escape/backdrop** — by design for alertdialog.
- Comparison with `Dialog`: no dismiss, has `status`, `role="alertdialog"`.

## Integrations

| Component | Role |
|-----------|------|
| `Alert` | `status`, `variant`, surfaces, icons, grid |
| `Dialog` | Overlay styles, modal patterns |
| `Button` / `CloseButton` | Footer actions |
| `Text` | Title, Description, Body |
| `modalSurfaceMotion` | GSAP open/close |
| `runOpenAfterSqueeze` | Trigger |
| `burneLightThemePortalProps` | Portal theme |

## Accessibility

| Aspect | Implementation |
|--------|----------------|
| Role | `role="alertdialog"` on `<dialog>` |
| Label | `aria-labelledby={titleId}` |
| Description | `aria-describedby` when Description is present |
| Focus | `panel.focus()` on open; `tabIndex={-1}` on panel |
| Trigger | `aria-haspopup="dialog"`, `aria-expanded` |
| Escape / backdrop | **Blocked** |
| Indicator icons | `aria-hidden` |
| Close | Explicit buttons only |

## File structure

```
AlertDialog/
├── AlertDialog.tsx
├── index.ts
├── alertDialogTypes.ts
├── alertDialogStyles.ts
├── alertDialogAPI.ts
├── alertDialogAnimations.ts
├── alertDialogContext.tsx
├── alertDialogParts.tsx
├── useAlertDialogRootState.ts
├── useAlertDialog.ts
└── AlertDialog.stories.tsx
```

## Storybook

`Composite Components/AlertDialog` — confirm delete, all statuses, sizes, gloss, gloss light theme, `CustomClassNames`.

Playground: `playground/showcase/demos/alertDialog/`.

## Comparison with Dialog

| | `Dialog` | `AlertDialog` |
|---|----------|---------------|
| `classNames` | ✅ | ✅ |
| `status` | ❌ | ✅ |
| Escape / backdrop dismiss | ✅ | ❌ |
| `role` | `dialog` | `alertdialog` |
| Header icons | ❌ | ✅ (from Alert) |
| Footer button size | manual | auto from `size` |
