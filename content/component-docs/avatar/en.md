# Avatar

User avatar with image, fallback letter, tooltip via `nickname`, `variant="gloss"`, and grouping via `AvatarGroup`. Supports Simple API (`src`, `label`) and compound API (`Avatar.Image`, `Avatar.Fallback`).

## Import

```tsx
import {
  Avatar,
  AvatarGroup,
  type AvatarProps,
  type AvatarClassNames,
  type AvatarSize,
  type AvatarImageProps,
  type AvatarFallbackProps,
  type AvatarGroupProps,
} from "burne-ui";
```

## API

### Simple API

```tsx
<Avatar
  size="base"
  label="Grace Hopper"
  src={avatarUrl}
  alt=""
  loading="lazy"
  nickname="grace_h"
/>
```

If `src` is not provided or the image fails to load, a fallback is shown using the first letter of `label`.

### Compound API

```tsx
<Avatar size="base" label="Grace Hopper" nickname="grace_h">
  <Avatar.Image src={avatarUrl} alt="" loading="lazy" />
  <Avatar.Fallback />
</Avatar>
```

Custom fallback:

```tsx
<Avatar size="base" label="Design System">
  <Avatar.Fallback>DS</Avatar.Fallback>
</Avatar>
```

### AvatarGroup

```tsx
<AvatarGroup>
  <Avatar size="base" label="One" src={one} alt="" />
  <Avatar size="base" label="Two" src={two} alt="" />
  <Avatar size="base" label="Plus five" nickname="+5" />
</AvatarGroup>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `label` | — | Accessible name + fallback source |
| `src` | — | Image URL for Simple API |
| `alt` | `""` | Image alt; usually empty because the root already has a label |
| `loading` | — | `img.loading` |
| `nickname` | — | Tooltip content |
| `tooltipSize` | `base` | Tooltip size |
| `tooltipVariant` | `default` | Tooltip variant |
| `tooltipSide` | `top` | Tooltip side |
| `className` | — | Root shell (in gloss — inner circle) |
| `classNames` | — | Component slots |

### `AvatarClassNames`

`root`, `image`, `fallback`, `group`, `groupItem`, `glossWrap`.

## Variant / sizes

### Variant

| Variant | Surface |
|---------|---------|
| `default` | `rounded-full bg-surface border-token` |
| `gloss` | `gloss-wrap` + `gloss-panel` + `gloss-shadow` |

### Sizes

`small`, `base`, `mid`, `large` map to `avatar-size-*` classes. These tokens set the size of root, image, and fallback.

Fallback typography:

| Size | Text variant |
|------|--------------|
| `small` | `small` |
| `base` | `base` |
| `mid` | `mid` |
| `large` | `header-2` |

## Animations

`avatarAnimations.ts`.

**DOM (default):**

```
<div role="group" aria-label=label>
  <img ref=imgRef />
  <span fallback />
</div>
```

**DOM (gloss):**

```
<div glossWrap>
  <div gloss-shadow aria-hidden />
  <div role="group" gloss-panel>
    image + fallback
  </div>
</div>
```

### 1. Image fade

`useAvatarImageFade(visible, imgRef)`:

1. `Avatar.Image` holds `imageStatus`: `idle` → `loaded` or `error`
2. On `loaded`: `gsap.to(img, { autoAlpha: 1, ...motionContentFade() })`
3. On fallback/error: `autoAlpha: 0`
4. Reduced motion or `enableContentFade: false`: instant `gsap.set`

#### Fade customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  tooltipDuration: 180,
  interactiveEase: "power2.out",
  enableContentFade: true,
});
```

### 2. AvatarGroup lift

Each item in `AvatarGroup` gets a wrapper:

```
<div style={{ transformOrigin: "center bottom" }}>
  <Avatar />
</div>
```

Hover:

- `y: -10`
- `scale: 1.08`
- duration/ease from `motionInteractive()`

Reduced motion: transform is applied instantly.

