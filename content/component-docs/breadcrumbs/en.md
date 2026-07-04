# Breadcrumbs

Navigation trail in `<nav>`. **Simple API** — `items` on root; **compound API** — `Breadcrumbs.List` + `Breadcrumbs.Item`. With `collapse`, long chains fold into `…` with a `Dropdown` of hidden segments.

## Import

```tsx
import {
  Breadcrumbs,
  type BreadcrumbsProps,
  type BreadcrumbsClassNames,
  type BreadcrumbItem,
  type BreadcrumbsListProps,
  type BreadcrumbsItemProps,
} from "burne-ui";
```

## API

### Simple API

```tsx
<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Current", current: true },
  ]}
/>
```

### Compound API

```tsx
<Breadcrumbs collapse>
  <Breadcrumbs.List>
    <Breadcrumbs.Item href="/" onClick={preventNav}>
      Home
    </Breadcrumbs.Item>
    <Breadcrumbs.Item href="/catalog">Catalog</Breadcrumbs.Item>
    <Breadcrumbs.Item current>Current</Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `collapse` | `true` | Collapse chains with > 3 items |
| `items` | — | Simple API: array of `BreadcrumbItem` |
| `aria-label` | `"Breadcrumbs"` | Accessible name for `<nav>` |
| `className` | — | Classes on `<nav>` |
| `classNames` | — | Slots |

### `BreadcrumbItem`

```tsx
type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  onClick?: (event) => void;
  current?: boolean;
  className?: string;
};
```

### Compound subparts

| Part | Role |
|------|------|
| `Breadcrumbs.List` | `<ol>` with auto-walk of `Breadcrumbs.Item` |
| `Breadcrumbs.Item` | Marker for compound (rendered via walk) |
| `Breadcrumbs.Separator` | Custom chevron (in simple/compound pieces — `IoChevronForward`) |

`Breadcrumbs.Item` in compound is a declarative marker (`return null`); data is collected via `displayName` walk.

### `BreadcrumbsClassNames`

`root`, `list`, `listItem`, `separator`, `separatorWrapper`, `current`, `link`, `linkWrapper`, `linkText`, `static`, `ellipsisTrigger`, `ellipsisLiftWrapper`, `ellipsisText`, `ellipsisPopover`, `dropdownItem`.

`Breadcrumbs.List` can override `classNames` locally (merged with root provider).

## Collapse behavior

With `collapse={true}` and **> 3** items:

```
[first] … [penultimate] [current]
         └─ Dropdown with hidden middle items
```

Algorithm (`breadcrumbsAPI.ts`):

- `n <= 3`: all segments visible
- `n > 3`: `items[0]`, ellipsis (`items[1..n-3]`), `items[n-2]`, `items[n-1]`

The last segment gets `aria-current="page"` (or via the `current` prop).

## Animations

`breadcrumbsAnimations.ts` → `useBreadcrumbInteractiveMotion` + motion from `Dropdown` (ellipsis).

**DOM (link crumb):**

```
<li class=listItem>
  <span class=linkWrapper>
    <a|button class=link>
      <Text ref=textRef class=linkText>Catalog</Text>
    </a>
  </span>
  <span class=separatorWrapper>
    <IoChevronForward class=separator />
```

**DOM (collapse ellipsis):**

```
<Dropdown>
  <Dropdown.Trigger class=ellipsisTrigger>
    <span class=ellipsisLiftWrapper>
      <Text ref=textRef class=ellipsisText>…</Text>
  <Dropdown.Popover class=ellipsisPopover>
    <Dropdown.Item class=dropdownItem>hidden segment</Dropdown.Item>
```

No hover lift on crumbs — only CSS `hover:text-foreground` + press text squeeze.

### 1. Crumb press text motion

`useBreadcrumbInteractiveMotion` on interactive `<a>` / `<button>`:

**Pointer down:** `usePressableElementTextMotion` squeeze on `textRef` (`linkText`).

Applied to:

- link crumbs (`href` + `onClick`)
- button crumbs (SPA navigation)
- ellipsis trigger `…` (same hook, separate `textRef`)

**Not animated:** `current` segment (`breadcrumbCurrentClass`), `static` segments.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  pressSqueezeScale: [1, 0.98, 1],
  interactiveDuration: 280,
});
```

**Reduced motion:** squeeze is skipped inside `usePressableElementTextMotion`.

### 2. Ellipsis dropdown menu

Hidden middle items → `Dropdown` compound:

- Trigger squeeze: `runOpenAfterSqueeze` (see Dropdown.md)
- Popover portal: `motionTooltip()`
- Item press squeeze on menu rows

Slots: `ellipsisPopover`, `dropdownItem`, `ellipsisTrigger`.

### 3. Collapse layout

When `items` / route change — React re-renders the chain. **No** FLIP/GSAP on list items.

### What's not included

