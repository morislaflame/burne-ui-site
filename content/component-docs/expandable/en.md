# Expandable

Collapsible block with a trigger button and an animated panel. Supports **simple API** (`title` / `description` / `icon` props) and **compound API** (`Expandable.Trigger`, `Expandable.Panel`, …).

## Import

```tsx
import {
  Expandable,
  useExpandableContext,
  type ExpandableProps,
  type ExpandableClassNames,
  type ExpandableVariant,
  type ExpandableSize,
} from "burne-ui";
```

## API

### Root props (`Expandable`)

| Prop | Type | Default | Description |
|------|-----|--------------|----------|
| `variant` | `default` \| `gloss` | `default` | Root surface |
| `size` | `small` \| `base` \| `mid` \| `large` | `base` | Trigger height, icons, panel padding |
| `open` | `boolean` | — | Controlled state |
| `defaultOpen` | `boolean` | `false` | Initial (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | State change callback |
| `disabled` | `boolean` | `false` | Disables toggle |
| `compound` | `boolean` | auto | Force compound mode when slots are present in children |
| `title` | `ReactNode` | — | Simple API: trigger title |
| `description` | `ReactNode` | — | Simple API: subtitle |
| `icon` | `ReactNode` | — | Simple API: leading icon |
| `className` | `string` | — | Classes on root `<div>` |
| `classNames` | `ExpandableClassNames` | — | Slots (see below) |

### Compound sub-parts

| Part | Role |
|-------|------------|
| `Expandable.Trigger` | Header button; `hideChevron`, `asChild` |
| `Expandable.Message` | Grid slot wrapper in trigger (`display: contents`) |
| `Expandable.Icon` | Leading indicator icon |
| `Expandable.Content` | Title + description group |
| `Expandable.Title` | Title |
| `Expandable.Description` | Subtitle (`text-muted`) |
| `Expandable.Chevron` | Custom chevron (instead of default) |
| `Expandable.Panel` | Expandable section (`<section>`) |

### `ExpandableClassNames`

```tsx
type ExpandableClassNames = {
  root?: string;
  glossContent?: string;
  trigger?: string;
  triggerLift?: string;
  triggerRippleOverlay?: string;
  message?: string;
  icon?: string;
  content?: string;
  title?: string;
  description?: string;
  chevron?: string;
  panelShell?: string;
  panel?: string;
};
```

### Simple API

```tsx
<Expandable title="FAQ" description="Frequently asked questions" icon={<IoHelp aria-hidden />}>
  <p>Answer to the question…</p>
</Expandable>
```

### Compound API

```tsx
<Expandable defaultOpen>
  <Expandable.Trigger>
    <Ripple color="neutralMuted" />
    <Expandable.Icon><IoStar aria-hidden /></Expandable.Icon>
    <Expandable.Content>
      <Expandable.Title>Title</Expandable.Title>
      <Expandable.Description>Subtitle</Expandable.Description>
    </Expandable.Content>
  </Expandable.Trigger>
  <Expandable.Panel>
    Panel content
  </Expandable.Panel>
</Expandable>
```

Compound mode is detected automatically when slots are present (`Expandable.Trigger`, `Expandable.Panel`, …) or set explicitly via `compound={true}`.

## variant

| variant | Root styles |
|---------|-------------|
| `default` | `border-token bg-surface shadow-token-sm rounded-mid` |
| `gloss` | `gloss-panel gloss-deep border-0` + inner `gloss-content` |

## Sizes

From `CONTROL_SIZE_LAYOUT`:

| size | trigger min-h | trigger padX | panel pad | chevron / icon |
|------|----------------|---------------|------------|----------------|
| `small` | `min-h-control-small` | `px-base` | `px-base pb-base pt-small` | `icon-small` |
| `base` | `min-h-control-base` | `px-mid` | `px-mid pb-mid pt-small` | `icon-base` |
| `mid` | `min-h-control-mid` | `px-large` | `px-large pb-large pt-base` | `icon-large` |
| `large` | `min-h-control-large` | `px-xlarge` | `px-xlarge pb-xlarge pt-base` | `icon-large` |

Text: title uses `controlText` for the size; description uses `small` / `base` depending on size.

## Animations

All motion uses **GSAP**. Logic is split across `expandableAnimations.ts` (trigger, chevron, panel) and shared utilities in `utils/`.

### 1. Panel expand (height collapse)

The main content animation is `useCollapsibleHeight` in `utils/useCollapsibleHeight.ts`, called from `Expandable.Panel`.

**DOM structure:**

```
panelShell (overflow-hidden, animated height)
  └── innerRef
        └── <section> …content…
```

**Opening (`open: false → true`):**

1. `shell.style.overflow = "hidden"`
2. GSAP `fromTo`: `height: 0` → `height: measureCollapsibleContentHeight(inner)` (dynamic via `scrollHeight`)
3. `onComplete` → `releaseExpandedShellHeight`: removes fixed height, returns `height: auto` without a jump

**Closing (`open: true → false`):**

1. Locks current height in px
2. GSAP `to`: `height: 0`
3. `onComplete` → `height: 0px`, `overflow: hidden`

**First paint:** `useCollapsibleShellRef` synchronously sets the initial state before paint (so `defaultOpen` does not flash).

#### Customizing expand

Globally via `configureMotion()` **before** rendering the app:

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  // Panel open/close duration (ms). Default 200.
  expandDuration: 320,
  // GSAP easing. Default "sine.inOut".
  expandOpenEase: "power2.inOut",
  // Full collapsible animation toggle (Expandable, Accordion, Disclosure).
  enableExpandable: true,
});
```

Parameters reach the tween via `motionExpand()` → `{ duration: expandDuration/1000, ease: expandOpenEase }`.

**Reduced motion:** with `prefers-reduced-motion` or `enableExpandable: false` — instant `applyCollapsibleInstantState` without GSAP.

**Programmatic skip:** Disclosure exposes `skipAnimRef` on `useCollapsibleHeight`; Expandable does not export it directly — only the global flag.

### 2. Trigger — press squeeze

`useExpandableTriggerMotion` → on `pointerdown` squeezes the **inner** `liftSpan` (`animateInteractivePressSqueeze`), not the entire `<button>`. This keeps the ripple overlay and chevron from “breaking” on press.

Customization uses shared interactive tokens:

```ts
configureMotion({
  interactiveDuration: 280,       // squeeze duration
  pressSqueezeScale: [1, 0.98, 1], // rest → compressed → rest
  enablePressSqueeze: true,
});
```

Disabled with `prefers-reduced-motion` or `disabled`.

### 3. Chevron — rotation

`useChevronRotation(open, ref, () => getMotionConfig().enableExpandable)` — rotates the SVG on toggle.

- Easing/duration: `motionInteractive()` (`interactiveDuration`, `interactiveEase`)
- Disabled: `enableExpandable: false` or reduced motion

Custom chevron: `<Expandable.Chevron />` — same rotation logic on its own ref.

### 4. Gloss root

`variant="gloss"` → `useMergedGlossPanelRef` on root + `glossInteractive.css`. No separate height motion for gloss — the panel animates the same way; the gloss surface is static until hover on the trigger (if you add interactivity separately).

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys |
|----------|---------|-------------------------|
| Panel expand | `useCollapsibleHeight` | `expandDuration`, `expandOpenEase`, `enableExpandable` |
| Press squeeze | `animateInteractivePressSqueeze` | `interactiveDuration`, `pressSqueezeScale`, `enablePressSqueeze` |
| Chevron rotation | `useChevronRotation` | `interactiveDuration`, `interactiveEase`, `enableExpandable` |
| Trigger ripple | `<Ripple />` | `rippleDefaultDuration`, `enableRipple` (see Ripple.md) |

## Ripple on trigger

`partitionExpandableTriggerRipple` moves child `<Ripple />` elements into an overlay (`EXPANDABLE_TRIGGER_RIPPLE_OVERLAY_CLASS`) covering the full button area. Content and chevron stay in `triggerLift` with `z-[1]`.

## Grid layout

The trigger uses the shared `messageBannerGridLayout` grid (like Alert, Toast):

- columns: indicator | title+description | action (chevron)
- slots are determined automatically by the presence of `Icon`, `Title`, `Description`, `Chevron`

## Tokens and CSS

| Class / token | Role |
|---------------|------------|
| `shadow-token-sm` | Root shadow (default) |
| `border-token`, `bg-surface` | Surface |
| `gloss-panel`, `gloss-deep`, `gloss-content` | Gloss variant |
| `h-control-*`, `px-mid`, `py-base` | Sizes |
| `focus-visible:outline-primary` | Focus on trigger |

## Styling and customization

### Two levels

1. **`className` on root** — merged with `classNames.root`.
2. **`classNames` on root** — slots via `ExpandableClassNamesProvider`.

In compound API, sub-parts (`Expandable.Trigger`, `Expandable.Title`, …) accept **`className`** on top of the slot.

### `ExpandableClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------------|
| `root` | Root div | Border, max-width, outer padding |
| `glossContent` | Gloss inner wrap | With `variant="gloss"` |
| `trigger` | `Expandable.Trigger` button | Background, height, hover surface |
| `triggerLift` | Motion target lift | Use with care — GSAP shadow target |
| `triggerRippleOverlay` | Ripple clip layer | Ripple shape on trigger |
| `message` | `Expandable.Message` | Grid slots in trigger |
| `icon` | `Expandable.Icon` | Leading icon size/color |
| `content` | `Expandable.Content` | Title + description stack |
| `title` | `Expandable.Title` | Title |
| `description` | `Expandable.Description` | Muted subtitle |
| `chevron` | Chevron / `Expandable.Chevron` | Size, rotate target |
| `panelShell` | Panel height anim wrapper | Overflow clip |
| `panel` | `Expandable.Panel` section | Content padding, typography |

