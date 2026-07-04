# Disclosure

Expandable block (WAI-ARIA disclosure pattern). **Compound API only:** `Trigger`, `Content`, optionally `Handle` (drag). The `DisclosureGroup` container is an accordion with `accordion` / `separated`.

## Import

```tsx
import {
  Disclosure,
  DisclosureGroup,
  type DisclosureProps,
  type DisclosureGroupProps,
  type DisclosureTriggerProps,
  type DisclosureContentProps,
  type DisclosureVariant,
  type DisclosureSize,
  type DisclosureIconPos,
  type DisclosureClassNames,
} from "burne-ui";
```

## API

### Compound API

```tsx
<Disclosure defaultOpen variant="outline" size="base">
  <Disclosure.Trigger>Title</Disclosure.Trigger>
  <Disclosure.Content>Panel content</Disclosure.Content>
</Disclosure>
```

### Card + drag handle

```tsx
<Disclosure variant="card" dragHandle defaultOpen>
  <Disclosure.Trigger>Card</Disclosure.Trigger>
  <Disclosure.Content>Resizable content</Disclosure.Content>
  <Disclosure.Handle />
</Disclosure>
```

### DisclosureGroup (accordion)

```tsx
<DisclosureGroup defaultValue="faq-1" variant="secondary">
  <Disclosure value="faq-1">
    <Disclosure.Trigger>Question 1</Disclosure.Trigger>
    <Disclosure.Content>Answer 1</Disclosure.Content>
  </Disclosure>
  <Disclosure value="faq-2">
    <Disclosure.Trigger>Question 2</Disclosure.Trigger>
    <Disclosure.Content>Answer 2</Disclosure.Content>
  </Disclosure>
</DisclosureGroup>
```

No Simple API.

### Root props (`Disclosure`)

| Prop | Default | Description |
|------|---------|-------------|
| `open` / `defaultOpen` | `false` | Controlled / uncontrolled |
| `onOpenChange` | — | `(open: boolean) => void` |
| `value` | — | ID for `DisclosureGroup` + `accordion` |
| `variant` | `default` | Visual style (inherited from group) |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `disabled` | `false` | Disables trigger |
| `iconPos` | `right` | `left` \| `right` |
| `dragHandle` | `false` | Drag-to-expand (`variant="card"` only) |
| `className` | — | On root |
| `classNames` | — | Slots |

### `Disclosure.Trigger` props

| Prop | Default | Description |
|------|---------|-------------|
| `icon` | `IoChevronDown` | Custom icon; `null` — no chevron |
| `asChild` | `false` | Clone child with ARIA/handlers |
| `className` | — | On `<button>` |

### `DisclosureGroup` props

| Prop | Default | Description |
|------|---------|-------------|
| `accordion` | `true` | One open at a time; click again to close |
| `separated` | `false` | Separate blocks vs single shell |
| `variant` / `size` | `default` / `base` | Inherited by children |
| `value` / `defaultValue` | — | Open `value` in the group |
| `onValueChange` | — | `(value: string \| null) => void` |
| `classNames` | — | `group` slot |

When `accordion={false}`, each `Disclosure` manages its own `open` independently.

### `DisclosureClassNames`

`root`, `trigger`, `triggerTitleLift`, `triggerTitle`, `triggerChevron`, `contentShell`, `contentWrap`, `contentPanel`, `glossPanel`, `glossContent`, `handle`, `group`.

## variant and sizes

| variant | Behavior |
|---------|----------|
| `default` | Trigger + content; in a group — `divide-y-token` |
| `outline` | Border only on content (`FRAMED_PANEL`) |
| `secondary` | Framed + `bg-secondary` |
| `card` | Single card `shadow-token-sm`; drag handle |
| `ghost` | Transparent trigger, muted content |
| `gloss` | `gloss-panel gloss-deep` |

No `status`.

| size | Trigger | Content padding |
|------|---------|-----------------|
| `small` | `CONTROL_SIZE_LAYOUT.small` | `p-base` |
| `base` | `CONTROL_SIZE_LAYOUT.base` | `p-plus` |
| `mid` | `CONTROL_SIZE_LAYOUT.mid` | `p-mid` |
| `large` | `CONTROL_SIZE_LAYOUT.large` | `p-large` |

## Animations

`disclosureAnimations.ts` + `useCollapsibleHeight` + `useDisclosureContentDrag.ts`.

**DOM:**

```
<div class=root>
  <button class=trigger aria-expanded>
    <span class=chevron />           ← GSAP rotate 0→180°
    <span class=titleLift>           ← hover lift + squeeze
      <Text class=title />
  <div class=contentShell ref=shell> <!-- overflow-hidden, height GSAP -->
    <div class=contentWrap ref=inner>
      <section class=contentPanel>
  <div class=handle />               <!-- card + dragHandle only -->
```

### 1. Content height (`useCollapsibleHeight`)

Shared with `Expandable` / Accordion:

**Open:** `height: 0` → `scrollHeight` (`motionExpand()`).

**Close:** current height → `0`.

**Reduced motion / `enableExpandable: false`:** instant state.

