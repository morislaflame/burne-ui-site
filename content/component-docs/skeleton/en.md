# Skeleton

Loading placeholder: pulse, wave, shimmer, or static (`none`). Compound API: `Skeleton.Circle`, `Skeleton.Text`, `Skeleton.Block`, `Skeleton.Region`. **CSS animations only** — no GSAP.

## Import

```tsx
import {
  Skeleton,
  type SkeletonProps,
  type SkeletonCircleProps,
  type SkeletonTextProps,
  type SkeletonBlockProps,
  type SkeletonRegionProps,
  type SkeletonVariant,
  type SkeletonRadius,
  type SkeletonClassNames,
  type SkeletonCircleClassNames,
  type SkeletonTextClassNames,
  type SkeletonBlockClassNames,
  type SkeletonRegionClassNames,
} from "burne-ui";
```

## API

### Basic usage

```tsx
<Skeleton animation="wave" className="h-8 w-full" />

<Skeleton animation="pulse" radius="mid" className="h-24 w-full" />
```

### Compound API

```tsx
<Skeleton.Region busy aria-label="Profile">
  <Skeleton.Block animation="wave">
    <div className="flex gap-base">
      <Skeleton.Circle size="h-control-mid w-control-mid" />
      <div className="flex-1">
        <Skeleton.Text lines={3} animation="wave" />
      </div>
    </div>
  </Skeleton.Block>
</Skeleton.Region>
```

### Root props (`Skeleton`)

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `wave` | `pulse` \| `wave` \| `shimmer` \| `none` |
| `radius` | `small` | `none` \| `small` \| `mid` \| `full` |
| `className` | — | Size, width (Tailwind) |
| `classNames` | — | `root`, `wave` |
| `style` | — | Inline styles |
| `children` | — | Arbitrary layout |

### `Skeleton.Circle` props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `wave` | Animation variant |
| `size` | `h-[34px] w-control-base` | Tailwind size classes |
| `classNames` | — | `root`, `wave` |

### `Skeleton.Text` props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `wave` | Animation variant |
| `lines` | `3` | Number of lines |
| `lastShort` | `true` | Last line `w-3/5` |
| `classNames` | — | `root`, `line`, `wave` |

### `Skeleton.Block` props

| Prop | Description |
|------|-------------|
| `variant` | Animation variant |
| `classNames` | `root`, `wave` |
| `children` | Card/list layout inside |

### `Skeleton.Region` props

| Prop | Default | Description |
|------|---------|-------------|
| `busy` | `true` | `aria-busy` on the parent container |
| `className` / `classNames.root` | — | Wrapper layout (no decorative surface) |
| `aria-label` / `aria-labelledby` | — | Region name for AT (recommended) |
| `children` | — | Skeleton placeholders or loaded content |

`Skeleton.Region` is **not** decorative: no `aria-hidden` / `role="presentation"`. Placeholders inside stay presentation.

```tsx
const [busy, setBusy] = useState(true);

<Skeleton.Region busy={busy} aria-label="Profile">
  {busy ? (
    <>
      <Skeleton.Circle size="h-12 w-12" />
      <Skeleton.Text lines={2} />
    </>
  ) : (
    <ProfileCard />
  )}
</Skeleton.Region>
```

## variant and radius

| variant | Mechanism |
|---------|-----------|
| `wave` | Overlay slide (`skeleton-wave-slide`, 2s linear) |
| `pulse` | Opacity pulse (`skeleton-pulse`, 1.6s) |
| `shimmer` | Gradient bg-position (`skeleton-shimmer`, 2s) |
| `none` | Static `bg-primary-tint` without animation |

| radius (Root only) | CSS |
|--------------------|-----|
| `none` | no rounding |
| `small` | `rounded-small` |
| `mid` | `rounded-mid` |
| `full` | `rounded-full` |

Sizes are not enums — use `className` / `size` prop (Tailwind: `h-8`, `w-full`, `h-control-base`).

No `status`.

## Animations

**CSS only** (`styles.css` keyframes). No `*Animations.ts`, no GSAP, no `configureMotion`.

**DOM (wave):**

```
<span class="bg-primary-tint relative overflow-hidden">
  <span class=wave-overlay />    ← absolute, skeleton-wave-slide
</span>
```

**DOM (Skeleton.Text):**

```
<div class=root>
  <span class=line style={{ animationDelay: index * 0.06s }} />
  ...
```

### 1. Wave overlay

Absolute overlay with `-translate-x-full` → slide across. `aria-hidden` on overlay.

### 2. Pulse

Opacity oscillation on root element.

