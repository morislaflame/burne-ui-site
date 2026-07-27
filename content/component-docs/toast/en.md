# Toast

Portal-based notifications (`document.body`): stack with peek effect, GSAP enter/leave, imperative API via `useToast`. **Second-level** component — persistent shadow `shadow-token-md` (default variant).

## Import

```tsx
import {
  Toast,
  ToastContext,
  useToast,
  useToastContext,
  type ToastStatus,
  type ToastVariant,
  type ToastPlacement,
  type ToastClassNames,
  type AddToastOpts,
} from "burne-ui";
```

## API

Two modes: **imperative** (via Provider + `useToast`) and **declarative** (`<Toast />` as a card).

### Provider

```tsx
<Toast.Provider defaultPlacement="bottom-center" defaultVariant="default" classNames={…}>
  {app}
</Toast.Provider>
```

| Prop | Default | Description |
|------|---------|-------------|
| `defaultPlacement` | `bottom-center` | Position when not specified in `add()` |
| `defaultVariant` | `default` | Card variant |
| `classNames` | — | Slots: viewport / stack / scrim / card |

### `useToast()`

```tsx
const { toast } = useToast();

toast.success("Saved");
toast.danger("Error", { description: "…", timeout: 6000 });
toast.show({ status: "info", title: "…", placement: "top-right" });

const id = toast.promise(save(), {
  loading: "Saving…",
  success: (data) => `Done: ${data.id}`,
  error: (e) => `Error: ${e}`,
});
toast.dismiss(id);
```

| Method | Description |
|--------|-------------|
| `show(opts)` | Add toast, return `id` |
| `success` / `danger` / `info` / `warning` | Shortcuts with `status` |
| `promise(p, opts)` | loading → success/error |
| `dismiss(id)` | Start dismiss animation |

`AddToastOpts`: `status`, `variant`, `title`, `description`, `action`, `timeout` (default 4000 ms, `0` = do not close), `placement`, `id`, `loading`, `classNames`.

### Toast.Root (card)

Simple + compound (like Alert): `Toast.Title`, `Toast.Description`, `Toast.Indicator`, `Toast.Action`, `Toast.Close`.

| Prop | Default | Description |
|------|---------|-------------|
| `status` | `default` | Semantic surface tone |
| `variant` | `default` | `default` \| `gloss` |
| `loading` | `false` | Spinner instead of status icon |
| `onClose` | — | Shows close button (simple API) |
| `classNames` | — | Card slots |

## variant and status

| variant | Surface |
|---------|---------|
| `default` | `TOAST_SURFACE_CLASS` + `shadow-token-md` |
| `gloss` | `gloss-panel gloss-deep` + `GLOSS_INTERACTIVE_MOTION_CLASS` |

| status | Background / icon |
|--------|-------------------|
| `default` | `bg-surface`, `text-primary` |
| `success` / `danger` / `info` / `warning` | same `bg-surface`; semantic icon + title color |

## Animations

All stack motion logic lives in `toastAnimations.tsx`. Three independent layers per toast + viewport-level animations.

**DOM structure (viewport):**

```
<div viewport>                         ← fixed, placement
  <div scrimRef>                       ← gradient fade
  <div containerRef>                   ← animated height
    <div stackRef>                     ← peek/scale per toast (grid 1×1)
      <div animRef>                    ← enter/exit slide
        <ToastRoot ref=cardRef>        ← ResizeObserver height
```

### 1. Card enter (portal open)

On `animRef` mount → `animatePortalOpen`:

- **from:** `y: ±24px` (`TOAST_ENTRY_OFFSET_PX`), `scale: 0.97` (`MODAL_PANEL_SCALE_FROM`)
- **to:** `y: 0`, `scale: 1`
- **vars:** `motionInteractive()` → `interactiveDuration`, `interactiveEase`

Direction: `top-*` → `y: -24`, `bottom-*` → `y: +24`.

**Reduced motion:** `isReducedModalMotion()` → `applyReducedPortalMotion` without GSAP.

### 2. Dismiss (portal close)

When `isDismissing`:

```ts
animatePortalClose({
  surface: animRef,
  vars: { ...motionToastDismiss() }, // toastDismissDuration / toastDismissEase
  exit: { y: slideDir },
  onComplete: () => removeFromDOM,
});
```

Dismiss comes from `configureMotion` (`toastDismissDuration`, default 220 ms).

### 3. Stack — reposition (peek + scale)

On `stackRef` when stack position changes:

| reverseIdx | scale | y offset | opacity |
|------------|-------|----------|---------|
| 0 | 1 | 0 | 1 |
| 1 | 0.96 | ±8px | 1 |
| 2 | 0.92 | ±16px | 1 |
| ≥3 | — | — | 0 (hidden) |

Constants: `TOAST_STACK_PEEK_PX=8`, `TOAST_STACK_SCALE_STEP=0.04`, `TOAST_MAX_VISIBLE=3`.

First mount (non-gloss): extra fade `opacity: 0 → 1` on stack layer.

`transformOrigin`: `top center` / `bottom center` based on placement.

### 4. Stack container height

`frontHeight` (ResizeObserver on card) + `extraPeek` → GSAP `to(container, { height })` with `motionInteractive()`.

### 5. Scrim (gradient)

`scrimRef`: fade `opacity 0↔1`. Last toast dismiss → `motionToastDismiss()` (same as card exit).

