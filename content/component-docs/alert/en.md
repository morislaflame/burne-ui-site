# Alert

Notification banner with semantic statuses, grid layout, and hover-lift (**second-level component** — shadow at rest and stronger shadow on hover). Simple and compound API.

## Import

```tsx
import {
  Alert,
  resolveAlertStatus,
  resolveAlertVariant,
  resolveAlertLiveRole,
  type AlertProps,
  type AlertVariant,
  type AlertStatus,
  type AlertLiveRole,
  type AlertClassNames,
} from "burne-ui";
```

## API

### Root props (`Alert`)

| Prop | Type | Default | Description |
|------|-----|--------------|----------|
| `variant` | `default` \| `outline` \| `secondary` \| `gloss` | `default` | Visual style |
| `status` | `default` \| `danger` \| `success` \| `info` \| `warning` | `default` | Semantic tone |
| `size` | `small` \| `base` \| `mid` \| `large` | `base` | Padding, icon, type and **radius** (`CONTROL_SIZE_LAYOUT.rounded`) |
| `role` | `status` \| `alert` | auto | Live region; danger/warning → `alert` |
| `title` | `ReactNode` | — | Simple API |
| `description` | `ReactNode` | — | Simple API |
| `icon` | `ReactNode` \| `null` | auto | Simple: icon; `null` hides the indicator |
| `action` | `ReactNode` | — | Simple: right slot |
| `hoverLift` | `boolean` | `true` | Shadow sm→md and lift on hover |
| `className` | `string` | — | Additional classes on root |
| `classNames` | `AlertClassNames` | — | Subpart slots |

### Compound subparts

| Part | Purpose |
|-------|------------|
| `Alert.Indicator` | Left icon; `status` prop overrides context |
| `Alert.Message` | Wrapper (`display: contents`) for grouping |
| `Alert.Content` | Title + description group |
| `Alert.Title` | Heading (`font-medium`, `Text` base) |
| `Alert.Description` | Body text (`text-muted`, `Text` small) |
| `Alert.Action` | Right action slot |

### `AlertClassNames`

```tsx
type AlertClassNames = {
  root?: string;
  indicator?: string;
  message?: string;
  content?: string;
  title?: string;
  description?: string;
  action?: string;
};
```

### Simple API

```tsx
<Alert
  status="success"
  title="Saved"
  description="Changes applied."
  action={<Button size="small" variant="ghost">Undo</Button>}
/>
```

### Compound API

```tsx
<Alert status="danger" variant="outline">
  <Alert.Indicator />
  <Alert.Title>Error</Alert.Title>
  <Alert.Description>Failed to load data.</Alert.Description>
  <Alert.Action>
    <Button size="small">Retry</Button>
  </Alert.Action>
</Alert>
```

Compound mode activates automatically when slots are present (`Alert.Message`, `Alert.Title`, …).

## variant and status

| variant | default status | status ≠ default |
|---------|----------------|------------------|
| `default` | `bg-surface border-token` | same surface; status on indicator and title |
| `outline` | transparent + `border-token` | same surface; status on indicator and title |
| `secondary` | `bg-secondary` | same surface; status on indicator and title |
| `gloss` | `gloss-panel border-0` | same surface; status on indicator and title |

### Default indicator

| Condition | Icon |
|---------|--------|
| `status` danger/success/info/warning | `SEMANTIC_STATUS_ICONS[status]` (Io5) |
| `variant="outline"`, status default | `IoHelpCircleOutline` |
| otherwise | hidden (unless `icon` is passed) |

`icon={null}` or `<Alert.Indicator>{null}</Alert.Indicator>` — no indicator.

## Animations

**Second-level component** — shadow at rest (`sm`), stronger on hover (`md`). Logic: `alertAnimations.ts` → `useSecondLevelShadow` or gloss handlers.

**DOM structure:**

```
<div ref=root>              ← motion target, pointer over/out
  grid: indicator | title | description | action
```

No collapse, portal, or ripple. Only hover lift on the root.

### 1. Hover lift — default / outline / secondary (`hoverLift={true}`)

`useSecondLevelShadow(rootRef, liftEnabled && !isGloss)`:

**Init (mount):** `initElementShadow(el, shadowSm())` — rest state `--el-shadow: var(--shadow-sm)`.

**Pointer enter:**

1. `animateInteractiveHoverLift(el, true, undefined, secondLevelShadow())`
2. Scale: adaptive lift (~1.8px cap, `hoverLiftScale`)
3. Shadow: `idle sm` → `hover md` via CSS variable `--el-shadow`

**Pointer leave:** back to `sm`, scale `1`.

Root class: `animate-shadow will-change-transform origin-center` (`SHADOW_LIFT_MOTION_CLASS`).

**Difference from Button (1st level):** Alert **always** has a shadow at rest; Button — only on hover.

