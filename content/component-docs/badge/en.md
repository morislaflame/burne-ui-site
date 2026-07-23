# Badge

Compact status badge: text, icon, icon-only, dot, and overlay via `Badge.Anchor`. Supports `variant`, `status`, sizes, `gloss`, and hover-lift like other second-level components.

## Import

```tsx
import {
  Badge,
  type BadgeProps,
  type BadgeAnchorProps,
  type BadgeVariant,
  type BadgeStatus,
  type BadgeSize,
  type BadgePlacement,
  type BadgeIconPosition,
  type BadgeInlineIconPosition,
  type BadgeClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
<Badge status="success">Published</Badge>

<Badge
  status="info"
  icon={<IoRocketOutline aria-hidden />}
  iconPosition="start"
>
  Launch
</Badge>
```

### Inline icon API

```tsx
<Badge variant="secondary">
  <IoCheckmarkCircleOutline data-icon="inline-start" />
  Verified
</Badge>

<Badge variant="outline">
  Bookmark
  <IoBookmarkOutline data-icon="inline-end" />
</Badge>
```

### Icon-only / dot

```tsx
<Badge
  status="danger"
  icon={<IoHeartOutline aria-hidden />}
  aria-label="Favorites"
/>

<Badge dot status="info" aria-label="Updates available" />
```

### Overlay via `Badge.Anchor`

```tsx
<Badge.Anchor>
  <Avatar size="large" label="Jordan Doe" src={avatarUrl} alt="" />
  <Badge status="danger" size="small">
    5
  </Badge>
</Badge.Anchor>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `primary` \| `outline` \| `secondary` \| `gloss` |
| `status` | `default` | `default` \| `danger` \| `success` \| `info` \| `warning` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `icon` | — | Icon from `react-icons/io5` or ReactNode |
| `iconPosition` | `start` | `start` \| `end` |
| `iconOnly` | `false` | Force icon-only layout |
| `dot` | `false` | Circular indicator only |
| `placement` | `top-right` inside anchor | Overlay position |
| `hoverLift` | `true` | Hover shadow/lift |
| `className` | — | Root layout class |
| `classNames` | — | Slots |

### `Badge.Anchor` props

| Prop | Default | Description |
|------|---------|-------------|
| `hoverLift` | `true` | Lift direct child badge via anchor |
| `className` | — | Wrapper |
| `classNames` | — | Shared slots for anchor and nested badge |

### `BadgeClassNames`

`root`, `text`, `iconOnly`, `dot`, `anchor`.

## Variant / status / sizes

### Variant

| Variant | Surface |
|---------|---------|
| `default` | `bg-surface border-token text-foreground` |
| `primary` | `bg-primary text-primary-foreground` |
| `outline` | transparent + border |
| `secondary` | `bg-secondary text-secondary-foreground` |
| `gloss` | `gloss-panel` |

### Status

`status !== "default"` overrides semantic color:

- `default`: variant surface
- `danger`, `success`, `info`, `warning`: semantic tint/fill/border/text via `semanticStatusSurface`

### Sizes

| Size | Text variant | Icon size |
|------|--------------|-----------|
| `small` | `tools` | `icon-small` |
| `base` | `small` | `icon-small` |
| `mid` | `small` | `icon-base` |
| `large` | `base` | `icon-large` |

## Animations

`badgeAnimations.ts`.

**DOM (text):**

```
<span data-badge-root data-icon=start|end>
  <Text as="span" inheritColor>...</Text>
</span>
```

**DOM (Badge.Anchor split-lift):**

```
<div data-badge-anchor>
  <Avatar />
  <span data-badge-root class=placement>
    <span data-badge-lift-target>Badge content</span>
  </span>
</div>
```

### 1. Self hover lift

For a regular badge:

- `variant="gloss"` → `useGlossInteractiveHandlers`
- not gloss → `useSecondLevelShadow`
- rest shadow: `shadowSm`
- hover shadow/lift: second-level shadow motion

`hoverLift={false}` disables self-lift.

### 2. Split lift inside `Badge.Anchor`

If `Badge` is a direct child of `Badge.Anchor`, not gloss, and `hoverLift=true`:

1. Badge registers `innerLiftRef` in anchor context.
2. Pointer events are handled by `Badge.Anchor`.
3. Anchor applies `useSecondLevelShadowContainer` to `data-badge-lift-target`.
4. The badge itself gets `pointer-events-none` to avoid duplicate hover.

For `variant="gloss"`, split-lift is not enabled: gloss self motion is used instead.

### 3. Gloss interaction

`variant="gloss"`:

- ref binding via `createGlossInteractiveRefCallback`
- pointer handlers from `useGlossInteractiveHandlers`
- motion class `GLOSS_INTERACTIVE_MOTION_CLASS`

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  badgeAnchorHoverLiftScale: 1.04,
  hoverLiftScale: 1.025,
  hoverLiftEase: "sine.inOut",
  enableHoverLift: true,
});
```

