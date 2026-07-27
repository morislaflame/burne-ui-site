# Field

Form field layout: a single-field wrapper (`Field`) and grouping (`Field.Set`) with legend, hint, and error. **No built-in GSAP animations** — layout and a11y wiring only; motion lives in child controls (`Input`, `Checkbox`, …).

## Import

```tsx
import {
  Field,
  FieldSet,
  joinFieldDescribedBy,
  fieldHintId,
  fieldErrorId,
  useFieldSetHintId,
  useFieldSetErrorId,
  type FieldRootProps,
  type FieldSetProps,
  type FieldClassNames,
  type FieldSetClassNames,
  type FieldHintStatus,
  type FieldSetSize,
} from "burne-ui";
```

## API

### `Field` — single field

Compound via `Object.assign`:

| Part | Purpose |
|------|---------|
| `Field` / `Field` | Vertical stack: label → control → hint/error |
| `Field.Label` | Alias for `Label` |
| `Field.Hint` | Hint (`text-muted` or semantic) |
| `Field.Error` | Error (`status="danger"`, `role="alert"`) |

```tsx
<Field classNames={{ root: "max-w-sm" }}>
  <Field.Label htmlFor="email">Email</Field.Label>
  <Input>
    <Input.Control id="email" />
  </Input>
  <Field.Hint>We don't send spam</Field.Hint>
  <Field.Error>Invalid address</Field.Error>
</Field>
```

#### `Field` props

| Prop | Description |
|------|-------------|
| `className` | On root `div` |
| `classNames.root` | Root slot |
| `classNames.hint` | Hint slot |
| `classNames.error` | Error slot |

### `Field.Set` — field group

| Part | Purpose |
|------|---------|
| `Field.Set` | `<fieldset>` with auto-layout of children |
| `Field.Set.Legend` | `<legend>` |
| `Field.Set.LegendHeader` | Legend title wrapper |
| `Field.Set.Group` | Vertical group of controls |
| `Field.Set.Actions` | Buttons / actions on the right |

```tsx
<Field.Set size="base" disabled={isPending} classNames={{ stack: "gap-2xlarge" }}>
  <Field.Set.Legend>
    <Field.Set.LegendHeader>Contact details</Field.Set.LegendHeader>
  </Field.Set.Legend>
  <Field.Set.Group>
    <Field>…</Field>
    <Field>…</Field>
  </Field.Set.Group>
  <Field.Set.Actions>
    <Button type="submit">Save</Button>
  </Field.Set.Actions>
</Field.Set>
```

#### `Field.Set` props

| Prop | Default | Description |
|------|---------|-------------|
| `size` | `base` | `small` \| `base` \| `mid` \| `large` — spacing for stack/group/actions |
| `disabled` | — | On `<fieldset>` |
| `hintId` / `errorId` | auto | For `aria-describedby` on child controls |
| `classNames` | — | Slots: set, stack, legend, group, actions |

**Auto-layout:** `useFieldSetRootState` parses children — extracts `Legend`, collects `Group`, `Actions`, everything else into `loose`.

## Animations

`Field` / `Field.Set` **do not contain GSAP** — layout + a11y only. Motion is delegated to child controls.

**DOM structure:**

```
Field (div, gap-xsmall)
  Field.Label
  Input / Select / …     ← shell hover here
  Field.Hint / Field.Error

Field.Set (fieldset)
  Field.Set.Legend
  Field.Set.Group → Field × N
```

### 1. No animations in Field itself

No `useLayoutEffect` with GSAP, no hover handlers on `Field`. `Field.Error` appears instantly (no built-in transition).

### 2. Shell hover on child controls (2nd level)

`Input`, `TextArea`, `Select`, `ComboBox`, `TimeField` use **`useFieldShellHoverLift`** (`utils/useFieldShellHoverLift.ts`):

**On the field shell (shell ref):**

