# Checkbox

Checkbox with `SelectionIndicator`, simple API (`label` / `hint` / `error` on root) and compound (`Control` / `Content` / `Label`). Integrates with `CheckboxGroup` and `Form`.

## Import

```tsx
import {
  Checkbox,
  type CheckboxProps,
  type CheckboxVariant,
  type CheckboxSize,
  type CheckboxClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
<Checkbox
  label="Consent to data processing"
  hint="Required for registration"
  defaultChecked
  name="consent"
  required
/>
```

Root renders as `<label>` with grid: control + text column.

### Compound API

```tsx
<Checkbox defaultChecked variant="outline" danger={hasError}>
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Content>
    <Checkbox.Label isRequired>Email newsletter</Checkbox.Label>
    <Checkbox.Hint>You can unsubscribe at any time</Checkbox.Hint>
    <Checkbox.Error>Consent is required</Checkbox.Error>
  </Checkbox.Content>
</Checkbox>
```

Compound → `<fieldset>` + grid; `Checkbox.Content` can render as a nested `<label htmlFor={inputId}>`.

### Root props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `secondary` \| `outline` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `checked` / `defaultChecked` | — | Controlled / uncontrolled |
| `onChange` | — | Native change event |
| `disabled` | `false` | + opacity track animation |
| `danger` | `false` | Red label text (or from Form error) |
| `checkIcon` | — | Custom icon in indicator |
| `label` / `hint` / `error` | — | Simple API |
| `name` / `value` | — | Form / CheckboxGroup |
| `classNames` | — | see styling |

### `CheckboxClassNames`

`root`, `control`, `controlTrack`, `indicator`, `indicatorFill`, `indicatorMark`, `content`, `label`, `labelText`, `requiredMark`, `hint`, `error`, `simpleLabelWrap`, `simpleLabelText`, `input`.

### Compound subparts

| Part | Role |
|------|------|
| `Checkbox.Control` | Cell + hidden/overlay input + indicator |
| `Checkbox.Indicator` | `SelectionIndicator` (`.Fill`, `.Mark`) |
| `Checkbox.Content` | Label column / wrapper |
| `Checkbox.Label` | Text + required `*` |
| `Checkbox.Hint` / `Error` | Secondary grid rows |

## variant

| variant | Indicator style |
|---------|-----------------|
| `default` | Filled primary tint |
| `secondary` | Secondary surface |
| `outline` | Border ring |
| `gloss` | Gloss indicator shell |

Mapping: `checkboxVariantToIndicator()` → `SelectionIndicator` variant.

## Sizes

`CHECKBOX_SIZE_LAYOUT`: grid gap, title/desc text variants, indicator size per `size`.

## Animations

`checkboxAnimations.ts` + `SelectionIndicator` + `usePressableElementTextMotion`.

**DOM (simple):**

```
<label root onPointerDown>
  <Checkbox.Control>
    <span controlTrack ref=trackRef>   ← opacity anim
      <input type=checkbox />
      <SelectionIndicator />
    </span>
  </Checkbox.Control>
  <span simpleLabelWrap ref=textMotionRef>  ← squeeze target
    label + hint + error
  </span>
</label>
```

### 1. Control track opacity (disabled)

`useCheckboxControlTrackAnimation`:

- On `isDisabled` change: GSAP `autoAlpha` → `0.48` disabled / `1` enabled
- First layout: instant set without anim
- Reduced motion: instant opacity, kill GSAP

### 2. Label text press squeeze

`useCheckboxTextMotion` → `usePressableElementTextMotion`:

- **enabled:** simple always (on label root); compound — if `useInlineCompoundMotion` (no external label wrap)
- **hoverLift: false** — squeeze only on `textMotionRef`
- `onPointerDown` on root `<label>` / `<fieldset>`

### 3. Check indicator

`Checkbox.Indicator` → `SelectionIndicator` + `useSelectionIndicatorAnimation`:

- checked: fill + check mark scale in
- unchecked: scale out
- `motionInteractive()` duration/ease

### Summary

