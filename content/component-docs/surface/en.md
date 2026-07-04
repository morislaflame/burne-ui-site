# Surface

Base panel with theme tokens: fill, optional shadow, padding, radius. Primitive for sections and menus — no compound API like `Card`. `variant="gloss"` is a glass CSS panel (`gloss-panel`).

## Import

```tsx
import {
  Surface,
  type SurfaceProps,
  type SurfaceVariant,
  type SurfaceShadow,
  type SurfacePadding,
  type SurfaceRadius,
} from "burne-ui";
```

## API

### Basic usage

```tsx
<Surface variant="default" shadow="md" padding="plus" radius="mid">
  <Text variant="base">Panel content</Text>
</Surface>

<Surface variant="gloss" padding="plus" radius="large" className="w-56">
  <Text variant="base" className="font-medium">Gloss panel</Text>
</Surface>
```

No compound API.

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `secondary` \| `tertiary` \| `gloss` |
| `shadow` | `none` | `none` \| `sm` \| `md` \| `lg` |
| `padding` | `none` | `none` \| `small` \| `base` \| `plus` \| `mid` |
| `radius` | `mid` | `base` \| `mid` \| `large` |
| `className` | — | Additional classes |
| HTML props | — | On root `<div>` |

## Variant / tokens

### Variant (fill)

| Variant | CSS |
|---------|-----|
| `default` | `bg-surface` |
| `secondary` | `bg-secondary` |
| `tertiary` | `bg-tertiary` |
| `gloss` | `gloss-panel` + inner `gloss-content` |

No border by default (unlike `Card`).

### Shadow

`shadow-token-sm` / `md` / `lg` or empty when `none`.

### Padding

`p-small`, `p-base`, `p-plus`, `p-mid`.

### Radius

`rounded-base`, `rounded-mid`, `rounded-large`.

### Comparison with `Card`

| | `Surface` | `Card` |
|---|-----------|--------|
| Border | none by default | `border-token` |
| Header/Body/Footer | no | compound slots |
| Shadow hover | no | pressable lift |
| `classNames` | no | yes |
| Pressable | no | `pressable` prop |

## Animations

`Surface` **does not use GSAP** for hover/press — passive layout primitive.

**DOM (default):**

```
<div class="bg-surface shadow-token-md p-plus rounded-mid">
  children
</div>
```

**DOM (gloss):**

```
<div class="gloss-panel" ref=glossRef>
  <div class="gloss-content">
    children
  </div>
</div>
```

### 1. Gloss ref binding

`variant="gloss"` → `useMergedGlossPanelRef(ref, true)`:

- Prepares gloss panel DOM ref for potential gloss utilities
- **Without** built-in `onPointerOver` / squeeze handlers
- Passive glass panel — depth only from CSS (`gloss-panel`, conic border)

### 2. Shadow / padding / radius

Pure CSS via props — **not animated** when props change (instant re-render).

`shadow="sm"|"md"|"lg"` → `shadow-token-*` classes.

### What's missing

- Hover lift / press squeeze
- Portal motion
- Ripple
- `classNames` API
- Persistent shadow animation (`--el-shadow` GSAP)

For interactive gloss hover: `Card pressable`, `Button`, `Popover`, `Kbd`.

### Summary: what is configured where

| Behavior | Mechanism | `configureMotion` keys | Local prop |
|----------|-----------|------------------------|------------|
| Fill / radius / padding | CSS props | — | `variant`, `padding`, `radius` |
| Static shadow | CSS class | — | `shadow` |
| Gloss ref init | `useMergedGlossPanelRef` | — | `variant="gloss"` |
| Interactive rows | manual `hoverVariant()` on children | — | pattern in stories |

## Tokens and CSS

| Prop / class | CSS |
|--------------|-----|
| `variant="default"` | `bg-surface` |
| `variant="secondary"` | `bg-secondary` |
| `variant="tertiary"` | `bg-tertiary` |
| `variant="gloss"` | `gloss-panel` + inner `gloss-content` |
| `shadow="sm"` | `shadow-token-sm` |
| `padding="plus"` | `p-plus` |
| `radius="mid"` | `rounded-mid` |
| `hoverVariant()` | For interactive children (not on Surface root) |

## Styling and customization

### Single level

Only **`className`** + `variant` / `shadow` / `padding` / `radius` props.

No separate `classNames` — all customization via `className` on root.

### Basic panels

```tsx
<Surface variant="default" shadow="md" padding="plus" radius="mid" className="w-full max-w-sm">
  <Text variant="base">Panel content</Text>
</Surface>

<Surface variant="gloss" padding="plus" radius="large" className="w-56">
  <Text variant="base" className="font-medium">Gloss panel</Text>
</Surface>
```

### Nested surfaces (nested panels)

```tsx
<Surface padding="plus" shadow="sm" className="max-w-sm">
  <Text variant="base" className="font-medium">Outer</Text>
  <Surface variant="tertiary" padding="small" radius="base" className="mt-small">
    <Text variant="small" className="text-muted">Inner panel</Text>
  </Surface>
</Surface>
```

### Interactive list (pattern from stories)

Hover on **children**, not on Surface root:

```tsx
<Surface variant="default" shadow="md" padding="small" className="w-64">
  <ul className="m-0 flex list-none flex-col gap-xsmall p-0">
    {items.map((item) => (
      <li key={item.id}>
        <button
          type="button"
          className={cn(
            "w-full rounded-base px-small py-xsmall text-left",
            hoverVariant(),
          )}
        >
          {item.label}
        </button>
      </li>
    ))}
  </ul>
</Surface>
```

For press squeeze on rows — wrap in `Button` or add `usePressableElementTextMotion`.

### When `Surface` vs `Card`

- **`Surface`** — neutral container, sidebar chunk, menu backdrop, nested panel.
- **`Card`** — card with header, footer, optional pressable + ripple.

### Practical notes

- `shadow` does not intensify on hover — for lift use `Card pressable` or `Button`.
- Gloss — verify on light/dark theme (conic border + blur).
- `padding="none"` + custom spacing in children for tight menus.
- `className` on gloss applies to the outer `gloss-panel`.
- **Do not expect motion from changing the `shadow` prop** — it is a static CSS class.

## Integrations

| Component | Difference |
|-----------|------------|
| `Card` | Border, header/body/footer, pressable, static shadow |
| `Popover` / `Dropdown` | Floating portal panels |
| `Badge` | Status overlay on surface/card |

## Accessibility

The component does not add ARIA. Use semantic children (`nav`, `button`, headings). No role is required for purely decorative panels.

## File structure

```
Surface/
├── Surface.tsx
├── index.ts
└── Surface.stories.tsx
```

## Storybook

`Core Components/Surface` — variants, shadows, padding/radius, nested panels, gloss, light theme, interactive list pattern.