#### Customizing hover lift

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.025,
  hoverLiftEase: "sine.inOut",
  interactiveDuration: 280,   // lift duration
  enableHoverLift: true,
});
```

**Locally:** `hoverLift={false}` — no handlers and no `motionClass`.

**Reduced motion / touch:** `shouldSkipInteractiveHoverLift()` — shadow stays `sm`, no scale.

### 2. Gloss variant (`variant="gloss"`)

Instead of `useSecondLevelShadow`:

- `createGlossInteractiveRefCallback(rootRef, liftEnabled && isGloss)`
- `useGlossInteractiveHandlers` on `onPointerOver` / `onPointerOut`
- Class: `GLOSS_INTERACTIVE_MOTION_CLASS` + `glossInteractive.css`

Gloss lift uses a separate curve (`glossInteractiveMotion`), not sm→md shadow.

### 3. What is not included

- Press squeeze on click (Alert is not pressable)
- Enter/leave on mount
- Ripple (can be added manually as a child + `relative overflow-hidden`)

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|----------|---------|---------------------------|----------------|
| Shadow sm→md + lift | `useSecondLevelShadow` | `hoverLiftScale`, `enableHoverLift`, `interactiveDuration` | `hoverLift` |
| Gloss hover | `useGlossInteractiveHandlers` | interactive tokens | `variant="gloss"` |
| Rest shadow | `initElementShadow` + `shadowSm()` | — | always when `hoverLift` |

## Grid layout

Root uses `messageBannerGridClass(gridSlots)`:

- `hasIndicator`, `hasTitle`, `hasDescription`, `hasAction`
- Slots are computed in `useAlertRootState` from props / compound children

Shell: `w-fit` + `max-w-component-*` + padding/radius from `MESSAGE_BANNER_SIZE` (radius = `CONTROL_SIZE_LAYOUT[size].rounded`, same as Button).

## Tokens and CSS

### Semantics

Surface always follows `variant` (like `AlertDialog`). Status colors the indicator and title (`SEMANTIC_STATUS_TEXT`).

### Shadows

- Rest: `shadow-token-sm` (via `--el-shadow`)
- Hover: `shadow-token-md`
- Motion class: `animate-shadow will-change-transform`

### Indicator

`[&_svg]:icon-mid`; color: `text-primary` (default) or semantic text.

## Styling and customization

### Two levels

1. **`className` on root** — additional classes on the root `role="alert"|"status"` (merged with `classNames.root`).
2. **`classNames` on root** — slots via `AlertClassNamesProvider`.

In compound API, each subpart (`Alert.Title`, `Alert.Message`, …) accepts **`className`**, merged on top of the context slot.

### `AlertClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------------|
| `root` | Root banner | Max-width, outer border, padding |
| `indicator` | `Alert.Indicator` | Status icon color/size |
| `message` | `Alert.Message` | Grid/flex layout of the message block |
| `content` | `Alert.Content` | Gap between title and description |
| `title` | `Alert.Title` | Title typography |
| `description` | `Alert.Description` | Subtitle, muted tone |
| `action` | `Alert.Action` | Right-aligned button |

`variant`, `status` set the surface and semantic colors. `hoverLift={false}` disables motion only, not styles.

### Simple API

```tsx
<Alert
  status="success"
  className="max-w-lg"
  classNames={{
    root: "rounded-large border-success/50 bg-success/10",
    title: "text-success font-semibold",
    description: "text-foreground/80",
    action: "self-center",
  }}
  title="Saved"
  description="Changes applied."
  action={<Button size="small">Undo</Button>}
/>
```

### Compound API

```tsx
<Alert
  status="success"
  classNames={{
    root: "max-w-lg rounded-large border-success/50 bg-success/10",
    message: "items-start",
    indicator: "text-success",
    content: "gap-xsmall",
    title: "text-success font-semibold",
    description: "text-foreground/80",
    action: "self-start",
  }}
>
  <Alert.Message>
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title className="tracking-tight">Profile updated</Alert.Title>
      <Alert.Description>All slots configured via classNames.</Alert.Description>
    </Alert.Content>
  </Alert.Message>
  <Alert.Action>
    <Button size="small">Open</Button>
  </Alert.Action>
</Alert>
```

You can reorder `Action`, wrap `Message` — slot styles persist from root `classNames`.

### Practical notes

- **Ripple:** for a press effect, wrap the root in `relative overflow-hidden` and add `<Ripple />` as the first child (see Ripple stories).
- **2nd level:** persistent `shadow-token-md` at rest; `hoverLift` strengthens to `md` on hover.
- **Merge order:** base styles → `classNames.slot` → subpart `className`.

## Accessibility

- `role`: `alert` for danger/warning; otherwise `status` (or explicit `role` prop).
- `aria-labelledby` / `aria-describedby` — auto from `titleId` / `descriptionId`.
- Exported helpers: `resolveAlertLiveRole`, `resolveAlertStatus`, `resolveAlertVariant`.

## Exported utilities

```tsx
resolveAlertVariant(variant?)   // → "default" | …
resolveAlertStatus(status?)     // → "default" | …
resolveAlertLiveRole(status, role?) // → "status" | "alert"
```

## File structure

```
Alert/
├── Alert.tsx
├── index.ts
├── alertTypes.ts
├── alertStyles.ts
├── alertAPI.ts
├── alertA11y.ts
├── alertContext.tsx
├── alertParts.tsx
├── alertSimpleContent.tsx
├── alertAnimations.ts
├── useAlertRootState.ts
└── Alert.stories.tsx
```

## Storybook

`Core Components/Alert` — variants × statuses, compound, gloss, hoverLift, `classNames` customization, light/dark theme.