Tokens: `--toast-scrim-*` (`tokens/toastScrim.ts`).

### 6. Gloss hover on card

`variant="gloss"` on `ToastRoot` → `useGlossInteractiveHandlers` (local, not stack).

### 7. Auto-dismiss

`setTimeout` — not GSAP. `timeout: 0` or `loading` — no timer.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  enableToastStack: true,       // peek/scale/height — instant if false
  interactiveDuration: 320,     // enter slide, stack reposition, container height, scrim in
  interactiveEase: "power2.out",
  toastDismissDuration: 220,    // dismiss slide + last scrim out
  toastDismissEase: "power2.in",
});
```

`TOAST_*` constants in `toastAPI.ts` — not in config (requires a PR to change).

### Summary: what is configured where

| Animation | Element | `configureMotion` | Constants / hardcode |
|-----------|---------|-------------------|------------------------|
| Enter slide | `animRef` | `interactiveDuration`, `interactiveEase` | `ENTRY_OFFSET_PX=24`, `SCALE_FROM=0.97` |
| Dismiss slide | `animRef` | `toastDismissDuration`, `toastDismissEase` | — |
| Stack peek/scale | `stackRef` | `enableToastStack`, `interactiveDuration` | `PEEK`, `SCALE_STEP`, `MAX_VISIBLE` |
| Container height | `containerRef` | `enableToastStack`, `interactiveDuration` | — |
| Scrim | `scrimRef` | `interactiveDuration` (in), `toastDismissDuration` (out) | — |
| Gloss hover | `ToastRoot` | interactive | `variant="gloss"` |
| Auto-close | — | — | `timeout` prop (default 4000) |

## Tokens and CSS

| Element | Classes / tokens |
|---------|------------------|
| Card | `rounded-mid py-base px-mid`, `shadow-token-md` |
| Viewport | `fixed z-toast` (`--z-toast`), placement offsets (`top-4`, …) |
| Scrim | `toastScrimToken(gradientTop/Bottom, mask, …)` |
| Width | `360px` (`TOAST_WIDTH_PX`) |

## Styling and customization

### Three levels

1. **`Toast.Provider classNames`** — global slots for viewport, scrim, stack + card defaults.
2. **Per-toast `classNames`** — in `toast.show({ classNames })` / `toast.success(…, { classNames })`; merged on top of provider.
3. **`Toast.Root classNames`** — declarative card (simple/compound), like Alert.

Subparts (`Toast.Title`, `Toast.Close`, …) accept **`className`** on top of the slot.

### `ToastClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------|
| `viewport` | Fixed region | Position (`top-8`), z-index |
| `scrim` | Gradient fade | Transparency under stack |
| `stack` | Peek stack container | Gap between cards in stack |
| `root` | Toast card | Border, ring, max-width |
| `indicator` | Status / loading icon | Icon color |
| `message` | Message grid | Layout indicator + content |
| `content` | Title + description block | Gap inside text |
| `title` | Title | Typography |
| `description` | Description | Muted tone |
| `action` | Action button slot | Button alignment |
| `close` | Close button | Dismiss styles |

### Imperative API (primary)

```tsx
<Toast.Provider
  classNames={{
    viewport: "top-8",
    scrim: "opacity-90",
    stack: "gap-2",
    root: "border-primary/30",
    close: "text-muted",
  }}
>
  {app}
</Toast.Provider>

// In a component:
toast.show({
  status: "info",
  title: "Full customization",
  description: "root, title, description slots.",
  classNames: {
    root: "rounded-large border-info/50 bg-info/10 ring-1 ring-info/20",
    indicator: "text-info",
    title: "font-semibold text-info",
    description: "text-foreground/80",
  },
});
```

Per-toast `classNames` **override** matching provider keys for that card.

### Declarative / compound API

```tsx
<Toast
  status="success"
  onClose={() => {}}
  classNames={{
    root: "max-w-sm",
    title: "font-semibold",
    close: "opacity-70",
  }}
  title="Done"
  description="File uploaded"
/>

// Compound:
<Toast status="info" onClose={dismiss}>
  <Toast.Indicator />
  <Toast.Message>
    <Toast.Content>
      <Toast.Title className="text-info">Update</Toast.Title>
      <Toast.Description>A new version is available.</Toast.Description>
    </Toast.Content>
  </Toast.Message>
  <Toast.Close />
</Toast>
```

### Practical notes

- **Provider vs toast:** viewport/scrim/stack — only on Provider; card — provider defaults + per-toast override.
- **Gloss:** `variant="gloss"` on `toast.show` or `Toast.Root`; avoid breaking `gloss-panel` unless needed.
- **2nd level:** persistent `shadow-token-md` on the card.
- **Merge order:** provider → per-toast / Root `classNames` → subpart `className`.

## Accessibility

- Viewport: `role="region"`, `aria-label` by placement.
- Card: `role` = `status` / `alert`, `aria-live` polite/assertive.
- Hidden in stack (idx ≥ 3): `aria-hidden` on wrapper.
- Only front toast: `pointer-events: auto`.

## File structure

```
Toast/
├── Toast.tsx
├── toastProvider.tsx
├── toastAnimations.tsx    # stack + enter/leave
├── toastAPI.ts            # stack constants
├── toastStyles.ts
├── useToast.ts
└── …
```

## Storybook

`Core Components/Toast` — imperative API, promise, gloss, placement, compound.
