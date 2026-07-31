# Link

Text link `<a>` with optional icons, underline, hover-lift, and press squeeze. Simple and compound API (`Link.Icon`).

## Import

```tsx
import {
  Link,
  Link.Icon,
  type LinkProps,
  type LinkSize,
  type LinkIconPos,
  type LinkClassNames,
} from "burne-ui";
```

## API

### Props

| Prop | Type | Default | Description |
|------|-----|--------------|----------|
| `href` | `string` | — | Required URL |
| `size` | `small` \| `base` \| `mid` \| `large` | `base` | Text and icons |
| `underline` | `boolean` | `false` | Text underline |
| `icon` + `iconPosition` | `ReactNode` | — | Simple API icons |
| `showDefaultIcon` | `boolean` | `false` | `IoArrowForward` ↗ |
| `defaultIconPosition` | `start` \| `end` | `end` | Default icon position |
| `className` | `string` | — | On `<a>` |
| `classNames` | `LinkClassNames` | — | `root`, `text`, `icon` |
| … | `AnchorHTMLAttributes` | — | `target`, `rel`, `onClick`, … |

### `LinkClassNames`

```tsx
type LinkClassNames = {
  root?: string;
  text?: string;
  icon?: string;
};
```

### Simple API

```tsx
<Link href="/docs" underline showDefaultIcon>
  Documentation
</Link>

<Link href="/back" icon={<IoChevronBack aria-hidden />} size="small">
  Back
</Link>
```

### Compound API

```tsx
<Link href="/item">
  <Link.Icon iconPosition="start"><IoDocument aria-hidden /></Link.Icon>
  Open file
  <Link.Icon iconPosition="end" />
</Link>
```

Empty `<Link.Icon />` without children → default ↗ at that position (`muted` until hover).

## Sizes

| size | Text variant | Icon |
|------|--------------|--------|
| `small` | `small` | `icon-small` |
| `base` | `base` | `icon-base` |
| `mid` | `mid` | `icon-mid` |
| `large` | `large` | `icon-large` |

## Icons and color

- Text and root: `text-foreground`, `focus-ring`
- Custom icon: `text-foreground`
- Default / compound without children: `text-muted` → `text-foreground` on `group-hover/link` and `group-focus-visible/link`
- Default ↗: `rotate-[-45deg]`

Link color can be overridden: `className="text-muted"`.

## Animations

Motion: `linkAnimations.ts` → `usePressableElementTextMotion` with **`hoverLift: true`**.

**DOM structure:**

```
<a ref=anchorRef>              ← pointer handlers; transform target = the <a> itself
  [LinkIconSlot start]
  <Text> text
  [LinkIconSlot end]
```

The entire anchor (`inline-flex`) receives the scale transform — text and icons move together.

### 1. Hover lift

**Pointer enter** (if not `defaultPrevented`):

1. `shouldSkipInteractiveHoverLift()` — skip on reduced-motion / touch / tablet
2. `animateInteractiveHoverLift(anchor, true, hoverLiftScale)` — fixed scale from config (not adaptive like Button)

**Pointer leave:** `animateInteractiveHoverLift(anchor, false, hoverLiftScale)`.

**No shadow** — Link does not use `--el-shadow` / `useShadowMotion` (unlike Button/Alert).

### 2. Press squeeze

**Pointer down:**

1. `animateInteractivePressSqueeze(anchor, { pointerInside, liftScale })`
2. Three-phase scale: rest → compressed → rest
3. After release: if pointer inside — restores hover lift

Adaptive squeeze by element size (~2.4px cap) — same as Button.

### 3. Icons — CSS-only

Icon color: `TEXT_COLOR_TRANSITION` + `group-hover/link` — **not GSAP**.

### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.025,        // lift on hover (fixed for Link)
  hoverLiftEase: "sine.inOut",
  interactiveDuration: 280,     // squeeze duration
  pressSqueezeScale: [1, 0.98, 1],
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

**Reduced motion / touch:** lift and squeeze are disabled (`prefersReducedMotion`, viewport ≤ tablet).

**Locally:** motion is always enabled in `useLinkAnimations`; Link has no disabled state — for an inactive link use styles + `aria-disabled` / `pointer-events-none` manually.

### Summary: what is configured where

| Animation | Utility | `configureMotion` | Note |
|----------|---------|-------------------|------------|
| Hover lift | `usePressableElementTextMotion` | `hoverLiftScale`, `enableHoverLift` | no shadow |
| Press squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale`, `interactiveDuration` | on `<a>` |
| Icon color | CSS `group-hover/link` | — | not GSAP |

## Tokens and CSS

| Class | Purpose |
|-------|------------|
| `text-foreground` | link color |
| `focus-ring` | focus visible |
| `rounded-mid` | hit area |
| `underline decoration-current/70` | when `underline` |
| `gap-xsmall` | between icon and text |

## Styling and customization

### Two levels

1. **`className`** — extra classes on `<a>` (merged with `classNames.root`).
2. **`classNames`** — slots `root`, `text`, `icon`.

Link is a single component; "compound" only changes icon markup inside the anchor.

### `LinkClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------------|
| `root` | `<a>` | Gap, padding, border, hover-lift target |
| `text` | `Text` (children) | Font, underline override |
| `icon` | Icon wrapper (start/end) | Size, muted/hover color |

`size`, `underline` — base typography and underline from `linkStyles.ts`.

### Simple API

```tsx
<Link
  href="/docs"
  underline
  showDefaultIcon
  icon={<IoDocument aria-hidden />}
  className="max-w-xs"
  classNames={{
    root: "gap-small rounded-mid border border-primary/20 p-xsmall text-info",
    text: "font-semibold",
    icon: "text-warning",
  }}
>
  Documentation
</Link>
```

Icons via `icon` + `iconPosition` / `showDefaultIcon` props — wrapper styles via `icon`.

### Compound API

```tsx
<Link
  href="/item"
  classNames={{
    root: "gap-large",
    text: "text-primary",
    icon: "text-muted group-hover:text-foreground",
  }}
>
  <Link.Icon iconPosition="start">
    <IoFolder aria-hidden />
  </Link.Icon>
  Open file
  <Link.Icon iconPosition="end" />
</Link>
```

Empty `<Link.Icon iconPosition="end" />` — default ↗; `muted` until hover is set via `icon` styles.

`Link.Icon` has no separate slot in `LinkClassNames` — style the icon via `icon` or wrap children.

### Practical notes

- **Motion:** hover-lift and squeeze on `anchor` — do not override `transform` on anchor unless needed.
- **External links:** `target="_blank"` + `rel="noopener noreferrer"` — via standard anchor props.
- **Merge order:** base → `classNames.slot` → `className` on `<Link>`.

## Accessibility

- Native `<a href>`
- Icons: `aria-hidden`
- Focus: `focus-ring` on anchor
- External links: `target="_blank"` + `rel="noopener noreferrer"`

## File structure

```
Link/
├── Link.tsx
├── index.ts
├── linkTypes.ts
├── linkStyles.ts
├── linkAPI.ts              # compound icon resolve
├── linkParts.tsx
├── linkAnimations.ts
├── useLinkRootState.ts
├── linkContext.tsx
├── linkA11y.ts
└── Link.stories.tsx
```

## Storybook

`Core Components/Link` — default icon, underline, compound, sizes, custom icons, light theme.