1. **Init:** `initElementShadow(shell, shadowSm())` — resting state `shadow-token-sm`
2. **Pointer enter on root:** `animateInteractiveHoverLift` — sm → md + adaptive scale
3. **Pointer leave:** back to sm, scale 1
4. Classes: `animate-shadow`, `field-shell-transition`, `focus-within-ring`

**Hover background:** `fieldShellHoverClass` — CSS `hoverVariantBg` by status (`danger-tint-hover`, …), not GSAP.

Field **does not pass** props to the control for motion — the control wires up the hook itself when `!disabled`.

#### Customizing shell hover (globally)

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.025,
  hoverLiftEase: "sine.inOut",
  interactiveDuration: 280,
  enableHoverLift: true,
});
```

**Locally on the control:** `disabled` / read-only — shell hover is usually `enabled: !disabled`.

**Reduced motion / touch:** `shouldSkipInteractiveHoverLift()` — shadow sm without lift.

### 3. Other controls inside Field.Set

| Control | Animation | Where to configure |
|---------|-----------|-------------------|
| `Checkbox` / `Radio` | selection indicator fill | `motionSelectionFill`, `enableToggleButtonFill` |
| `Switch` | thumb travel | `switchThumbDuration`, `switchThumbEase` |
| `Button` in `Field.Set.Actions` | 1st-level lift/squeeze | see Button.md |

`Field.Set` passes only `size` through context — not motion.

### 4. Custom hint/error animation

No built-in animation. Example via Tailwind:

```tsx
<Field.Error className="animate-in fade-in duration-200">
  Required field
</Field.Error>
```

### Summary: what is configured where

| Animation | Where it lives | `configureMotion` | Relation to Field |
|-----------|----------------|-------------------|-------------------|
| Shell hover sm→md | `useFieldShellHoverLift` | `enableHoverLift`, `hoverLiftScale` | Input shell and others |
| Shell hover bg | `fieldShellHoverClass` | — | CSS, variant hover |
| Checkbox/Radio fill | control | `selectionFillEase` | child in Field |
| Switch thumb | Switch | `switchThumbDuration` | child in Field |
| Hint/Error appear | — | — | manual CSS only |

## Sizes (`Field.Set`)

`FIELD_SET_SIZE_LAYOUT`:

| size | stack gap | group gap | actions gap | spacing after legend |
|------|-----------|-----------|-------------|----------------------|
| `small` | `gap-large` | `gap-base` | `gap-base` | `mt-large` |
| `base` | `gap-xlarge` | `gap-mid` | `gap-mid` | `mt-xlarge` |
| `mid` | `gap-2xlarge` | `gap-large` | `gap-large` | `mt-2xlarge` |
| `large` | `gap-2xlarge` | `gap-xlarge` | `gap-xlarge` | `mt-2xlarge` |

`Field` (single) — fixed `gap-xsmall` between label / control / hint.

## Tokens and CSS

| Element | Classes |
|---------|---------|
| Field root | `flex w-full flex-col gap-xsmall` |
| Fieldset | `m-0 min-w-0 border-0 p-0`, `disabled:opacity-55` |
| Hint default | `text-muted` |
| Hint danger/success/warning | `text-danger` / `text-success` / `text-warning` |
| Legend | `m-0 block w-full` |

## Accessibility

### Helpers

```tsx
import { joinFieldDescribedBy, fieldHintId, fieldErrorId } from "burne-ui";

const hintId = fieldHintId("my-field");
const errId = fieldErrorId("my-field");

<Input.Control
  aria-describedby={joinFieldDescribedBy(hintId, errId)}
/>
```

`joinFieldDescribedBy(...ids)` — joins non-empty ids with a space.

`useFieldSetHintId()` / `useFieldSetErrorId()` — auto-id for Set.

### Field.Error

Defaults to `role="alert"` — announces the error to screen readers.

### Field.Set

Native `<fieldset disabled>` blocks nested controls.

## Styling and customization

Field is a layout primitive: two independent slot sets for **`Field`** and **`Field.Set`**.

### `Field` (single-field wrapper)

#### Two levels

1. **`className` on root** — merged with `classNames.root`.
2. **`classNames`** — `root`, `hint`, `error` via `FieldClassNamesProvider`.

Used inside Input, TextArea, ComboBox and directly:

```tsx
<Field
  className="max-w-sm"
  classNames={{
    root: "rounded-mid border-token p-mid gap-small",
    hint: "text-xs text-muted",
    error: "font-medium",
  }}