### 3. Shimmer

Animated `background-position` on gradient (`primary-tint` → `primary-tint-strong`).

### 4. Stagger (Text)

Each line: `animationDelay: index * 0.06s` for cascading wave.

### What's not included

- GSAP / `configureMotion`
- Hover / press interaction
- Portal motion
- `classNames` on root beyond `root`/`wave` (Text adds `line`)

### Summary: what is configured where

| Behavior | Mechanism | `configureMotion` keys | Local prop |
|----------|-----------|------------------------|------------|
| Wave slide | CSS `@keyframes` | — | `animation="wave"` |
| Pulse | CSS `@keyframes` | — | `animation="pulse"` |
| Shimmer | CSS `@keyframes` | — | `animation="shimmer"` |
| Line stagger | inline `animationDelay` | — | `Skeleton.Text` |
| Static | no animation | — | `animation="none"` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| Base | `bg-primary-tint relative overflow-hidden` |
| Wave overlay | absolute inset, gradient slide |
| Shimmer gradient | `var(--color-primary-tint)` → `strong` |
| Circle default | `rounded-full h-control-base w-control-base` |
| Text line | `h-[1em] rounded-small` |
| Last line | `w-3/5` when `lastShort` |
| Block | `rounded-mid px-mid py-plus` |

## Styling and customization

### Levels

1. **`className` on each part** — sizes, color overrides.
2. **`classNames.root` / `wave` / `line`** — slots per component.

No separate root `classNames` provider — prop on each part.

### Slots

| Component | Slots | When to use |
|-----------|-------|-------------|
| `Skeleton` | `root`, `wave` | Custom block color, wave tint |
| `Skeleton.Circle` | `root`, `wave` | Avatar placeholder ring |
| `Skeleton.Text` | `root`, `line`, `wave` | Per-line height/gap |
| `Skeleton.Block` | `root`, `wave` | Card chrome padding |
| `Skeleton.Region` | `root` | Layout wrapper (a11y parent) |

### Card loading layout

```tsx
<Skeleton.Block animation="wave" classNames={{ root: "rounded-large p-mid" }}>
  <div className="flex gap-base">
    <Skeleton.Circle size="h-control-large w-control-large" />
    <div className="flex flex-1 flex-col gap-small">
      <Skeleton.Text lines={2} lastShort />
      <Skeleton className="h-32 w-full rounded-mid" />
      <div className="flex gap-small">
        <Skeleton className="h-control-base w-24 rounded-mid" />
        <Skeleton className="h-control-base w-24 rounded-mid" />
      </div>
    </div>
  </div>
</Skeleton.Block>
```

### Semantic colors

```tsx
<Skeleton
  animation="shimmer"
  className="h-4 w-full"
  classNames={{
    root: "bg-info/15",
    wave: "from-info/10 via-info/25 to-info/10",
  }}
/>

<Skeleton.Text
  animation="wave"
  lines={4}
  classNames={{
    line: "bg-success/15 h-3",
    wave: "bg-success/20",
  }}
/>
```

### Practical notes

- Skeleton (Root / Circle / Text / Block) is **decorative** — `aria-hidden`, `role="presentation"`.
- Announce loading via `Skeleton.Region` (`aria-busy` + `aria-live="polite"`) or your own container with the same attributes.
- `animation="none"` — static placeholder without motion (reduced motion friendly).
- For lists — `Skeleton.Text` with wave + natural stagger.
- Set sizes via Tailwind on `className` (`h-8`, `w-3/4`), not via size enum.
- **Do not expect hover effects** — component is not interactive.

## Integrations

| Component | Scenario |
|-----------|----------|
| `Card` | Card layout skeleton |
| `Avatar` | `Skeleton.Circle` as avatar placeholder |
| `Table` | Row skeletons in `Table.Body` |

## Accessibility

- Decorative parts: `aria-hidden={true}`, `role="presentation"`
- Wave overlay: `aria-hidden`
- **`Skeleton.Region`:** `aria-busy={busy}`, `aria-live="polite"` — parent container for announcement; set `aria-label` / `aria-labelledby`
- When `busy={false}`, AT is signaled that the region update finished

## File structure

```
Skeleton/
├── Skeleton.tsx
├── index.ts
├── skeletonTypes.ts
├── skeletonStyles.ts
├── skeletonParts.tsx
├── skeletonA11y.ts
├── useSkeletonRootState.ts
└── Skeleton.stories.tsx
```

## Storybook

`Core Components/Skeleton` — all variants, text lines, circles, card layout, list, block, `Skeleton.Region`, custom sizes, `CustomClassNames`.
