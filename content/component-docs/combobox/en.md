# ComboBox

Combobox with filtering, keyboard navigation, and a dropdown `ListBox` inside a `Popover`. Simple API (`options` prop) and compound (`InputGroup` / `Input` / `Trigger` / `Popover`).

## Import

```tsx
import {
  ComboBox,
  comboBoxFilteredValues,
  type ComboBoxOption,
  type ComboBoxRootProps,
  type ComboBoxSimpleProps,
  type ComboBoxClassNames,
} from "burne-ui";
```

## API

### Simple API

```tsx
const options = [
  { value: "ru", label: "Russia" },
  { value: "de", label: "Germany", hint: "EU" },
];

<ComboBox
  label="Country"
  options={options}
  value={country}
  onValueChange={setCountry}
  placeholder="Select a country"
/>
```

### Compound API

```tsx
<ComboBox options={options} value={v} onValueChange={setV}>
  <ComboBox.Label>Country</ComboBox.Label>
  <ComboBox.InputGroup>
    <ComboBox.Input />
    <ComboBox.Trigger />
  </ComboBox.InputGroup>
  <ComboBox.Popover />
  <ComboBox.Hint>You can search by name</ComboBox.Hint>
</ComboBox>
```

### Root props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `options` | `[]` | `{ value, label, hint?, icon?, disabled?, filterText? }` |
| `value` / `defaultValue` | — | Controlled / uncontrolled |
| `onValueChange` | — | Selection callback |
| `variant` | `default` / gloss from ButtonGroup | same as Input |
| `status` | `default` | danger/success/warning tint |
| `size` | `base` | shell and text size |
| `disabled` | `false` | |
| `placeholder` | `"Select a value"` | |
| `menuMaxHeight` | `min(24rem, 70vh)` | ListBox scroll |
| `name` | — | Form binding |
| `classNames` | — | see below |

### `ComboBoxClassNames`

`root`, `label`, `inputGroup`, `input`, `trigger`, `triggerIcon`, `popover`, `popoverBody`, `listBox`, `hint`, `error`.

### Compound subparts

| Part | Role |
|------|------|
| `ComboBox.InputGroup` | Shell anchor, `role="combobox"`, open squeeze |
| `ComboBox.Input` | Text field + keyboard |
| `ComboBox.Trigger` | Chevron, toggle open |
| `ComboBox.Popover` | `Popover` + `ListBox` |

## Behavior

- Closed: input shows the label of the selected option (`readOnly`), placeholder muted
- Open: input is editable, `filterQuery` filters options
- Keyboard: Arrow/Home/End, Enter selects, type-ahead opens with the typed character
- `comboBoxFilteredValues(options, query)` — filtering utility

## Animations

Several independent layers: shell (like Input), open squeeze, chevron, popover (Popover/Tooltip motion).

**DOM structure:**

```
Field.Root
  Label
  <div InputGroup ref=anchorRef role=combobox>   ← shell + open squeeze
    <input ComboBox.Input />
    <button ComboBox.Trigger> chevron
  <Popover.Content>                              ← portal
    <ListBox> …
```

### 1. Shell hover (standard)

`useFieldShellHoverLift(anchorRef, !disabled && !isGloss && !groupSegment)`:

- sm → md + lift on `InputGroup`
- `fieldShellHoverClass(status)` — CSS tint
- Disabled in `ButtonGroup` segment and for gloss (separate path)

### 2. Gloss shell

`useGlossFieldShellMotion(anchorRef, !disabled && isGloss && !groupSegment)`:

- pointer + focus lift (`onShellPointerEnter/Leave`, `onShellFocusIn/Out`)
- `data-gloss-disabled` when disabled

### 3. Open after squeeze (`runComboBoxOpenAfterSqueeze`)

**InputGroup `pointerdown`** (when `!open`, button 0):

```ts
runComboBoxOpenAfterSqueeze({
  anchorRef,
  disabled,
  isGloss,
  groupSegment,
  setOpen,
  openingRef,
});
```

**Input keyboard** (ArrowDown, Enter, Space, printable char):

- Same helper with `preferStandardSqueeze: true` for gloss input (standard squeeze instead of gloss)
- `onOpened` → focus input, set filter/active option

**Algorithm:**

1. `openingRef` guard against double-trigger
2. Reduced motion → `setOpen(true)` immediately
3. Otherwise `animateInteractivePressSqueeze(anchor)` or `animateGlossInteractivePressSqueeze` (only InputGroup click without `preferStandardSqueeze`)
4. After Promise → `setOpen(true)`, `onOpened?.()`

**Trigger button:** opens **without** squeeze — `setOpen(true)` + focus (toggle close if already open).

#### Customizing open squeeze

```ts
configureMotion({
  interactiveDuration: 280,
  pressSqueezeScale: [1, 0.98, 1],
  enablePressSqueeze: true,
});
```

### 4. Chevron rotation

`ComboBox.Trigger` → `useChevronRotation(open, triggerRef)`:

- GSAP `rotation: 0 | 180` on open/close
- `motionInteractive()` — `interactiveDuration`, `interactiveEase`
- Reduced motion: instant rotation (`applyChevronRotationInstant`)

### 5. Popover enter/leave

`ComboBox.Popover` → `<Popover variant={gloss|default}>`:

- **Open:** `animatePortalOpen` + `motionTooltip()` — `tooltipDuration` (200ms), `interactiveEase`
- **Close:** `animatePortalClose` with the same vars
- **Position:** `computeTooltipPlacement`, `matchAnchorWidth` on Content
- **Shadow:** `usePersistentElShadow` — sm on panel

