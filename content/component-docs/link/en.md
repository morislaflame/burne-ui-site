# Link

Text link `<a>` with optional icons, underline, hover-lift, and press squeeze. Simple and compound API (`Link.Icon`).

## Import

```tsx
import {
  Link,
  LinkIcon,
  type LinkProps,
  type LinkSize,
  type LinkIconPosition,
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
| `leftIcon` / `rightIcon` | `ReactNode` | — | Simple API icons |
| `showDefaultIcon` | `boolean` | `false` | `IoArrowForward` ↗ |
| `defaultIconPosition` | `start` \| `end` | `end` | Default icon position |
| `className` | `string` | — | On `<a>` |
| `classNames` | `LinkClassNames` | — | `anchor`, `text`, `iconStart`, `iconEnd` |
| … | `AnchorHTMLAttributes` | — | `target`, `rel`, `onClick`, … |

### `LinkClassNames`

```tsx
type LinkClassNames = {
  anchor?: string;
  text?: string;
  iconStart?: string;
  iconEnd?: string;
};
```

### Simple API

```tsx
<Link href="/docs" underline showDefaultIcon>
  Documentation
</Link>

<Link href="/back" leftIcon={<IoChevronBack aria-hidden />} size="small">
  Back
</Link>
```

### Compound API

```tsx
<Link href="/item">
  <Link.Icon position="start"><IoDocument aria-hidden /></Link.Icon>
  Open file
  <Link.Icon position="end" />
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

- Text and anchor: `text-primary`, `focus-ring`
- Custom icon: `text-primary`
- Default / compound without children: `text-muted` → `text-primary` on `group-hover/link` and `group-focus-visible/link`
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

**Reduced motion / touch:** lift and squeeze are disabled (`prefersReducedInteractiveHoverLift`, viewport ≤ tablet).

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
| `text-primary` | link color |
| `focus-ring` | focus visible |
| `rounded-mid` | hit area |
| `underline decoration-current/70` | when `underline` |
| `gap-xsmall` | between icon and text |

## Styling and customization

### Two levels

1. **`className`** — extra classes on `<a>` (merged with `classNames.anchor`).
2. **`classNames`** — slots `anchor`, `text`, `iconStart`, `iconEnd`.

Link is a single component; "compound" only changes icon markup inside the anchor.

### `LinkClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------------|
| `anchor` | `<a>` | Gap, padding, border, hover-lift target |
| `text` | `Text` (children) | Font, underline override |
| `iconStart` | Left icon wrapper | Size, muted/hover color |
| `iconEnd` | Right icon wrapper | Default ↗ or `rightIcon` |

`size`, `underline` — base typography and underline from `linkStyles.ts`.

### Simple API

```tsx
<Link
  href="/docs"
  underline
  showDefaultIcon
  leftIcon={<IoDocument aria-hidden />}
  className="max-w-xs"
  classNames={{
    anchor: "gap-small rounded-mid border border-primary/20 p-xsmall text-info",
    text: "font-semibold",
    iconStart: "opacity-80",
    iconEnd: "text-warning",
  }}
>
  Documentation
</Link>
```

Icons via `leftIcon` / `rightIcon` / `showDefaultIcon` props — wrapper styles via `iconStart` / `iconEnd`.

### Compound API

```tsx
<Link
  href="/item"
  classNames={{
    anchor: "gap-mid",
    text: "text-primary",
    iconStart: "text-muted group-hover:text-foreground",
  }}
>
  <Link.Icon position="start">
    <IoFolder aria-hidden />
  </Link.Icon>
  Open file
  <Link.Icon position="end" />
</Link>
```

Empty `<Link.Icon position="end" />` — default ↗; `muted` until hover is set via `iconEnd` styles.

`Link.Icon` has no separate slot in `LinkClassNames` — style the icon via `iconStart` / `iconEnd` or wrap children.

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