### What's not included

- Press squeeze on avatar
- Hover lift on a single avatar (group stack only)
- Ripple
- Portal motion (except auto Tooltip via `nickname`)

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Image fade in | `useAvatarImageFade` | `tooltipDuration`, `interactiveEase`, `enableContentFade` | `src` load state |
| Group hover lift | GSAP in group wrapper | `interactiveDuration`, `interactiveEase` | `AvatarGroup` |
| Gloss depth | CSS `gloss-panel` | — | `variant="gloss"` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `AVATAR_ROOT_CLASS` | Circle, `overflow-hidden`, size per prop |
| `AVATAR_FALLBACK_CLASS` | Initials / placeholder bg |
| `AVATAR_IMAGE_CLASS` | `object-cover`, starts at `opacity-0` until fade |
| gloss wrap layers | Outer ring/shadow in `variant="gloss"` |
| `groupItem` negative margin | Stack overlap in `AvatarGroup` |

## Styling and customization

### Two levels

1. **`className` on `Avatar`** — root shell. In `variant="gloss"` it applies to the inner circle.
2. **`classNames` on root** — root/image/fallback slots; `AvatarGroup` — `group`/`groupItem`.

### `AvatarClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | Avatar circle | Ring, border, fallback color |
| `image` | `img` | Object-fit, filters, opacity helpers |
| `fallback` | Fallback span | Initials bg/text |
| `group` | `AvatarGroup` root | Gap, justify stack |
| `groupItem` | Group item wrapper | Overlap margin, lift target |
| `glossWrap` | Outer gloss wrapper | Ring/padding around gloss circle |

### Simple (src + label)

```tsx
<Avatar
  variant="gloss"
  size="mid"
  label="Andrey"
  src={avatarUrl}
  alt=""
  classNames={{
    root: "border border-info/40",
    glossWrap: "p-0.5 ring-1 ring-info/30 rounded-full",
  }}
/>
```

### Compound (custom fallback)

```tsx
<Avatar
  size="base"
  label="Design System"
  classNames={{
    root: "bg-primary/10 text-primary",
    fallback: "bg-primary/15",
  }}
>
  <Avatar.Fallback>DS</Avatar.Fallback>
</Avatar>
```

### Group stack

```tsx
<AvatarGroup
  classNames={{
    group: "justify-center",
    groupItem: "-ml-small",
  }}
>
  <Avatar label="A" />
  <Avatar label="B" />
</AvatarGroup>
```

### Practical notes

- Decorative image: `alt=""`; name — via `label` → `aria-label`.
- `nickname` auto-wraps in `Tooltip` (portal motion from Tooltip.md).
- Gloss: `classNames.root` on inner circle, `glossWrap` on outer shell.
- **Do not use `overflow-visible` on root** — the image will escape the circle.
- **Do not set `opacity` on `image` in CSS** — conflicts with GSAP fade.

## Integrations

| Component | Usage |
|-----------|-------|
| `Tooltip` | Automatically when `nickname` is set |
| `Badge.Anchor` | Status/counter overlay on avatar |
| `AvatarGroup` | Stack + hover lift |

## Accessibility

- Root avatar: `role="group"`
- `aria-label` comes from trimmed `label`
- `AvatarGroup`: `role="group"`
- Fallback: `aria-hidden`
- Image `alt` defaults to `""`; root label provides the avatar name
- Tooltip trigger uses the same root

## File structure

```
Avatar/
├── Avatar.tsx
├── index.ts
├── avatarTypes.ts
├── avatarStyles.ts
├── avatarAnimations.ts
├── avatarContext.tsx
├── avatarParts.tsx
├── useAvatarRootState.ts
├── avatarAPI.ts
├── avatarA11y.ts
└── Avatar.stories.tsx
```

## Storybook

`Core Components/Avatar` — Simple/Compound, sizes, fallback, broken image, group lift, nickname tooltip, gloss, light theme, `classNames`.