`variant`, `size` — trigger height, icons, panel padding from tokens.

### Simple API

```tsx
<Expandable
  className="max-w-md"
  classNames={{
    root: "border border-primary/30 rounded-base",
    trigger: "bg-primary/5 hover:bg-primary/10",
    title: "text-primary font-semibold",
    description: "text-muted",
    panel: "bg-primary/5 text-small",
  }}
  title="FAQ"
  description="Frequently asked questions"
  icon={<IoHelp aria-hidden />}
>
  <p>Answer to the question…</p>
</Expandable>
```

### Compound API

```tsx
<Expandable
  variant="gloss"
  classNames={{
    root: "max-w-lg",
    trigger: "px-xlarge",
    panelShell: "border-t border-token",
  }}
>
  <Expandable.Trigger className="gap-large">
    <Expandable.Icon><IoSettings aria-hidden /></Expandable.Icon>
    <Expandable.Content>
      <Expandable.Title className="text-mid">Settings</Expandable.Title>
      <Expandable.Description>Extended layout</Expandable.Description>
    </Expandable.Content>
    <Expandable.Chevron className="text-muted" />
  </Expandable.Trigger>
  <Expandable.Panel className="p-xlarge">
    Panel content
  </Expandable.Panel>
</Expandable>
```

`hideChevron` on Trigger — custom chevron via `Expandable.Chevron` and the `chevron` slot.

