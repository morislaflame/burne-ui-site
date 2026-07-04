# Accordion

A group of collapsible sections built on `Expandable`. **Compound API only.** At most one item is open at a time (accordion behavior); clicking the open item again collapses everything.

## Import

```tsx
import {
  Accordion,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeadingProps,
  type AccordionTriggerProps,
  type AccordionMessageProps,
  type AccordionIconProps,
  type AccordionContentProps,
  type AccordionTitleProps,
  type AccordionDescriptionProps,
  type AccordionIndicatorProps,
  type AccordionPanelProps,
  type AccordionBodyProps,
} from "burne-ui";
```

## API

### Compound API

```tsx
<Accordion defaultOpenIndex={0} size="base" className="max-w-2xl">
  <Accordion.Item value="shipping">
    <Accordion.Heading>
      <Accordion.Trigger>
        <Accordion.Message>
          <Accordion.Icon><IoHelp aria-hidden /></Accordion.Icon>
          <Accordion.Content>
            <Accordion.Title>Shipping</Accordion.Title>
            <Accordion.Description>Timelines and terms</Accordion.Description>
          </Accordion.Content>
          <Accordion.Indicator />
        </Accordion.Message>
      </Accordion.Trigger>
    </Accordion.Heading>
    <Accordion.Panel>
      <Accordion.Body>Section content…</Accordion.Body>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>
```

No Simple API.

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `openId` | — | Controlled: ID of the open item |
| `onOpenIdChange` | — | `(id: string \| null) => void` |
| `defaultOpenId` | `null` | Initial ID (takes priority over `defaultOpenIndex`) |
| `defaultOpenIndex` | `null` | Initial index (0-based) when Item has no `value` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` — applies to all Items |
| `className` | — | On root `<div>` |
| `children` | — | `Accordion.Item` |

No `variant` or `classNames` on root.

### `Accordion.Item` props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | auto index | Explicit item ID (`"0"`, `"1"`, … or a string) |
| `disabled` | `false` | Blocks toggle |
| `className` | — | Merged with `accordionItemClass` |

Each Item is a wrapper around `Expandable` (`compound={true}`, controlled `open`).

### Compound sub-parts

| Part | Implementation | Purpose |
|------|----------------|---------|
| `Accordion.Item` | `Expandable` | One accordion item |
| `Accordion.Heading` | `<h3>` | Semantic section heading |
| `Accordion.Trigger` | `Expandable.Trigger` (`hideChevron=true`) | Toggle button |
| `Accordion.Message` | `Expandable.Message` | Grid slots in trigger |
| `Accordion.Icon` | `Expandable.Icon` | Leading icon |
| `Accordion.Content` | `Expandable.Content` | Title + Description group |
| `Accordion.Title` | `Expandable.Title` | Title |
| `Accordion.Description` | `Expandable.Description` | Muted subtitle |
| `Accordion.Indicator` | Custom chevron span | Chevron instead of `Expandable.Chevron` |
| `Accordion.Panel` | `Expandable.Panel` | Expandable `<section>` |
| `Accordion.Body` | `Text as="div"` | Panel body (`text-muted`) |

`Accordion.Trigger` props: same as `Expandable.Trigger` (`asChild`, `hideChevron`, …).

### Controlled / uncontrolled

```tsx
// Uncontrolled
<Accordion defaultOpenIndex={0} onOpenIdChange={(id) => console.log(id)} />

// Controlled
const [openId, setOpenId] = useState<string | null>("shipping");
<Accordion openId={openId} onOpenIdChange={setOpenId}>
  <Accordion.Item value="shipping">...</Accordion.Item>
</Accordion>
```

Behavior: click on open item → `openId = null`; click on another → closes the previous one.

## Sizes

`size` on root is passed to all Items → `Expandable`. See the size table in `Expandable.md` (`CONTROL_SIZE_LAYOUT`).

| size | trigger min-h | panel pad |
|------|---------------|-----------|
| `small` | `min-h-control-small` | `px-base pb-base pt-small` |
| `base` | `min-h-control-base` | `px-plus pb-plus pt-small` |
| `mid` | `min-h-control-mid` | `px-mid pb-mid pt-base` |
| `large` | `min-h-control-large` | `px-large pb-large pt-base` |

No `variant` or `status` — each Item uses `Expandable` with `variant="default"`.

## Animations

Accordion adds only **Indicator rotation**; everything else comes from `Expandable` + shared utils.

**DOM (one Item):**

```
<div data-accordion-item>              ← Expandable root
  <h3>
    <button class=trigger>             ← squeeze on liftSpan
      <Accordion.Message grid>
        <Icon /> <Title/> <Indicator/>  ← GSAP rotate chevron
  <div class=panelShell>               ← useCollapsibleHeight
    <section class=panel>
      <Accordion.Body />
```

### 1. Panel height (`Expandable.Panel`)

`useCollapsibleHeight` — open/close height GSAP. See `Expandable.md`.

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  expandDuration: 320,
  expandOpenEase: "power2.inOut",
  enableExpandable: true,
});
```

