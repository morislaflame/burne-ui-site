# TimeField

Time input field with segments (hours / minutes / seconds). **Dual API:** simple props (`label`, `hint`, `error`) on root or compound `Label` / `Control` / `Hint` / `Error`. Shell motion like `Input` / `Field`.

## Import

```tsx
import {
  TimeField,
  TimeField.Control,
  TimeField.Hint,
  TimeField.Error,
  type TimeFieldRootProps,
  type TimeFieldControlProps,
  type TimeFieldSize,
  type TimeFieldStatus,
  type TimeFieldVariant,
  type TimeFieldFormat,
  type TimeFieldClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
<TimeField
  label="Start time"
  hint="24-hour format"
  value={time}
  onValueChange={setTime}
  format="HH:mm"
  prefix={<IoTimeOutline aria-hidden />}
/>
```

### Compound API

```tsx
<TimeField value={time} onValueChange={setTime} variant="segmented">
  <TimeField.Label>Time</TimeField.Label>
  <TimeField.Control prefix={<IoTimeOutline aria-hidden />} />
  <TimeField.Hint>24-hour format</TimeField.Hint>
  <TimeField.Error>Invalid time</TimeField.Error>
</TimeField>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `label` / `hint` / `error` | — | Simple API slots |
| `value` / `defaultValue` | `"00:00"` | `"HH:mm"` or `"HH:mm:ss"` |
| `onValueChange` | — | `(value: string) => void` |
| `format` | `HH:mm` | `HH:mm` \| `HH:mm:ss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `variant` | `default` | `default` \| `outline` \| `segmented` \| `gloss` |
| `status` | `default` | `default` \| `danger` \| `success` \| `warning` |
| `disabled` | `false` | Disables control |
| `compact` | `false` | `w-fit` instead of `w-full` |
| `required` | `false` | `aria-required` on segments |
| `prefix` / `suffix` | — | Affix slots in control |
| `id` | auto | Links label/control |
| `className` | — | On root |
| `classNames` | — | Slots |

### `TimeFieldClassNames`

`root`, `label`, `shell`, `prefix`, `suffix`, `segments`, `segment`, `segmentSeparator`, `keyboardInput`, `hint`, `error`.

## variant / status / sizes

| variant | Shell |
|---------|-------|
| `default` | `bg-surface border-token` |
| `outline` | `bg-transparent border-token` |
| `segmented` | Segment cells with separators |
| `gloss` | `gloss-control` + gloss shell motion |

| status | Effect |
|--------|--------|
| `default` | Standard surface |
| `danger` / `success` / `info` / `warning` | neutral surface/border + permanent status ring |

| size | Shell height | Segment text |
|------|--------------|--------------|
| `small` … `large` | `TIME_FIELD_SHELL_H` + `CONTROL_SIZE_LAYOUT` | mono `tabular-nums` |

| format | Segments |
|--------|----------|
| `HH:mm` | hours, minutes |
| `HH:mm:ss` | + seconds |

## Animations

`timeFieldAnimations.ts` → `useTimeFieldShellMotion`. Segments — no GSAP.

**DOM:**

```
<Field root>
  <Label />
  <fieldset class=shell ref=shellRef>     ← hover lift / squeeze / gloss
    <span class=prefix />
    <div class=segments>
      <span role=spinbutton class=segment>  ← focus: bg-primary
      <span class=segmentSeparator aria-hidden>:</span>
    <input class=keyboardInput aria-hidden />  <!-- iOS keyboard -->
    <span class=suffix />
  <Hint /> <Error role=alert />
```

### 1. Shell motion (`useTimeFieldShellMotion`)

| variant | Behavior |
|---------|----------|
| `gloss` | `useGlossFieldShellMotion` — gloss scale/surface |
| others | `useFieldShellHoverLift` + `animateInteractivePressSqueeze` on `pointerdown` |