`skipContentAnimRef` — instant snap after drag.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  expandDuration: 320,
  expandOpenEase: "power2.inOut",
  enableExpandable: true,
});
```

### 2. Chevron rotation (`useChevronRotation`)

`useDisclosureTriggerMotion` → rotate chevron on `open`.

Easing: `motionInteractive()`. Respects `skipContentAnimRef` after drag.

### 3. Trigger micro-interactions

On `titleLiftRef`:

- **Hover:** `animateInteractiveHoverLift`
- **Press:** `animateInteractivePressSqueeze`

Skipped on reduced motion / touch.

```ts
configureMotion({
  hoverLiftScale: 1.03,
  pressSqueezeScale: [1, 0.98, 1],
});
```

### 4. Card drag handle (`useDisclosureContentDrag`)

Only `variant="card"` + `dragHandle`:

1. Pointer capture on handle
2. Live resize `shell.style.height`
3. Chevron sync: `rotation = progress * 180°`
4. Snap: ratio ≥ 38% or velocity → open
5. `skipContentAnimRef = true` before `setOpen`

### What's not included

- Portal motion
- Ripple
- Second-level hover shadow (except static `shadow-token-sm` on `card`)
- FLIP in group

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Height collapse | `useCollapsibleHeight` | `expandDuration`, `enableExpandable` | `open` |
| Chevron rotate | `useChevronRotation` | `interactiveDuration`, `enableExpandable` | `open` |
| Title hover/squeeze | `disclosureAnimations` | `hoverLiftScale`, `pressSqueezeScale` | `disabled` |
| Drag expand | `useDisclosureContentDrag` | — | `dragHandle`, `variant="card"` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `DISCLOSURE_TRIGGER_BASE_CLASS` | Full-width button, `focus-ring` |
| `DISCLOSURE_CONTENT_SHELL_CLASS` | `overflow-hidden` collapsible |
| `FRAMED_PANEL` | Border/bg for outline/secondary content |
| `DISCLOSURE_GLOSS_PANEL_CLASS` | Gloss shell |
| `disclosureGroupClass` | Group divide/gap/shadow |
| `hoverVariant()` | Trigger hover tint |
| Open title | `text-primary` inline |

## Styling and customization

### Two levels

1. **`className` on `Disclosure`** — root.
2. **`classNames` on root** — trigger, content, handle; `DisclosureGroup` — `group` slot.

`Disclosure.Trigger` — `className` on button.

### `DisclosureClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | Root div | Outer spacing |
| `trigger` | `<button>` | Padding, hover bg |
| `triggerTitleLift` | Lift wrapper | Motion target area |
| `triggerTitle` | Title Text | Typography |
| `triggerChevron` | Chevron span | Icon color/size |
| `contentShell` | Collapsible shell | Max-height helpers |
| `contentWrap` | Inner wrap | Padding for framed variants |
| `contentPanel` | `<section>` | Content typography |
| `glossPanel` / `glossContent` | Gloss layers | Gloss variant |
| `handle` | Drag bar | Card drag grip |
| `group` | `DisclosureGroup` | Accordion container |

### Single disclosure

```tsx
<Disclosure
  variant="outline"
  classNames={{
    trigger: "font-semibold",
    contentPanel: "text-small text-muted",
  }}
>
  <Disclosure.Trigger>Order details</Disclosure.Trigger>
  <Disclosure.Content>Items and total</Disclosure.Content>
</Disclosure>
```

### Group separated cards

```tsx
<DisclosureGroup separated variant="card" classNames={{ group: "gap-mid" }}>
  <Disclosure value="a" dragHandle>
    <Disclosure.Trigger>Step 1</Disclosure.Trigger>
    <Disclosure.Content>...</Disclosure.Content>
    <Disclosure.Handle />
  </Disclosure>
</DisclosureGroup>
```

### Practical notes

- `accordion={false}` — multiple open at once.
- `icon={null}` — trigger without chevron.
- `asChild` on Trigger — merge ARIA onto child button/link.
- Card in group without `separated`: card shell on `DisclosureGroup`.
- **Do not override `height` on `contentShell`** — GSAP collapsible.
- Drag children order: Trigger → Content → Handle (`orderDragHandleChildren`).

## Integrations

| Component | Scenario |
|-----------|----------|
| `Expandable` | Shared `useCollapsibleHeight` |
| `Field` | FAQ in forms |
| `Card` | Similar card shell (Disclosure `variant="card"`) |

## Accessibility

- Trigger: `aria-expanded`, `aria-controls`, `id={triggerId}`
- Panel: `id={panelId}`, `aria-labelledby={triggerId}`
- Shell: `aria-hidden={!open}`
- Chevron / Handle: `aria-hidden`
- Keyboard: Enter/Space toggle on trigger
- `disabled` — native on button

## File structure

```
Disclosure/
├── Disclosure.tsx
├── disclosureGroup.tsx
├── index.ts
├── disclosureTypes.ts
├── disclosureStyles.ts
├── disclosureAnimations.ts
├── disclosureParts.tsx
├── useDisclosureRootState.ts
├── useDisclosureGroupRootState.ts
├── useDisclosureContentDrag.ts
├── disclosureContext.tsx
├── disclosureAPI.ts
├── disclosureA11y.ts
└── Disclosure.stories.tsx
```

## Storybook

`Core Components/Disclosure` — variants, sizes, icon position, controlled, disabled, group modes, card drag, `CustomClassNames`.
