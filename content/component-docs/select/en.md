# Select

Single-value dropdown select. No filtering (unlike ComboBox): the displayed value is the `Select.Value` button. Simple API (`options` on root) and compound (`TriggerGroup` / `Value` / `Trigger` / `Popover`).

## Import

```tsx
import {
  Select,
  type SelectOption,
  type SelectRootProps,
  type SelectSimpleProps,
  type SelectClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
const options = [
  { value: "ru", label: "Russian", hint: "RU" },
  { value: "en", label: "English", disabled: true },
];

<Select
  label="Language"
  options={options}
  value={lang}
  onValueChange={setLang}
  placeholder="Select language"
/>
```

### Compound API

```tsx
<Select options={options} value={lang} onValueChange={setLang}>
  <Select.Label>Language</Select.Label>
  <Select.TriggerGroup>
    <Select.Value />
    <Select.Trigger />
  </Select.TriggerGroup>
  <Select.Popover />
  <Select.Hint>Interface language</Select.Hint>
</Select>
```

### Root props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `options` | `[]` | `{ value, label, hint?, icon?, disabled? }` |
| `value` / `defaultValue` | — | Controlled / uncontrolled |
| `onValueChange` | — | Selection callback |
| `variant` | `default` / gloss from ButtonGroup | same as Input |
| `status` | `default` | danger/success/warning tint |
| `size` | `base` | trigger shell size |
| `disabled` | `false` | |
| `placeholder` | `"Select value"` | muted text when nothing is selected |
| `menuMaxHeight` | `min(24rem, 70vh)` | scroll ListBox |
| `name` | — | Form binding |
| `classNames` | — | see styling |

### `SelectClassNames`

`root`, `label`, `triggerGroup`, `value`, `trigger`, `triggerIcon`, `popover`, `popoverBody`, `listBox`, `hint`, `error`.

### Compound subparts

| Part | Role |
|------|------|
| `Select.TriggerGroup` | Shell anchor, `role="combobox"`, open squeeze |
| `Select.Value` | Button with selected option label + keyboard |
| `Select.Trigger` | Chevron, toggle open |
| `Select.Popover` | `Popover` + `ListBox` |

## Behavior

- Closed: `Select.Value` shows the selected option `label` or `placeholder` (muted)
- Open: `ListBox` with `activeValue`, keyboard navigation
- Keyboard on Value: ArrowDown/Up, Enter, Space — open; in the list — navigate + Enter selects; Escape closes
- No type-ahead / filter (see ComboBox)

## Animations

Layers: shell (like Input), open squeeze, chevron, popover, ListBox items.

**DOM structure:**

```
Field.Root
  Label
  <div TriggerGroup ref=anchorRef role=combobox>
    <button Select.Value />      ← focus + keyboard
    <button Select.Trigger> chevron
  <Popover.Content>
    <ListBox> …
```

### 1. Shell hover (standard)

`useFieldShellHoverLift(anchorRef, !disabled && !isGloss && !groupSegment)` on `TriggerGroup`:

- sm → md + lift
- `fieldShellHoverClass(status)` — CSS tint

### 2. Gloss shell

`useGlossFieldShellMotion` — pointer + focus lift on `TriggerGroup`.

### 3. Open after squeeze (`runSelectOpenAfterSqueeze`)

**TriggerGroup `pointerdown`** (when `!open`):

```ts
runSelectOpenAfterSqueeze({
  anchorRef, disabled, isGloss, groupSegment,
  setOpen, onOpened: finishOpen, openingRef,
});
```

**Select.Value keyboard** (ArrowDown/Up, Enter, Space) — same helper without `groupSegment` in the squeeze path for gloss (gloss squeeze if gloss && !segment).

**Select.Trigger:** opens **without** squeeze — `setOpen(true)` + focus Value.

Algorithm: `openingRef` guard → reduced motion → instant open → otherwise `animateGlossInteractivePressSqueeze` or `animateInteractivePressSqueeze` → `setOpen(true)` → `onOpened` (focus Value, set active option).

