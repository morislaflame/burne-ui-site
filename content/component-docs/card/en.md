# Card

Container with compound layout: `Header`, `Title`, `Description`, `Body`, `Footer`. Supports `variant`, static shadow (passive), and **pressable** mode with hover-lift / squeeze like a second-level button.

## Import

```tsx
import {
  Card,
  type CardProps,
  type CardVariant,
  type CardPressEvent,
  type CardClassNames,
  type CardHeaderProps,
  type CardBodyProps,
  type CardTitleProps,
} from "burne-ui";
```

## API

### Compound API

```tsx
<Card variant="default">
  <Card.Header>
    <Card.Title>Release 0.12</Card.Title>
    <Card.Description>Short card description</Card.Description>
  </Card.Header>
  <Card.Body>Main content</Card.Body>
  <Card.Footer>
    <Button size="small">Details</Button>
  </Card.Footer>
</Card>
```

### Pressable card

```tsx
<Card pressable animated onPress={(e) => console.log(e)}>
  <Card.Header>
    <Card.Title>Open</Card.Title>
  </Card.Header>
  <Card.Body>Click anywhere on the card</Card.Body>
</Card>
```

### Pressable + Ripple

```tsx
<Card pressable variant="outline" onPress={handlePress}>
  <Ripple color="neutral" />
  <div className="relative z-[1] flex flex-col">
    <Card.Header>...</Card.Header>
    <Card.Body>...</Card.Body>
  </div>
</Card>
```

No Simple API (no `title` prop on root) — compound children only.

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `outline` \| `secondary` \| `gloss` |
| `pressable` | `false` | Interactive card (`<button>` root) |
| `animated` | `true` | GSAP hover/squeeze (when `pressable`) |
| `onPress` | — | Activation on click / Enter / Space |
| `onClick` / `onKeyDown` / `onPointerDown` | — | Low-level handlers |
| `className` | — | Root / gloss panel |
| `classNames` | — | Slots |

### `CardClassNames`

`root`, `glossContent`, `content`, `header`, `headingBlock`, `title`, `description`, `body`, `footer`.

### Compound sub-parts

| Part | Role |
|------|------|
| `Card.Header` | Top block (title + description) |
| `Card.HeadingBlock` | Heading group inside header |
| `Card.Title` | `Text` as `h3` |
| `Card.Description` | Muted subtitle |
| `Card.Body` | Main content |
| `Card.Footer` | Bottom area with border-top |

## Variant

| Variant | Surface |
|---------|---------|
| `default` | `bg-surface border-token` |
| `outline` | transparent + border |
| `secondary` | `bg-secondary border-token` |
| `gloss` | `gloss-panel` + `gloss-content` |

### Shadows

| Mode | Shadow |
|------|--------|
| Passive (`pressable={false}`) | `shadow-token-sm` always |
| Pressable `default/outline/secondary` | `shadowSm` → `shadowMd` on hover |
| Pressable `gloss` | gloss interactive motion |

## Animations

`cardAnimations.ts` → `useCardAnimations`.

**DOM (passive):**

```
<div class=cardRoot shadow-sm>
  Header / Body / Footer
</div>
```

**DOM (pressable default):**

```
<button class=cardRoot + liftMotion>
  <div class=content>children</div>
</button>
```

**DOM (gloss pressable):**

```
<button class=gloss-panel>
  <div class=gloss-content>children</div>
</button>
```

### 1. Hover lift (pressable, not gloss)

`useSecondLevelShadowContainer(rootRef, pressable && !isGloss)`:

**Init:** `initElementShadow(el, shadowSm())` — resting state `shadow-token-sm`.

**Pointer enter:** `animateInteractiveHoverLift` + shadow `sm` → `md` (`secondLevelShadow()`).

**Pointer leave:** scale `1`, shadow back to `sm`.

`pointerInsideRef` keeps squeeze in sync with hover state.

Class: `pressableLift.motionClass` (`SHADOW_LIFT_MOTION_CLASS`).

### 2. Press squeeze

`pointerdown` on pressable root (`animated={true}`):

- **default/outline/secondary:** `animateInteractivePressSqueeze(shell, { pointerInside, shadow })`
- **gloss:** `animateGlossInteractivePressSqueeze(shell, pointerInside)`

`onPress` fires on `click` / keyboard activation separately.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.025,
  pressSqueezeScale: [1, 0.98, 1],
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

### 3. Gloss interactive

`variant="gloss"` + `pressable`:

- `createGlossInteractiveRefCallback`
- `useGlossInteractiveHandlers`
- class `GLOSS_INTERACTIVE_MOTION_CLASS`

`animated={false}` disables squeeze/hover, but `onPress` and button semantics remain.

**Reduced motion:** `shouldSkipInteractiveHoverLift()` / `prefersReducedInteractiveHoverLift()` — no lift or squeeze.

### 4. Passive card

`pressable={false}`:

- `CARD_STATIC_SHADOW_CLASS` — persistent `shadow-token-sm`
- `killMotion` on root when switching to passive
- No pointer handlers

### 5. Ripple (optional)

Ripple is **not built in**. Pattern from stories:

```
<button pressable>
  <Ripple />                    ← overlay layer
  <div class=content z-[1]>     ← CARD_PRESSABLE_CONTENT_CLASS
    Card.Header / Body
```

Squeeze animates the **entire** pressable shell; ripple is a separate layer.

### What's not included

- Portal / popover motion
- Height collapse
- Built-in Ripple
- Hover lift on passive card

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Static shadow | CSS `shadow-token-sm` | — | `pressable={false}` |
| Hover lift sm→md | `useSecondLevelShadowContainer` | `hoverLiftScale`, `enableHoverLift` | `pressable`, `animated`, `!gloss` |
| Press squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale`, `enablePressSqueeze` | `animated` |
| Gloss hover/squeeze | gloss utils | gloss interactive tokens | `variant="gloss"` |
| Ripple overlay | `<Ripple />` child | `rippleDefaultDuration` | manually in children |

## Tokens and CSS

| Class / token | Role |
|---------------|------|
| `CARD_ROOT_BASE_CLASS` | `rounded-mid overflow-hidden flex-col` |
| `CARD_STATIC_SHADOW_CLASS` | Passive `shadow-token-sm` |
| `CARD_PRESSABLE_ROOT_CLASS` | `cursor-pointer focus-ring` |
| `CARD_BUTTON_SHELL_CLASS` | `w-full border-0 p-0 text-left` on `<button>` |
| `CARD_HEADER_CLASS` / `BODY` / `FOOTER` | Padding + `border-t-token` footer |
| `CARD_GLOSS_PANEL_CLASS` | `gloss-panel rounded-mid` |
| `GLOSS_INTERACTIVE_MOTION_CLASS` | Gloss pressable motion |
| `SHADOW_LIFT_MOTION_CLASS` | GSAP shadow transition |

## Styling and customization

### Two levels

1. **`className` on `Card`** — root / gloss panel (`classNames.root` merge).
2. **`classNames` on root** — all internal slots via provider.

Compound sub-parts do not accept a separate `classNames` — root only.

### `CardClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | `<div>` or `<button>` shell | Border, radius, outer shadow override |
| `glossContent` | Inner gloss wrapper | Padding/layout in gloss variant |
| `content` | Pressable inner wrapper | z-index for Ripple + children |
| `header` | Header block | Top bg strip, extra padding |
| `headingBlock` | Title group flex | Gap title/description |
| `title` | `h3` Text | Heading color/weight |
| `description` | Muted `p` | Subtitle typography |
| `body` | Body section | Main content padding |
| `footer` | Footer bar | Actions row, border-top tint |

### Decorative card (passive)

```tsx
<Card
  variant="outline"
  classNames={{
    root: "rounded-large border-primary/40 bg-primary/5 shadow-token-md",
    header: "bg-primary/5",
    title: "text-primary font-semibold",
    description: "text-foreground/80",
    body: "text-small",
    footer: "border-primary/20 bg-primary/5",
  }}
>
  <Card.Header>
    <Card.Title>Profile</Card.Title>
    <Card.Description>All slots via classNames</Card.Description>
  </Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Button size="small">Save</Button>
  </Card.Footer>
</Card>
```

### Pressable + Ripple (compound)

```tsx
<Card
  pressable
  variant="outline"
  onPress={handleOpen}
  classNames={{ root: "rounded-large", content: "gap-0" }}
>
  <Ripple color="neutral" />
  <div className="relative z-[1] flex flex-col">
    <Card.Header>
      <Card.Title>Open</Card.Title>
    </Card.Header>
    <Card.Body>Click anywhere on the card</Card.Body>
  </div>
</Card>
```

`animated={false}` — static pressable card without GSAP (for nested controls).

### Practical notes

- Do not place buttons/links inside a pressable card without `stopPropagation` — root `onPress` will fire.
- Ripple is not built in: first child `<Ripple />`, content in `relative z-[1]` inside `content`.
- `Card.Title` is always `h3` — do not change heading level via classNames without replacing semantics.
- Passive: `pressable={false}` → persistent `shadow-sm`, no hover lift.
- Gloss: `className` / `classNames.root` on `gloss-panel`; children in `glossContent`.
- **Do not set `transform` on root when `pressable`** — conflicts with lift/squeeze GSAP.
- **Merge order:** variant surface → motionClass → `classNames.slot` → `className` root.

## Integrations

| Component | Scenario |
|-----------|----------|
| `Badge.Anchor` | Overlay badge on card |
| `Ripple` | Press feedback in pressable card |
| `Form` | Card as form layout wrapper |
| `Button` | Actions in `Card.Footer` |

## Accessibility

- `pressable={true}`: root `<button type="button">`, `focus-ring`
- `onPress` on click and keyboard activation
- `Card.Title`: semantic `h3`
- Nested interactive elements — watch out for event bubbling

## File structure

```
Card/
├── Card.tsx
├── index.ts
├── cardTypes.ts
├── cardStyles.ts
├── cardAnimations.ts
├── cardParts.tsx
├── useCardRootState.ts
├── cardContext.tsx
├── cardAPI.ts
├── cardA11y.ts
└── Card.stories.tsx
```

## Storybook

`Core Components/Card` — variants, pressable, ripple, gloss, form layout, light theme, `classNames`.