Gloss lift uses a separate curve, not sm→md shadow tokens.

### What's not included

- Press squeeze
- Ripple (can be placed next to anchor child)
- Portal motion on the badge itself
- FLIP on layout change

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Self shadow/lift | `useSecondLevelShadow` | `hoverLiftScale`, `enableHoverLift` | `hoverLift`, `!gloss` |
| Anchor split-lift | `useSecondLevelShadowContainer` | `badgeAnchorHoverLiftScale` | `Badge.Anchor` child |
| Gloss hover | `useGlossInteractiveHandlers` | gloss tokens | `variant="gloss"` |
| Layout switch | React render | — | `dot` / `iconOnly` / text |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `semanticStatusSurface` | Status tint per `status` |
| `BADGE_TEXT_CLASS` | Inline-flex row, gap icons |
| `BADGE_DOT_CLASS` | Ring + fill dot |
| `BADGE_ICON_ONLY_CLASS` | Square icon badge |
| `shadow-token-sm` / `md` | Via `--el-shadow` on hover lift |
| `gloss-panel gloss-deep` | Gloss badge surface |
| `data-badge-anchor` | Anchor grid positioning |

## Styling and customization

### Two levels

1. **`className` on `Badge`** — specific rendered layout (`text`, `dot`, `iconOnly`).
2. **`classNames` on root** — shared slots, including `anchor` for `Badge.Anchor`.

### `BadgeClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | All layouts | Shared radius/border |
| `text` | Text badge row | Surface/text, inline icons |
| `iconOnly` | Icon-only layout | Square padding, icon color |
| `dot` | Dot layout | Ring/fill online indicator |
| `anchor` | `Badge.Anchor` root | Overlay grid on Avatar/Card |

### Text badge (simple)

```tsx
<Badge
  status="info"
  classNames={{
    root: "rounded-large",
    text: "border-info/50 bg-info/10 text-info",
  }}
>
  Global text style
</Badge>
```

### Icon-only / dot

```tsx
<Badge
  iconOnly
  icon={<IoRocketOutline aria-hidden />}
  aria-label="New"
  classNames={{
    iconOnly: "border-success/40 bg-success/10 text-success",
  }}
/>

<Badge
  dot
  status="success"
  aria-label="Online"
  classNames={{ dot: "ring-2 ring-background bg-success" }}
/>
```

### Anchor overlay (compound)

```tsx
<Badge.Anchor
  placement="top-right"
  classNames={{
    root: "rounded-full ring-2 ring-primary/30",
    dot: "ring-2 ring-background bg-success",
  }}
>
  <Avatar size="base" label="Demo" />
  <Badge dot status="success" aria-label="Online" hoverLift={false} />
</Badge.Anchor>
```

`hoverLift={false}` on overlay badge — lift is handled by the anchor target.

### Practical notes

- Icons: `react-icons/io5`.
- Icon-only/dot: required `aria-label` when they convey meaning.
- Inline icons: `data-icon="start"|"end"`, decorative without `aria-label`.
- **No pointer handlers on badge inside Anchor** — events go on anchor.
- `placement`: `top-right` | `top-left` | `bottom-right` | `bottom-left`.
- **No `transform` on root with hoverLift** — conflicts with GSAP lift.

## Integrations

| Component | Scenario |
|-----------|----------|
| `Avatar` | Online status, notification count |
| `Card` | Label/status in footer or overlay |
| `Button` | Status next to action |
| `Tooltip` | Description for icon-only badge when needed |

## Accessibility

- Text badge is read as regular text.
- Dot/icon-only with `aria-label` gets `role="img"`.
- Dot/icon-only without accessible name gets `aria-hidden` + `role="presentation"`.
- Icons in text badge are decorative: `aria-hidden=true`, unless they have their own `aria-label`.

## File structure

```
Badge/
├── Badge.tsx
├── index.ts
├── badgeTypes.ts
├── badgeStyles.ts
├── badgeAnimations.ts
├── badgeContext.tsx
├── badgeParts.tsx
├── useBadgeRootState.ts
├── badgeAPI.tsx
├── badgeA11y.ts
└── Badge.stories.tsx
```

## Storybook

`Core Components/Badge` — sizes/variants, statuses, light theme, `Badge.Anchor`, inline icons, icon-only, dots, custom colors, `classNames`, gloss.