- Hover shadow lift on crumbs
- Portal motion on crumbs themselves (ellipsis menu only)
- Ripple
- Separator chevron animation

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Link text press | `useBreadcrumbInteractiveMotion` | `pressSqueezeScale` | `href` / `onClick` |
| Ellipsis `…` press | same hook | `pressSqueezeScale` | `collapse={true}` |
| Dropdown menu | `Dropdown` | `tooltipDuration`, `pressSqueezeScale` | hidden items count |
| Collapse layout | React | — | `collapse`, items length |

## Tokens and CSS

| Class / token | Role |
|---------------|------|
| `CRUMB_INTERACTIVE_INNER_CLASS` | Truncate, muted, `hover:text-foreground` |
| `BREADCRUMBS_ELLIPSIS_TRIGGER_CLASS` | `…` button, `aria-expanded` styles |
| `breadcrumbCurrentClass` | `font-medium text-foreground` last segment |
| `breadcrumbChevronClass` | `IoChevronForward icon-small opacity-75` |
| `TEXT_COLOR_TRANSITION` | Color transition on interactive |
| `focus-visible:outline-primary` | Keyboard focus ring |

## Styling and customization

### Two levels

1. **`className` on root** — padding/border on `<nav>`.
2. **`classNames` on root** — all slots; `Breadcrumbs.List` can extend locally.

Per-item: **`className` on `Breadcrumbs.Item`** (compound) or `BreadcrumbItem.className` (simple).

### `BreadcrumbsClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | `<nav>` | Container border/padding |
| `list` | `<ol>` | Flex gap, wrap long chains |
| `listItem` | `<li>` | Item + separator spacing |
| `separator` | `IoChevronForward` | Chevron color/size |
| `separatorWrapper` | Wrapper span | Separator alignment |
| `current` | Last crumb `Text` | Current page emphasis |
| `link` | `<a>` / `<button>` | Interactive surface padding |
| `linkWrapper` | Outer span | Hover hit area |
| `linkText` | Inner `Text` | Typography + press target |
| `static` | Non-clickable segment | Muted path without href |
| `ellipsisTrigger` | `Dropdown.Trigger` | `…` button surface |
| `ellipsisLiftWrapper` | Inner span | Press wrapper |
| `ellipsisText` | `…` Text | Weight/color ellipsis |
| `ellipsisPopover` | Dropdown body | Menu panel border |
| `dropdownItem` | Hidden crumb rows | Menu item typography |

### Simple API

```tsx
<Breadcrumbs
  className="rounded-mid border border-token p-small"
  classNames={{
    separator: "text-primary opacity-100",
    link: "text-info hover:text-info",
    current: "font-semibold text-success",
  }}
  items={[
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Current", current: true },
  ]}
/>
```

### Compound API with local List override

```tsx
<Breadcrumbs
  collapse
  classNames={{
    list: "gap-small",
    current: "font-semibold text-success",
    ellipsisPopover: "border border-token",
  }}
>
  <Breadcrumbs.List classNames={{ ellipsisTrigger: "text-warning" }}>
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/catalog">Catalog</Breadcrumbs.Item>
    <Breadcrumbs.Item current>Current</Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>
```

### Per-item className

```tsx
<Breadcrumbs.Item href="#" className="underline decoration-dotted">
  Home
</Breadcrumbs.Item>
```

Merged into the `link` / `static` / `current` slot.

### Practical notes

- SPA: `onClick` + `preventDefault` on `href`.
- `collapse={false}` — full chain without `…` menu.
- Separator — `IoChevronForward` (`aria-hidden`).
- `Breadcrumbs.List` inherits collapse context from root.
- Hidden items in the ellipsis menu — meaningful `label` values for screen readers.
- **Do not set `transform` on `linkText`** — conflicts with press squeeze.
- **List `classNames` merge** with root provider — local slots override root.

## Integrations

| Component | Usage |
|-----------|-------|
| `Dropdown` | Ellipsis menu with hidden crumbs |
| `Text` | Typography for all segments |
| `Link` | Alternative for individual links outside the chain |

## Accessibility

- Root: `<nav aria-label="Breadcrumbs">` (or custom `aria-label`)
- Current page: `aria-current="page"` on the last segment
- Separators: `aria-hidden`
- Ellipsis trigger: `aria-label="Show N hidden sections"`
- Dropdown popover: `aria-label="Hidden sections"`
- Interactive crumbs: native `<a>` / `<button>` semantics

## File structure

```
Breadcrumbs/
├── Breadcrumbs.tsx
├── index.ts
├── breadcrumbsTypes.ts
├── breadcrumbsStyles.ts
├── breadcrumbsAnimations.ts    # useBreadcrumbInteractiveMotion
├── breadcrumbsParts.tsx
├── breadcrumbsSimpleContent.tsx
├── useBreadcrumbsRootState.ts
├── breadcrumbsAPI.ts
├── breadcrumbsA11y.ts
├── breadcrumbsContext.tsx
└── Breadcrumbs.stories.tsx
```

## Storybook

`Core Components/Breadcrumbs` — simple/compound, collapse, long chain, light theme, per-item className, `classNames`.
