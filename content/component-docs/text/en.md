# Text

Base typography of the design system. `Text` maps `variant` to tokenized classes (`text-base`, `text-header-1`, etc.) and picks the semantic HTML tag by default.

## Import

```tsx
import { Text, type TextProps, type TextVariant } from "burne-ui";
```

## API

### Simple API

```tsx
<Text variant="base">
  Burne UI design system text example
</Text>

<Text variant="header-2" as="span" className="break-words break-all">
  very_long_file_name.tsx
</Text>
```

There is no compound API: the component is leaf-level and has no sub-parts.

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | — | Required typography variant |
| `as` | depends on `variant` | HTML tag or React component |
| `inheritColor` | `false` | Do not add `text-foreground` |
| `className` | — | Additional classes |
| HTML props | — | All `HTMLAttributes<HTMLElement>` except overridden `className` |

### `TextVariant`

`accent-header`, `header-1`, `header-2`, `large`, `mid`, `base`, `small`, `xsmall`.

### Default tags

| Variant | Default tag |
|---------|-------------|
| `accent-header` | `h1` |
| `header-1` | `h2` |
| `header-2` | `h3` |
| `large` / `mid` / `base` / `small` / `xsmall` | `p` |

## Sizes and variants

`variant` controls typography only:

| Variant | CSS token |
|---------|-----------|
| `accent-header` | `text-accent-header` |
| `header-1` | `text-header-1` |
| `header-2` | `text-header-2` |
| `large` | `text-large` |
| `mid` | `text-mid` |
| `base` | `text-base` |
| `small` | `text-small` |
| `xsmall` | `text-xsmall` |

`variant` does not set semantic status and does not change color except the default `text-foreground`.

## Animations

`Text` does not use GSAP and has no animation pipeline.

**DOM:**

```tsx
createElement(as ?? defaultTag, {
  className: cn(VARIANT_CLASS[variant], !inheritColor && "text-foreground", className),
})
```

### Summary

| Animation | GSAP | `configureMotion` |
|-----------|------|-------------------|
| Typography render | No | — |
| Color/variant switch | No | — |

## Styling and customization

### Single level

`Text` accepts only `className`. There is no `classNames` because the component has a single DOM node.

```tsx
<Text variant="small" className="text-muted">
  Secondary text
</Text>
```

### Color

`text-foreground` is added by default.

```tsx
<Text variant="base" className="text-info">
  Info text
</Text>
```

When color should inherit from the parent:

```tsx
<Text variant="base" inheritColor>
  Inherits parent color
</Text>
```

### Semantics via `as`

```tsx
<Text variant="header-1" as="h1">
  Page title
</Text>

<Text variant="small" as="span" className="text-muted">
  Inline meta
</Text>
```

### Practical notes

- `variant` is visual size; `as` is semantics.
- For inline content, prefer `as="span"`.
- In composite components, use `inheritColor` so the container color is not overridden.
- For wrapping (`break-words`, `truncate`), use `className`.

## Integrations

`Text` is used inside `Badge`, `Avatar.Fallback`, `ProgressBar.Value`, `Meter.Value`, and other components as a unified typography layer.

## Accessibility

The component does not add ARIA. Accessibility is determined by the HTML tag chosen via `as` and passed HTML props.

## File structure

```
Text/
├── Text.tsx
├── index.ts
└── Text.stories.tsx
```

## Storybook

`Core Components/Text` — default, `as="span"` + wrapping, surface panel, light theme.