Shared with `Input` / `TextArea` field shell utils.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.02,
  pressSqueezeScale: [1, 0.99, 1],
  enableHoverLift: true,
});
```

**Reduced motion:** `prefersReducedMotion()` — no squeeze.

### 2. Segment focus

React state — `bg-primary text-primary-foreground` on focused segment. No GSAP.

### What's not included

- Portal / popover
- Built-in ripple
- Digit change animation (instant value update)
- Second-level persistent shadow

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|--------------------------|------------|
| Shell hover lift | `useFieldShellHoverLift` | `hoverLiftScale`, `enableHoverLift` | `variant`, `disabled` |
| Shell press squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale` | `disabled` |
| Gloss shell | `useGlossFieldShellMotion` | gloss tokens | `variant="gloss"` |
| Segment focus | CSS | — | keyboard focus |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `TIME_FIELD_SHELL_H` | Height per size |
| `FIELD_SHELL_FOCUS_CLASS` | Focus ring on fieldset |
| `FIELD_SHELL_TRANSITION_CLASS` | Shadow transition |
| `fieldShellHoverClass` | Hover shadow (not at rest) |
| `font-mono tabular-nums` | Segment typography |
| Focus segment | `bg-primary text-primary-foreground` |
| Disabled | `opacity-55 shadow-token-sm` |

## Styling and customization

### Two levels

1. **`className` on `TimeField`** — root layout.
2. **`classNames` on root** — label, shell, segments, hint, error.

`TimeField.Control` accepts `className` on the fieldset shell.

### `TimeFieldClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | Field root | Gap label/control |
| `label` | Label | Typography |
| `shell` | `<fieldset>` | Border tint, radius |
| `prefix` / `suffix` | Affix spans | Icon slots |
| `segments` | Segments row | Gap, alignment |
| `segment` | Spinbutton span | Cell padding |
| `segmentSeparator` | `:` span | Muted separator |
| `keyboardInput` | Hidden input | iOS font-size hack |
| `hint` / `error` | FieldHint/Error | Status colors |

### Segmented + affixes

```tsx
<TimeField
  variant="segmented"
  format="HH:mm:ss"
  status="success"
  classNames={{
    root: "border-success/30",
    segment: "rounded-small",
    prefix: "text-success",
    hint: "text-success/80",
  }}
  prefix={<IoTimeOutline aria-hidden />}
  value={time}
  onValueChange={setTime}
/>
```

### Validation compound

```tsx
<TimeField status="danger" classNames={{ root: "border-danger/40", error: "text-danger" }}>
  <TimeField.Label>Deadline time</TimeField.Label>
  <TimeField.Control />
  <TimeField.Error>Enter a time in the future</TimeField.Error>
</TimeField>
```

### Practical notes

- Value is always a string `"HH:mm"` / `"HH:mm:ss"` with zero-padding.
- Keyboard: ArrowUp/Down, PageUp/Down, digits, Tab between segments.
- `compact` — inline time in toolbar/forms.
- `segmented` — separate cells; `outline` — transparent shell.
- **Do not set `transform` on shell** with gloss/default motion.
- Hidden `keyboardInput` — for mobile keyboard (`field-control-mobile-no-zoom`, ≥16px on touch).

## Integrations

| Component | Scenario |
|-----------|----------|
| `Field` / `Label` | Shared field layout |
| `Input` | Shared shell hover/squeeze |
| `Calendar` | Date+time forms (separate fields) |

## Accessibility

- Shell: `aria-label="Time"` or `aria-labelledby`
- Segments: `role="spinbutton"`, `aria-valuemin/max/now/text`
- `aria-required`, `aria-invalid` when `status="danger"`
- Separators: `aria-hidden`
- Hidden input: `aria-hidden`, `tabIndex={-1}`
- Error: `role="alert"` via `FieldError`
- `aria-describedby` — hint + error ids

## File structure

```
TimeField/
├── TimeField.tsx
├── index.ts
├── timeFieldTypes.ts
├── timeFieldStyles.ts
├── timeFieldAnimations.ts
├── timeFieldParts.tsx
├── timeFieldContext.tsx
├── timeFieldAPI.ts
├── timeFieldA11y.ts
├── useTimeFieldRootState.ts
├── useTimeFieldControlState.ts
└── TimeField.stories.tsx
```

## Storybook

`Core Components/TimeField` — dual API, segmented, outline, affixes, compact, seconds, validation, statuses, sizes, variants, disabled, `CustomClassNames`.