**Reduced motion:** `enableExpandable: false` or `prefers-reduced-motion`.

### 2. Trigger press squeeze

`Expandable.Trigger` → `animateInteractivePressSqueeze` on `triggerLift` span.

### 3. Indicator rotation (`accordionAnimations.ts`)

`useAccordionIndicatorAnimation(open)` → `useChevronRotation` on `Accordion.Indicator`.

- `Accordion.Trigger` defaults to `hideChevron={true}`
- Rotation: `motionInteractive()`; off when `enableExpandable: false`

### 4. Ripple (optional)

`<Ripple />` inside `Accordion.Trigger` — overlay via `partitionExpandableTriggerRipple`.

### What's not included

- Group-level FLIP on `openId` change
- `variant="gloss"` on Accordion
- Animation of `Accordion.Body` / `Heading`
- `classNames` provider (only per-part `className`)

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Panel height | `useCollapsibleHeight` | `expandDuration`, `enableExpandable` | `open` on Item |
| Trigger squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale` | `disabled` |
| Indicator rotate | `useChevronRotation` | `interactiveDuration`, `enableExpandable` | `open` |
| Ripple | `<Ripple />` | `rippleExpandableDuration` | in Trigger children |

## Tokens and CSS

### Own (`accordionStyles.ts`)

| Class / function | Purpose |
|------------------|---------|
| `accordionRootClass` | `flex flex-col`; first/last Item rounding |
| `[&>item:first-child]:rounded-t-mid` | Top of group |
| `[&>item:not(:first-child)]:-mt-px` | Border overlap between Items |
| `accordionItemClass` | `relative !rounded-none` |
| `accordionHeadingClass` | Reset `<h3>` |
| `accordionIndicatorClass` | Chevron wrapper `origin-center` |
| `accordionBodyClass` | `text-muted` |

### Inherited from Expandable (on Item)

`border-token bg-surface shadow-token-sm`, `messageBannerGridLayout`, `focus-ring`, panel padding per size.

## Styling and customization

### Single level — `className` per-part

**No `classNames` on Accordion** (unlike `Expandable`). Customize via `className` on each sub-part.

| Part | Where to set |
|------|--------------|
| root | `Accordion className` |
| item | `Accordion.Item className` |
| heading / trigger / message / … | `className` on sub-part |
| indicator | `Accordion.Indicator className` |
| panel / body | `Accordion.Panel` / `Accordion.Body className` |

`ExpandableClassNames` is **not passed through** Accordion.

### FAQ group

```tsx
<Accordion defaultOpenIndex={0} size="base" className="max-w-2xl">
  {items.map((item, i) => (
    <Accordion.Item key={item.id} value={item.id}>
      <Accordion.Heading>
        <Accordion.Trigger>
          <Accordion.Message>
            <Accordion.Icon>{item.icon}</Accordion.Icon>
            <Accordion.Content>
              <Accordion.Title>{item.title}</Accordion.Title>
            </Accordion.Content>
            <Accordion.Indicator />
          </Accordion.Message>
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>{item.content}</Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  ))}
</Accordion>
```

### Trigger + Ripple

```tsx
<Accordion.Trigger>
  <Ripple color="neutralMuted" />
  <Accordion.Message className="relative z-[1]">
    ...
  </Accordion.Message>
</Accordion.Trigger>
```

### Practical notes

- Recommended structure: `Heading` → `Trigger` → `Message` → slots → `Panel` → `Body`.
- `Accordion.Indicator` — inside or next to `Message` (grid resolves by `displayName`).
- For controlled state, use stable `value` on Items; do not rely on auto-index when reordering.
- Comparison with `Expandable`: single block vs group with `openId`.
- **Do not set `rounded` on Item** — rounding is applied by root via first/last selectors.

## Integrations

| Component | Role |
|-----------|------|
| `Expandable` | Each `Accordion.Item` |
| `Text` | `Accordion.Body` |
| `Ripple` | Optional in Trigger |
| `messageBannerGridLayout` | Grid trigger slots |

## Accessibility

Delegated to `Expandable` + Accordion semantics:

- `Accordion.Heading` → `<h3>`
- Trigger: `aria-expanded`, `aria-controls`, `id`
- Panel: `<section aria-labelledby hidden inert>`
- Icon / Indicator: `aria-hidden`
- Keyboard: Enter/Space on trigger

**No** `role="group"` / accordion pattern on root — each Item is an autonomous disclosure; "one open at a time" is JS-only (`openId`).

## File structure

```
Accordion/
├── Accordion.tsx
├── index.ts
├── accordionTypes.ts
├── accordionStyles.ts
├── accordionAnimations.ts       # useAccordionIndicatorAnimation
├── accordionParts.tsx
├── accordionAPI.ts
├── accordionContext.tsx
├── useAccordionRootState.ts
└── Accordion.stories.tsx
```

A11y lives in `Expandable/expandableA11y.ts` (Accordion display names registered).

## Storybook

`Composite Components/Accordion` — default FAQ, interaction test, trigger ripple.

Playground: `playground/showcase/demos/accordion/` — sizes, checkout FAQ, release notes.