### 4. Chevron rotation

`Select.Trigger` → `useChevronRotation(open)` — GSAP `rotation: 0|180`, `motionInteractive()`.

### 5. Popover enter/leave

`Select.Popover` → `Popover` with `motionTooltip()` — same as ComboBox.

### 6. ListBox items

Selection indicator + label press squeeze — see ListBox.md.

### Summary

| Animation | Where | `configureMotion` |
|-----------|-------|-------------------|
| Shell hover | `TriggerGroup` | `enableHoverLift`, `hoverLiftScale` |
| Gloss shell | `TriggerGroup` | interactive |
| Open squeeze | `runSelectOpenAfterSqueeze` | `pressSqueezeScale` |
| Chevron | `Select.Trigger` | `interactiveDuration` |
| Popover | `Popover.Content` | `tooltipDuration` |
| List items | `ListBox.Item` | `pressSqueezeScale` |

## Styling and customization

### Two levels

1. **`className` on root** — `Field.Root` (merged with `classNames.root`).
2. **`classNames` on root** — `SelectClassNamesProvider`.

Subparts accept **`className`** on top of the context slot.

### `SelectClassNames` slots

| Slot | DOM | Purpose |
|------|-----|---------|
| `root` | `Field.Root` | Max-width, field gap |
| `label` | `Label` | Typography |
| `triggerGroup` | Shell combobox | Border, hover, squeeze target |
| `value` | `Select.Value` button | Value text, muted placeholder |
| `trigger` | Chevron button | Trigger hit-area |
| `triggerIcon` | `IoChevronDown` | Chevron size/color |
| `popover` | `Popover.Content` | Shadow, z-index |
| `popoverBody` | `Popover.Body` | Menu padding |
| `listBox` | `ListBox` | Scroll area |
| `hint` / `error` | `Field.Hint` / `Field.Error` | Hint / error |

### Simple API

```tsx
<Select
  className="max-w-sm"
  classNames={{
    triggerGroup: "ring-1 ring-primary/20",
    value: "text-primary font-medium",
    trigger: "text-primary",
    popover: "ring-1 ring-primary/15",
    listBox: "p-small",
  }}
  label="Custom slots"
  options={options}
  defaultValue="ru"
/>
```

### Compound API

```tsx
<Select
  options={options}
  classNames={{ triggerGroup: "border-primary/30" }}
>
  <Select.Label className="font-semibold">Region</Select.Label>
  <Select.TriggerGroup className="shadow-token-sm">
    <Select.Value className="text-left" placeholder="—" />
    <Select.Trigger className="px-mid" />
  </Select.TriggerGroup>
  <Select.Popover className="shadow-token-lg" />
</Select>
```

Custom list: `children` in `Select.Popover` + item styles via `ListBox.Item` / `classNames.listBox`.

### Practical notes

- **Value vs TriggerGroup:** squeeze on group; value text — `value`.
- **Select vs ComboBox:** no `input` slot; do not use Input styles.
- **ButtonGroup segment:** shell hover disabled on segment.
- **Merge order:** base → `classNames.slot` → subpart `className`.

## Integration

| Context | Behavior |
|---------|----------|
| `Form` | `name`, `value`, `error`, `size` |
| `ButtonGroup` | `variant` gloss, `groupSegment` |

## Accessibility

- `TriggerGroup`: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-haspopup="listbox"`
- `Select.Value`: `aria-activedescendant` when open, `aria-invalid`, `aria-required`
- `Select.Trigger`: `aria-label`, `tabIndex={-1}`
- `ListBox`: `aria-labelledby` / `aria-label`

## File structure

```
Select/
├── Select.tsx
├── index.ts
├── selectTypes.ts
├── selectStyles.ts
├── selectAnimations.ts      # runSelectOpenAfterSqueeze
├── selectParts.tsx
├── useSelectRootState.ts
├── selectAPI.ts
├── selectA11y.ts
└── Select.stories.tsx
```

## Storybook

`Core Components/Select` — simple/compound, status, gloss, Form, `classNames`, keyboard.
