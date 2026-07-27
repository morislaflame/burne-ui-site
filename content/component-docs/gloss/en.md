# Gloss

Glass surface system (glass morphism) in Burne UI. Gloss is **not a separate component** — it is a **visual mode** (`variant="gloss"` or related props) that enables CSS classes `gloss-panel`, `gloss-btn`, `gloss-indicator`, and GSAP motion for interactive elements.

## Setup

```tsx
import "burne-ui/styles.css";
```

Gloss tokens and utilities ship with the main package styles (`glossPanel.css`, `glossInteractive.css`).

## How to enable

### `variant="gloss"`

On components with a `variant` prop:

```tsx
<Button variant="gloss">Save</Button>
<Input variant="gloss" label="Email" />
<Card variant="gloss">...</Card>
<Dialog variant="gloss">...</Dialog>
<Alert variant="gloss" status="info" title="Hint" />
```

### Other APIs

| Component | Prop | Value |
|-----------|------|-------|
| `Tooltip` | `surface` | `"gloss"` |
| `Slider` | `gloss` | `true` |
| `Switch` | `gloss` | `true` |
| `SelectionIndicator` | `variant` | `"gloss"` |

## Supported components

Gloss is available on most interactive and container primitives:

**Actions:** `Button`, `CloseButton`, `ToggleButton`, `ToggleButtonGroup`, `ButtonGroup`, `Kbd`

**Forms:** `Input`, `TextArea`, `Select`, `ComboBox`, `SearchInput`, `TimeField`, `Checkbox`, `Switch`, `Radio` / `RadioGroup`, `Slider`, `ColorPicker`, `SelectionIndicator`, `Calendar`

**Feedback:** `Badge`, `Alert`, `Toast`

**Overlays:** `Tooltip`, `Popover`, `Dropdown`, `Dialog`, `Drawer`, `AlertDialog`

**Data display:** `Card`, `Table`, `Surface`, `Avatar`, `ListBox`

**Disclosure:** `Expandable`, `Disclosure`, `Accordion`

The **Gloss** showcase page groups a matrix of components with a unified glass language.

## CSS classes

| Class | Purpose |
|-------|---------|
| `gloss-panel` | Static glass panel (Card, Surface, ListBox root) |
| `gloss-deep` | Stronger depth / conic stroke |
| `gloss-btn` | Interactive button shell |
| `gloss-control` | Input shell without visible border |
| `gloss-indicator` | Selection indicator / checkbox shell |
| `gloss-wrap` | Stacking context for shadow bloom |
| `gloss-shadow` | Soft shadow around gloss container |

Status tints on gloss buttons: `gloss-btn-danger`, `gloss-btn-success`, `gloss-btn-info`, `gloss-btn-warning`.

## Theme tokens

Transparency, stroke, and shine are controlled by CSS variables after `burne-ui/styles.css`:

| Token | Purpose |
|-------|---------|
| `--color-surface` | Base glass background |
| `--color-border` | Stroke / edge |
| `--gloss-tint-default` | Panel gradient tint |
| `--gloss-edge` | Conic stroke edge |
| `--gloss-blur` | `backdrop-filter` blur |
| `--gloss-drop-shadow` | Shadow under the panel |
| `--gloss-text` | Text color on gloss controls |

Override tokens in `:root` / `[data-theme]` for light and dark themes.

## Animations

Interactive gloss uses a **separate motion pipeline** (not shadow sm→md):

- `animateGlossInteractiveHoverLift` / `animateGlossInteractivePressSqueeze`
- `useGlossInteractiveHandlers` + `GLOSS_INTERACTIVE_MOTION_CLASS`
- Shine / conic via `@property` (`--gloss-angle-1`, `--gloss-shine-x`, …)

### `configureMotion`

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  hoverLiftScale: 1.025,
  pressSqueezeScale: [1, 0.98, 1],
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

Globally: `enableAnimations: false`. Per component (Badge/Alert/Kbd): `hoverLift={false}`.

**Reduced motion / touch:** via `shouldSkipInteractiveHoverLift()` — no scale/lift.

## Differences from default variants

| | default / outline / secondary | gloss |
|---|------------------------------|-------|
| Background | `bg-surface`, border tokens | gradient + backdrop blur |
| Hover shadow | `--shadow-sm` via `--el-shadow` | gloss box-shadow + shine |
| Press | adaptive squeeze on root | gloss squeeze curve |
| Status | semantic fill / outline | `gloss-btn-*` text tint |

## SSR and Next.js

For `backdrop-filter` on the site you may need a fallback in `globals.css` (see comment in `burne-ui-site/app/globals.css`):

```css
:is(.gloss-panel, .gloss-control, .gloss-btn, .gloss-indicator) {
  backdrop-filter: blur(var(--gloss-blur));
}
```

Tailwind v4 with `@source` sometimes keeps only `-webkit-backdrop-filter`.

## Practical notes

- Gloss does **not** replace `status` — semantics stay via the `status` prop and `gloss-btn-*` classes.
- Do not override `gloss-deep` / conic gradient without need — depth is tied to CSS.
- Nested gloss panels: watch `isolation` and z-index (`gloss-wrap`).
- Fields inside `ButtonGroup` / `Form` inherit gloss `variant` from group context.

## Storybook

Gloss demos live in component stories (`*Gloss*` stories) and the combined **Theme / Gloss** page on the showcase site.