```ts
configureMotion({
  tooltipDuration: 200,
  interactiveEase: "power2.out",
});
```

ListBox items — their own selection animations (see ListBox.md).

### Summary: what is configured where

| Animation | Where | `configureMotion` | Note |
|-----------|-------|-------------------|------|
| Shell hover | `InputGroup` | `enableHoverLift`, `hoverLiftScale` | !gloss, !segment |
| Gloss shell | `InputGroup` | interactive | variant=gloss |
| Open squeeze | `runComboBoxOpenAfterSqueeze` | `pressSqueezeScale` | click shell / keyboard |
| Chevron | `ComboBox.Trigger` | `interactiveDuration` | rotate |
| Popover | `Popover.Content` | `tooltipDuration` | enter/leave |
| Trigger click open | `ComboBox.Trigger` | — | no squeeze |

## Integration

| Context | Behavior |
|---------|----------|
| `Form` | `name`, `value`, `error`, `size` |
| `ButtonGroup` | `variant` gloss, `groupSegment`, no shell hover on segment |

## Styling and customization

### Two levels

1. **`className` on root** — classes on `Field.Root` (merged with `classNames.root`).
2. **`classNames` on root** — slots via `ComboBoxClassNamesProvider`.

In compound API, **`className` on each subpart** (`InputGroup`, `Input`, `Trigger`, `Popover`) is merged on top of the corresponding context slot.

### `ComboBoxClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------|
| `root` | `Field.Root` | Max-width, field layout |
| `label` | `Label` | Label typography |
| `inputGroup` | Shell `role="combobox"` | Border, background, hover shell, squeeze target |
| `input` | `<input>` inside the group | Text, placeholder, muted state |
| `trigger` | Chevron button | Hit-area, trigger icon color |
| `triggerIcon` | `IoChevronDown` | Chevron size/color |
| `popover` | `Popover.Content` (portal) | z-index, panel shadow |
| `popoverBody` | `Popover.Body` | Padding inside popover |
| `listBox` | `ListBox` root | Scroll, max-height area, item gap |
| `hint` / `error` | `Field.Hint` / `Field.Error` | Hint / error |

`variant`, `status`, `size` inherit Input tokens. Popover gets `variant="gloss"` automatically if the combobox is gloss.

### Simple API

Simple renders a fixed layout: `Label` → `InputGroup` + `Input` + `Trigger` → `Popover` → hint/error. Styles — only via `classNames` on root:

```tsx
<ComboBox
  className="max-w-sm"
  classNames={{
    root: "gap-small",
    inputGroup: "border-primary/40 bg-primary/5",
    input: "text-primary placeholder:text-primary/50",
    trigger: "text-primary hover:text-primary",
    triggerIcon: "icon-mid",
    popoverBody: "bg-primary/5",
    listBox: "p-small",
    hint: "text-foreground/70",
  }}
  label="Interface language"
  hint="Slots configured via classNames"
  options={options}
  variant="outline"
/>
```

`menuMaxHeight` — via prop (`style` on ListBox inside), not via `classNames`.

### Compound API

Full control over layout and styles per part:

```tsx
<ComboBox
  options={options}
  value={value}
  onValueChange={setValue}
  classNames={{
    root: "max-w-md",
    inputGroup: "ring-1 ring-primary/20",
    listBox: "max-h-48",
  }}
>
  <ComboBox.Label className="text-mid font-medium">
    Country
  </ComboBox.Label>

  <ComboBox.InputGroup className="shadow-token-sm">
    <ComboBox.Input className="font-medium" placeholder="Search…" />
    <ComboBox.Trigger className="px-mid" />
  </ComboBox.InputGroup>

  <ComboBox.Popover className="shadow-token-lg">
    {/* children optional — custom ListBox.Item layout */}
  </ComboBox.Popover>

  <ComboBox.Hint className="text-xs">You can search by name</ComboBox.Hint>
</ComboBox>
```

Custom list: pass `children` to `ComboBox.Popover` instead of the default map over `options` — style items via `ListBox.Item` and `classNames.listBox`.

`ComboBox.Label` — nested `classNames` of the `Label` component, same as Input.

### Practical notes

- **inputGroup vs input:** squeeze and shell hover — on `inputGroup`; filter and text — on `input`.
- **Trigger:** `tabIndex={-1}`; style the button without breaking `focus-ring`.
- **Popover:** `matchAnchorWidth` is enabled by default; change panel width via `popover` / `popoverBody`, not via anchor.
- **ListBox:** selection indicator and item motion — in the ListBox component; `listBox` slot — scroll wrapper.
- **ButtonGroup segment:** shell hover on `inputGroup` is disabled; rounding is set by the segment.
- **Merge order:** base styles → `classNames.slot` → subpart `className`.

## Accessibility

- `InputGroup`: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-haspopup="listbox"`
- `Input`: `aria-autocomplete="list"`, `aria-activedescendant` when open
- `Trigger`: `aria-label` open/close, `tabIndex={-1}`
- `ListBox`: `aria-labelledby` / `aria-label`

## File structure

```
ComboBox/
├── ComboBox.tsx
├── index.ts
├── comboBoxTypes.ts
├── comboBoxStyles.ts
├── comboBoxAnimations.ts     # runComboBoxOpenAfterSqueeze
├── comboBoxParts.tsx         # InputGroup, Input, Trigger, Popover
├── useComboBoxRootState.ts
├── comboBoxAPI.ts
├── comboBoxA11y.ts
└── ComboBox.stories.tsx
```

## Storybook

`Core Components/ComboBox` — simple/compound, filter, gloss, status, Form, `classNames`.
