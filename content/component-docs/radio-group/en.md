# RadioGroup

Radio button group in a native `<fieldset>`: compound API with `Legend`, `Label`, `Hint`, `Error`, `List`. One selected `value`; clicking the selected option again clears the selection (unless `required`).

## Import

```tsx
import {
  RadioGroup,
  type RadioGroupProps,
  type RadioGroupOrientation,
  type RadioGroupHintProps,
  type RadioGroupErrorProps,
  type RadioGroupLabelProps,
  type RadioGroupLegendProps,
  type RadioGroupListProps,
} from "burne-ui";
import { Radio } from "burne-ui";
```

## API

### Compound API

```tsx
<RadioGroup defaultValue="card" name="payment" size="base">
  <RadioGroup.Legend>
    <RadioGroup.Label>Payment method</RadioGroup.Label>
    <RadioGroup.Hint>Only one option can be selected.</RadioGroup.Hint>
  </RadioGroup.Legend>
  <RadioGroup.List>
    <Radio value="card" label="Bank card" />
    <Radio value="cash" label="Cash" />
    <Radio value="invoice" label="Invoice for legal entity" />
  </RadioGroup.List>
</RadioGroup>
```

### Controlled

```tsx
const [payment, setPayment] = useState<string | undefined>("card");

<RadioGroup value={payment} onValueChange={setPayment} name="payment">
  ...
</RadioGroup>
```

No Simple API.

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | — | Controlled: `string \| null` |
| `defaultValue` | — | Uncontrolled initial |
| `onValueChange` | — | `(value: string \| undefined) => void` |
| `name` | auto `radio-group-{id}` | Shared `name` for all `Radio` |
| `required` | `false` | Required mark; native `required` on the first radio |
| `size` | `small` | `small` \| `base` \| `mid` \| `large` |
| `disabled` | `false` | On fieldset + context → `Radio` |
| `hintId` / `errorId` | auto | For `aria-describedby` |
| `className` | — | On `<fieldset>` |

No `variant`, `status`, or `classNames` on root.

### Compound parts

| Part | DOM | Purpose |
|------|-----|---------|
| `RadioGroup` | `<fieldset>` | Root |
| `RadioGroup.Legend` | `<legend>` | Accessible name |
| `RadioGroup.Label` | core `Label` | Title in legend |
| `RadioGroup.Hint` | `FieldHint` | Hint |
| `RadioGroup.Error` | `FieldError` | Error (`role="alert"`) |
| `RadioGroup.List` | `<div>` | Option list; `orientation` |
| `RadioGroup.Group` | wrapper | List + error grouping |
| `RadioGroup.Actions` | actions row | Rarely |

Child options are **`Radio`** from core.

### `RadioGroup.List` props

| Prop | Default | Description |
|------|---------|-------------|
| `orientation` | `vertical` | `vertical` \| `horizontal` |
| `className` | — | On list container |

## size and orientation

| `size` | Effect |
|--------|--------|
| `small` … `large` | Legend/stack gaps via `FIELD_SET_SIZE_LAYOUT` |

| `orientation` | Layout |
|---------------|--------|
| `vertical` | `flex flex-col gap-plus` |
| `horizontal` | `flex flex-row flex-wrap gap-x-mid gap-y-plus` |

Option visuals via `Radio` (`variant`, `danger` on individual option).

## Animations

`RadioGroup` has **no own** animations. Motion is delegated to `Radio`:

**DOM:**

```
<fieldset aria-describedby=hint error>
  <legend><Label /><Hint /></legend>
  <div class=list>
    <Radio>
      <input type=radio />
      <SelectionIndicator dot />     ← GSAP fill
      <Text ref=textMotion />        ← press squeeze
```

### 1. Dot indicator fill

`SelectionIndicator` (dot) — GSAP when `checked`.

### 2. Text press motion

`useRadioTextMotion` on label text.

### 3. Track fade

`useRadioControlTrackAnimation` when `disabled`.

#### Customization (on Radio)

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  pressSqueezeScale: [1, 0.98, 1],
  interactiveDuration: 280,
});
```

### What's not included

- Group-level animation on `value` change
- Portal motion
- Hover lift on fieldset

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Dot fill | `SelectionIndicator` | selection fill tokens | `checked` |
| Text squeeze | `useRadioTextMotion` | `pressSqueezeScale` | `disabled` |
| Track fade | radio animations | `interactiveDuration` | `disabled` |

## Tokens and CSS

No separate `radioGroupStyles.ts` — shared utils:

| Source | Purpose |
|--------|---------|
| `optionGroupFieldset.tsx` | `FIELD_SET_CLASS`, legend header |
| `optionGroupLayout.ts` | `OPTION_GROUP_ORIENTATION_LAYOUT` |
| `fieldStyles.ts` | `FIELD_SET_SIZE_LAYOUT` per size |
| `Radio` | Visual of each option |

## Styling and customization

### Single level — `className` per-part

**No `classNames`** on RadioGroup root.

| Part | Customization |
|------|---------------|
| root | `RadioGroup className` |
| legend / list / hint / error | `className` on sub-part |
| option | `Radio className` / `classNames` |

### With descriptions (compound Radio)

```tsx
<RadioGroup defaultValue="standard">
  <RadioGroup.Legend>
    <RadioGroup.Label>Plan</RadioGroup.Label>
  </RadioGroup.Legend>
  <RadioGroup.List>
    <Radio value="standard" label="Standard" description="Basic set" />
    <Radio value="pro" label="Pro" description="Extended limits" />
  </RadioGroup.List>
</RadioGroup>
```

### With error

```tsx
<RadioGroup required>
  <RadioGroup.Legend>
    <RadioGroup.Label>Payment method</RadioGroup.Label>
  </RadioGroup.Legend>
  <RadioGroup.List>
    <Radio value="card" label="Card" />
  </RadioGroup.List>
  <RadioGroup.Error>Select a payment method</RadioGroup.Error>
</RadioGroup>
```

### Practical notes

- Legend pattern: `Legend` → `Label` + optional `Hint`.
- `name` on root is shared for all `Radio` (auto-generated if not set).
- `required` — `selectValue(undefined)` is blocked; required anchor on first radio.
- When `required={false}`, clicking again deselects.
- Compared to `CheckboxGroup selection="single"`: native radio semantics + arrow keys.
- Option styles via `Radio`, not via the group.

## Integrations

| Component | Scenario |
|-----------|----------|
| `Radio` | Options in `List`; `useOptionalRadioGroupContext` |
| `Label` / `FieldHint` / `FieldError` | Legend/Hint/Error parts |
| `Form` | Controlled `value`/`onValueChange` or custom binding |
| `CheckboxGroup` | Alternative single via checkbox UI |

Shared: `composite/utils/optionGroupFieldset.tsx`, `optionGroupLayout.ts`.

## Accessibility

- Root: native `<fieldset>` + `aria-describedby`
- `Legend`: native `<legend>`
- `Radio`: native `<input type="radio">`, arrow keys in group
- `Error`: `role="alert"`
- `required`: native `required` on first radio (`claimRequiredAnchor`)

## File structure

```
RadioGroup/
├── RadioGroup.tsx
├── index.ts
├── radioGroupTypes.ts
├── radioGroupParts.tsx
├── radioGroupContext.tsx
├── useRadioGroupRootState.ts
└── RadioGroup.stories.tsx
```

## Storybook

`Composite Components/RadioGroup` — playground, card layout, horizontal, descriptions, required, error, controlled, sizes, accessibility.
