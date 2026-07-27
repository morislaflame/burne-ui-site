# Pagination

Page navigation in `<nav>`. Compound API: `Summary`, `Content`, `Item`, `Previous` / `Next`, `Pages`. Buttons styled as muted links with press text motion; page changes animate with a FLIP-like shift.

## Import

```tsx
import {
  Pagination,
  type PaginationProps,
  type PaginationClassNames,
  type PaginationSummaryProps,
  type PaginationContentProps,
  type PaginationPageProps,
} from "burne-ui";
```

## API

### Compound API

```tsx
const [page, setPage] = useState(1);

<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  siblingCount={1}
>
  <Pagination.Summary>
    Page {page} of 10
  </Pagination.Summary>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.Previous />
    </Pagination.Item>
    <Pagination.Pages />
    <Pagination.Item>
      <Pagination.Next />
    </Pagination.Item>
  </Pagination.Content>
</Pagination>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `page` | — | Current page (1-based) |
| `totalPages` | — | Total number of pages |
| `onPageChange` | — | `(page: number) => void` |
| `siblingCount` | `1` | Sibling pages around current |
| `aria-label` | `"Pagination"` | Accessible name for `<nav>` |
| `className` | — | On `<nav>` |
| `classNames` | — | Slots |

### `PaginationClassNames`

`root`, `summary`, `summaryText`, `content`, `item`, `interactive`, `pageActive`, `pageText`, `ellipsis`, `navText`, `previousIcon`, `nextIcon`.

### Compound subparts

| Part | Role |
|------|------|
| `Pagination.Summary` | Text summary (optional) |
| `Pagination.Content` | `<ol>` list of controls |
| `Pagination.Item` | `<li>` wrapper |
| `Pagination.Previous` / `Next` | Nav buttons with auto disable |
| `Pagination.PreviousIcon` / `NextIcon` | `IoChevronBack` / `Forward` |
| `Pagination.Page` | Page number button |
| `Pagination.Pages` | Auto range from context |
| `Pagination.Ellipsis` | Decorative `…` |

`Pagination.Pages` requires `page` and `totalPages` on root.

## Layout / responsive

Root uses `flex-wrap`: Summary on the left, Content on the right. On narrow widths Summary may stack on its own row; buttons inside `Pagination.Content` **do not wrap** — horizontal scroll (`overflow-x-auto` + `flex-nowrap`).

## Range behavior

`getPaginationRange(page, totalPages, siblingCount)`:

- `totalPages <= 7`: all page numbers
- otherwise: `1`, `…`, siblings, `…`, `last`
- ellipsis items get `data-flip-key` for animation

`Pagination.Previous` disabled when `page <= 1`; `Next` when `page >= totalPages`.

Active page is `<span aria-current="page">`, not a button.

## Animations

`paginationAnimations.ts` — FLIP on `<ol>` + shared press motion on buttons.

**DOM:**

```
<nav>
  <Pagination.Summary />
  <ol ref=olRef>                    ← usePaginationFlip target
    <li data-flip-key="prev">       ← Previous
    <li data-flip-key="page-3">     ← Page button
    <li data-flip-key="ellipsis-1"> ← Ellipsis (fade in/out)
    <li data-flip-key="page-active"> ← Current span (no button)
```

No portal, no hover shadow lift — only text press + layout shift.

### 1. Page flip (`usePaginationFlip`)

`useLayoutEffect` with deps `page` / `totalPages` / `siblingCount` / `children` (not on every Content re-render):

1. Collects `data-flip-key` from `<li>` children (or `__keyless_N` fallback)
2. Compares `getBoundingClientRect()` with the previous frame
3. **Existing item** (key existed): GSAP `fromTo({ x: dx }, { x: 0, ...motionInteractive() })`
4. **New item** (new key): `fromTo({ autoAlpha: 0, scale: 0.82 }, { autoAlpha: 1, scale: 1 })`
5. **First run:** skip animation (initialize `prevRects`)
6. **Unmount cleanup:** `killMotion` on all children

Ellipsis and page numbers get stable `data-flip-key` values from `paginationAPI`.

#### FLIP customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  interactiveEase: "power2.out",
});
```

**Reduced motion:** `prefersReducedMotion()` — instant layout without GSAP.

### 2. Button press text motion

`PaginationInteractive` → `usePressableElementTextMotion`:

**Pointer down** on Previous / Next / Page buttons:

- squeeze inner `Text` ref (`textMotionRef`)
- `origin-center` on button (`PAGINATION_INTERACTIVE_BUTTON_CLASS`)

Disabled state: `disabled:opacity-48`, motion skipped via `isDisabled`.

#### Press customization

```ts
configureMotion({
  pressSqueezeScale: [1, 0.98, 1],
  interactiveDuration: 280,
});
```

### 3. Active page switch

Changing `page` → React re-render → `Pagination.Pages` rebuilds range → FLIP animates the shift.

The active span itself is **not** squeezed — it is `<span aria-current="page">`.

### What's not included