### Practical notes

- **Panel height anim:** do not set a fixed `height` on `panelShell` — it breaks `useCollapsibleHeight`.
- **Ripple:** place `<Ripple />` inside Trigger; clip styles — `triggerRippleOverlay`.
- **Gloss:** with `variant="gloss"` — avoid overriding gloss classes on trigger unless needed.
- **Merge order:** base → `classNames.slot` → sub-part `className`.

## Accessibility

- Trigger: `<button type="button">`.
- `aria-expanded`, `aria-controls` — when `Panel` is present.
- `id` / `aria-labelledby` / `aria-hidden` / `inert` on the panel.
- Keyboard: `Enter` / `Space` on the trigger.
- `asChild` on Trigger — clones props onto the child element.

## Context

`useExpandableContext()` — `open`, `disabled`, `hasPanel`, `size`, `variant`, `toggle`, `headerId`, `panelId`.

## File structure

```
Expandable/
├── Expandable.tsx
├── index.ts
├── expandableTypes.ts
├── expandableStyles.ts
├── expandableAPI.ts
├── expandableA11y.ts
├── expandableContext.tsx
├── expandableParts.tsx
├── expandableAnimations.ts
├── useExpandableRootState.ts
└── Expandable.stories.tsx
```

## Storybook

`Core Components/Expandable` — simple/compound, gloss, ripple, sizes, controlled/uncontrolled.