| Animation | Utility | `configureMotion` |
|-----------|---------|-------------------|
| Track fade disabled | `useCheckboxControlTrackAnimation` | `interactiveDuration` |
| Label squeeze | `usePressableElementTextMotion` | `pressSqueezeScale` |
| Check mark | `useSelectionIndicatorAnimation` | `selectionFillDuration` |

## Styling and customization

### Two levels

1. **`className` on root** — grid layout on `<label>` / `<fieldset>` (merged with `classNames.root`).
2. **`classNames`** — `CheckboxClassNamesProvider`.

Subparts accept **`className`**; `Checkbox.Indicator` — nested `classNames` for fill/mark.

### `CheckboxClassNames` slots

| Slot | DOM | Purpose |
|------|-----|---------|
| `root` | `<label>` / `<fieldset>` | Grid gap, padding, card border |
| `control` | Control cell | Alignment |
| `controlTrack` | Track span | Border ring around input |
| `indicator` | SelectionIndicator shell | Size, rounded |
| `indicatorFill` | Fill layer | Checked background |
| `indicatorMark` | Check icon | Color |
| `content` | Content column | Gap label/hint/error |
| `label` | Label span | Cell typography wrapper |
| `labelText` | `Text` in label | Font, danger color |
| `requiredMark` | `*` | Asterisk color |
| `hint` / `error` | Field hint/error | Secondary lines |
| `simpleLabelWrap` | Simple text column | Wrapper label+hint |
| `simpleLabelText` | Simple primary text | Simple API caption |
| `input` | Hidden/overlay input | Rare — positioning |

### Simple API

```tsx
<Checkbox
  defaultChecked
  label="Email newsletter"
  hint="classNames.label and labelText in simple API."
  className="max-w-md"
  classNames={{
    root: "rounded-mid border border-primary/20 p-base",
    controlTrack: "border-primary/40",
    label: "text-primary",
    labelText: "font-semibold underline decoration-primary/30",
    hint: "text-muted/80",
  }}
/>
```

### Compound API

```tsx
<Checkbox
  defaultChecked
  variant="outline"
  classNames={{
    root: "rounded-large border-primary/40 bg-primary/5 p-mid shadow-token-md",
    control: "ring-primary/30",
    controlTrack: "border-primary/50",
    indicator: "rounded-mid",
    indicatorFill: "rounded-[inherit]",
    labelText: "text-primary font-semibold",
    hint: "text-foreground/80",
  }}
>
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Content>
    <Checkbox.Label>Newsletter consent</Checkbox.Label>
    <Checkbox.Hint>All slots via classNames.</Checkbox.Hint>
  </Checkbox.Content>
</Checkbox>
```

`Checkbox.Indicator classNames={{ indicatorMark: "text-primary" }}` merges with root `classNames`.

### Practical notes

- **Simple vs compound root:** simple — `<label>`; compound — `<fieldset>` (a11y group).
- **danger:** colors `labelText`; Form error auto-enables danger.
- **CheckboxGroup:** `value` + single selection mode; styles on each `Checkbox` separately.
- **Do not break grid:** `root` sets `checkboxGridClass` — be careful with `display` override.
- **Merge order:** base → `classNames.slot` → subpart `className`.

## Integration

| Context | Behavior |
|---------|----------|
| `Form` | `name`, `checked`, `error` → danger |
| `CheckboxGroup` | single/multi selection, `disabled`, `isRequired` |

## Accessibility

- Native `<input type="checkbox">` — focus, Space toggle
- `aria-describedby` hint/error; `aria-labelledby` / `aria-label`
- `aria-invalid` on danger + error
- Compound fieldset: `aria-labelledby` from `Checkbox.Label`

## File structure

```
Checkbox/
├── Checkbox.tsx
├── index.ts
├── checkboxTypes.ts
├── checkboxStyles.ts
├── checkboxAnimations.ts    # track opacity + text motion
├── checkboxParts.tsx
├── useCheckboxRootState.ts
├── checkboxAPI.ts
├── checkboxA11y.ts
└── Checkbox.stories.tsx
```

## Storybook

`Core Components/Checkbox` — simple/compound, variants, sizes, gloss, CheckboxGroup, `classNames`, danger.
