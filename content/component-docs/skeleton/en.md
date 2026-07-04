# Skeleton

Loading placeholder: pulse, wave, shimmer, or static (`none`). Compound API: `Skeleton.Circle`, `Skeleton.Text`, `Skeleton.Block`. **CSS animations only** — no GSAP.

## Import

```tsx
import {
  Skeleton,
  type SkeletonProps,
  type SkeletonCircleProps,
  type SkeletonTextProps,
  type SkeletonBlockProps,
  type SkeletonVariant,
  type SkeletonRadius,
  type SkeletonClassNames,
  type SkeletonCircleClassNames,
  type SkeletonTextClassNames,
  type SkeletonBlockClassNames,
} from "burne-ui";
```

## API

### Basic usage

```tsx
<Skeleton variant="wave" className="h-8 w-full" />

<Skeleton variant="pulse" radius="mid" className="h-24 w-full" />
```

### Compound API

```tsx
<Skeleton.Block variant="wave">
  <div className="flex gap-base">
    <Skeleton.Circle size="h-control-mid w-control-mid" />
    <div className="flex-1">
      <Skeleton.Text lines={3} variant="wave" />
    </div>
  </div>
</Skeleton.Block>
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
| Wave slide | CSS `@keyframes` | — | `variant="wave"` |
| Pulse | CSS `@keyframes` | — | `variant="pulse"` |
| Shimmer | CSS `@keyframes` | — | `variant="shimmer"` |
| Line stagger | inline `animationDelay` | — | `Skeleton.Text` |
| Static | no animation | — | `variant="none"` |

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

### Card loading layout

```tsx
<Skeleton.Block variant="wave" classNames={{ root: "rounded-large p-mid" }}>
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
  variant="shimmer"
  className="h-4 w-full"
  classNames={{
    root: "bg-info/15",
    wave: "from-info/10 via-info/25 to-info/10",
  }}
/>

<Skeleton.Text
  variant="wave"
  lines={4}
  classNames={{
    line: "bg-success/15 h-3",
    wave: "bg-success/20",
  }}
/>
```

### Practical notes

- Skeleton is **decorative** — `aria-hidden`, `role="presentation"`.
- Parent should announce loading (`aria-busy`, live region) separately.
- `variant="none"` — static placeholder without motion (reduced motion friendly).
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

- All parts: `aria-hidden={true}`, `role="presentation"`
- Wave overlay: `aria-hidden`
- No built-in loading announcement
- Recommendation: `aria-busy="true"` on container + `aria-live="polite"` when loading completes

## File structure

```
Skeleton/
├── Skeleton.tsx
├── index.ts
├── skeletonTypes.ts
├── skeletonStyles.ts
├── skeletonParts.tsx
├── skeletonAPI.ts
├── skeletonA11y.ts
├── useSkeletonRootState.ts
└── Skeleton.stories.tsx
```

## Storybook

`Core Components/Skeleton` — all variants, text lines, circles, card layout, list, block, custom sizes, `CustomClassNames`.