- Hover lift / second-level shadow
- Portal animations
- Ripple
- Chevron rotation (static icons)

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| FLIP shift items | `usePaginationFlip` | `interactiveDuration`, `interactiveEase` | `data-flip-key` on Item |
| New item fade+scale | `usePaginationFlip` | `interactiveDuration` | — |
| Press text squeeze | `usePressableElementTextMotion` | `pressSqueezeScale` | `disabled` on button |
| Active page | React render | — | `page` |

## Tokens and CSS

| Class / token | Role |
|---------------|------|
| `PAGINATION_INTERACTIVE_BUTTON_CLASS` | Muted link-style buttons, `hover:text-foreground` |
| `PAGINATION_PAGE_ACTIVE_CLASS` | Current page `font-medium text-foreground` |
| `PAGINATION_PAGE_TEXT_CLASS` | `tabular-nums` on page numbers |
| `PAGINATION_ELLIPSIS_CLASS` | Decorative `…` |
| `PAGINATION_PREVIOUS_ICON_CLASS` | `IoChevronBack icon-small` |
| `focus-ring` | Keyboard focus on interactive elements |
| `motion-reduce:animate-none` | On buttons |

## Styling and customization

### Two levels

1. **`className` on `Pagination`** — `<nav>` wrapper.
2. **`classNames` on root** — summary, content, buttons, icons.

`Pagination.Item` / `Page` / `Previous` — no separate `classNames`; style via root slots.

### `PaginationClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | `<nav>` | Border, padding, max-width container |
| `summary` | Summary div | Summary layout on the left |
| `summaryText` | Inner `Text` | Color/size for "Page N of M" |
| `content` | `<ol>` | Gap between page items |
| `item` | `<li>` | Per-item spacing |
| `interactive` | Nav/page `<button>` | Hover color, padding, radius |
| `pageActive` | Current `<span>` | Active typography (not a button) |
| `pageText` | Page number in button | Muted → foreground hover |
| `ellipsis` | `…` span | Ellipsis color/size |
| `navText` | Back/Forward label | Nav typography |
| `previousIcon` / `nextIcon` | Chevron icons | Icon size/opacity |

### Full compound with summary

```tsx
<Pagination
  page={page}
  totalPages={12}
  onPageChange={setPage}
  classNames={{
    root: "rounded-mid border border-primary/20 p-base",
    summaryText: "text-primary",
    content: "gap-small",
    previous: "text-info hover:text-primary",

    next: "text-info hover:text-primary",

    page: "text-info hover:text-primary",
    pageActive: "text-primary font-semibold",
    navText: "font-medium",
  }}
>
  <Pagination.Summary>Page {page} of 12</Pagination.Summary>
  <Pagination.Content>
    <Pagination.Item><Pagination.Previous /></Pagination.Item>
    <Pagination.Pages />
    <Pagination.Item><Pagination.Next /></Pagination.Item>
  </Pagination.Content>
</Pagination>
```

### Minimal prev/next only

```tsx
<Pagination page={page} totalPages={5} onPageChange={setPage}>
  <Pagination.Content>
    <Pagination.Item><Pagination.Previous>Back</Pagination.Previous></Pagination.Item>
    <Pagination.Item><Pagination.Next>Forward</Pagination.Next></Pagination.Item>
  </Pagination.Content>
</Pagination>
```

Custom range: manually compose `Pagination.Page` + `Pagination.Ellipsis` with unique `data-flip-key` values.

### Practical notes

- Icons: `react-icons/io5` (`IoChevronBack`, `IoChevronForward`).
- `children` in `Previous` / `Next` — custom labels; use `aria-label` for a11y.
- `Pagination.Page` accepts `active` override.
- **Do not remove `data-flip-key`** from `<li>` when using a custom range — FLIP will break.
- Summary is optional — prev/next/pages only is fine.
- **Do not set `transform` on `<li>`** — conflicts with FLIP `x` tween.
- **Merge order:** base button classes → `classNames.interactive` → per-button `className` (if API supports it).

## Integrations

| Context | Pattern |
|---------|---------|
| Tables / lists | `page` + `onPageChange` with data fetch |
| `Breadcrumbs` | Similar press motion on interactive elements |

## Accessibility

- Root: `<nav aria-label="Pagination">`
- Active page: `aria-current="page"`
- Page buttons: `aria-label="Page N"` (if children is only a number)
- Previous/Next: default labels `"Back"` / `"Forward"` (customize via `aria-label`)
- Ellipsis / icons: `aria-hidden`

## File structure

```
Pagination/
├── Pagination.tsx
├── index.ts
├── paginationTypes.ts
├── paginationStyles.ts
├── paginationAnimations.ts    # usePaginationFlip
├── paginationParts.tsx
├── usePaginationRootState.ts
├── paginationContext.tsx
├── paginationAPI.ts
├── paginationA11y.ts
└── Pagination.stories.tsx
```

## Storybook

`Core Components/Pagination` — prev/next, full pages, controlled state, light theme, `classNames`.