>
  <Label htmlFor="x">Name</Label>
  <input id="x" className="…" />
  <Field.Hint>Hint</Field.Hint>
  <Field.Error>Error</Field.Error>
</Field>
```

| Slot | Element | Purpose |
|------|---------|---------|
| `root` | `Field` div | Gap, max-width, outer border |
| `hint` | `Field.Hint` | Hint text |
| `error` | `Field.Error` | Error text (`role="alert"`) |

`Field.Hint` / `Field.Error` accept their own **`className`** on top of the slot.

Input/TextArea/ComboBox forward `classNames.hint` / `classNames.error` to the same `Field.*` parts.

### `Field.Set` (field group)

#### Two levels

1. **`className` on `<fieldset>`** — merged with `classNames.set`.
2. **`classNames`** — `set`, `stack`, `legend`, `legendHeader`, `group`, `actions`.

```tsx
<Field.Set
  className="max-w-md"
  size="mid"
  classNames={{
    legend: "text-primary font-semibold",
    legendHeader: "gap-xsmall",
    stack: "gap-2xlarge",
    group: "gap-large",
    actions: "justify-start pt-small",
  }}
>
  <Field.Legend>
    <Field.LegendHeader>
      <Label>Contact details</Label>
      <Field.Hint as="span">Slots via classNames</Field.Hint>
    </Field.LegendHeader>
  </Field.Legend>
  <Field.Group>
    <Input>…</Input>
  </Field.Group>
  <Field.Actions>
    <Button type="button">Save</Button>
  </Field.Actions>
</Field.Set>
```

| Slot | Element | Purpose |
|------|---------|---------|
| `set` | `<fieldset>` | Root layout (`max-w-*`, gap, etc.) |
| `stack` | Inner stack | Vertical gap between legend/groups/actions |
| `legend` | `<legend>` | Group title |
| `legendHeader` | Wrapper inside legend | Label + hint on one line |
| `group` | `Field.Group` | Gap between fields |
| `actions` | `Field.Actions` | Buttons at the bottom of the group |

`Field.Legend`, `Field.Group`, `Field.Actions` — their own **`className`** on top of the slot.

#### Native `<fieldset>` limitation

`Field.Set` is semantic grouping, not a card-like container. With a native fieldset, `<legend>` renders **outside** the content box: `border` and `padding` on `set`/`className` **do not wrap the legend** and do not create a "card" around the entire group. Between the legend and content, the browser adds its own content-box spacing (plus `mt-*` on stack from `size`).

For a visual frame around legend + fields, wrap `Field.Set` in an outer `div`/`Card` with border and padding — keep the fieldset borderless inside.

### Practical notes

- **Set size:** `size` on `Field.Set` affects gap tokens — align with `Form` size.
- **Border on set:** do not use `border`/`p-*` on `set` if you expect the legend to be wrapped — see limitation above.
- **Do not confuse with Input:** `Field.classNames` does not style the input shell — only Field layout; shell styling is in `Input.classNames.shell`.
- **Merge order:** base → `classNames.slot` → subpart `className`.

## Form integration

`Form` passes `size`, `disabled`, `isSubmitting` through context — child `Input`/`Button` inherit. Set `Field.Set` size explicitly or align it with `Form` size.

## File structure

```
Field/
├── Field.tsx
├── fieldParts.tsx
├── fieldTypes.ts
├── fieldStyles.ts
├── fieldAPI.ts
├── fieldA11y.ts
├── fieldContext.tsx
├── useFieldSetRootState.ts
└── Field.stories.tsx
```

## Storybook

`Core Components/Field` — Field, Field.Set with legend/group/actions, hint/error status, Set sizes.
