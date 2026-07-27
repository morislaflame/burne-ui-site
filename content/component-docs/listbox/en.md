# ListBox

Selection list (`role="listbox"`): single / multiple, keyboard-friendly items, optional selection indicator. Used standalone and inside Select / ComboBox / Dropdown.

## Import

```tsx
import {
  ListBox,
  useListBox,
  type ListBoxRootProps,
  type ListBoxItemProps,
  type ListBoxSize,
  type ListBoxVariant,
  type ListBoxClassNames,
} from "burne-ui";
```

## API

### Simple API (items with props)

```tsx
<ListBox
  aria-label="Language"
  defaultValue="ru"
  selectionIndicator
  onValueChange={setLang}
>
  $1aria-label="Russian" hint="Cyrillic" />
  $1aria-label="English" />
</ListBox>
```

### Compound API (sections)

```tsx
<ListBox multiple defaultValue={["ru"]} selectionIndicator>
  <ListBox.Section>
    <ListBox.Header>Available languages</ListBox.Header>
    <ListBox.Item value="ru">
      <ListBox.ItemIndicator />
      <ListBox.Label>Russian</ListBox.Label>
      <ListBox.Hint>Cyrillic</ListBox.Hint>
    </ListBox.Item>
    <ListBox.Separator />
    <ListBox.Empty>No options</ListBox.Empty>
  </ListBox.Section>
</ListBox>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `variant` | `default` | `default` \| `gloss` |
| `multiple` | `false` | Multi-select (`string[]`) |
| `value` / `defaultValue` | — | Controlled / uncontrolled |
| `onValueChange` | — | `(string \| string[]) => void` |
| `selectionIndicator` | `false` | Radio/check indicator on the left |
| `activeValue` / `onActiveValueChange` | — | Keyboard hover option (Select/ComboBox) |
| `disabled` | `false` | Disables all items |
| `listId` | auto | id for `aria-*` |
| `label` | — | `aria-label` when there is no labelledby |
| `classNames` | — | see styling |

### Compound sub-parts

| Part | Role |
|------|------|
| `ListBox.Section` | `role="group"` + `aria-labelledby` |
| `ListBox.Header` | Section heading |
| `ListBox.Separator` | Divider |
| `ListBox.Empty` | Empty state |
| `ListBox.Item` | `role="option"` button |
| `ListBox.Label` / `Hint` / `Icon` | Item grid slots |
| `ListBox.ItemIndicator` | `SelectionIndicator` (compound: `.Fill`, `.Mark`) |

### `useListBox()`

Selection context inside `ListBox`: `selected`, `selectItem`, `setActiveValue`, `showIndicator`, `indicatorMode` (`radio` | `multi`).  
`activeValue` is separate: `useListBoxActiveValue()` + DOM `data-active` (arrow/hover does not re-render every option).

### `useListBoxActiveValue()`

Current keyboard/hover active option value (`string | null`).

## variant

| variant | Root |
|---------|------|
| `default` | `flex flex-col gap-xsmall` |
| `gloss` | `gloss-panel gloss-deep rounded-mid p-mid` + gloss ref refresh |

## Sizes

`size` affects item padding, label typography, indicator↔label gap, and `SelectionIndicator` size (`small` list → `xsmall` indicator).

## Animations

`listBoxAnimations.ts` + `SelectionIndicator` + shared `usePressableElementTextMotion`.

**DOM item (simple):**

```
<button role=option>
  [ItemIndicator]
  ListBox.Label   ← labelMotionRef (squeeze target)
  ListBox.Hint
  ListBox.Icon
</button>
```

### 1. Gloss root

`useListBoxRootGlossRef(isGloss)` → `useMergedGlossPanelRef` — refreshes gloss state on root when `variant="gloss"`.

### 2. Item label press squeeze

`useListBoxItemAnimations` → `usePressableElementTextMotion`:

- **enabled** when `!disabled && hasLabel`
- **hoverLift: false** — press squeeze only on label ref
- `onPointerDown` on item → squeeze label text

Reduced motion: skip GSAP.

### 3. Selection indicator (check / radio)

`ListBox.ItemIndicator` → `SelectionIndicator` → `useSelectionIndicatorAnimation`:

- **select:** `fill` scale 0→1, `mark` (check icon) scale in
- **deselect:** reverse with `motionInteractive()`

Mode: `radio` (single) or `multi` (multiple) from context.

### 4. Active highlight (CSS)

Root syncs the `data-active` attribute on the active option (`useListBoxActiveOptionHighlight`). Style is the static `data-active:bg-default-hover` class on each item — no React `isActive`, no GSAP.

### Summary

| Animation | Utility | `configureMotion` |
|-----------|---------|-------------------|
| Gloss root | `useMergedGlossPanelRef` | gloss CSS |
| Label squeeze | `usePressableElementTextMotion` | `pressSqueezeScale` |
| Indicator | `useSelectionIndicatorAnimation` | `selectionFillDuration` |
| Active row | CSS `LISTBOX_ITEM_ACTIVE_CLASS` | — |

## Styling and customization

### Two levels

1. **`className` on root** — merged with `classNames.root` on `ListBox`.
2. **`classNames`** — all slots via `ListBoxClassNamesProvider`.

Sub-parts (`ListBox.Item`, `ListBox.Header`, …) — **`className`** on top of the slot.

### `ListBoxClassNames` slots

| Slot | Element | Purpose |
|------|---------|---------|
| `root` | `role="listbox"` | Padding, border, gloss surface |
| `section` | `role="group"` | Section gap |
| `header` | Header wrapper | Header padding |
| `headerText` | `Text` in header | Section typography |
| `separator` | Divider | Margin/border |
| `empty` | Empty state | Centering, muted |
| `item` | Item button | Rounded, active/hover |
| `label` | Item label | Font weight, color |
| `hint` | Item hint | Muted secondary |
| `icon` | Trailing icon | Icon size |
| `itemIndicator` | Indicator shell grid | Cell layout |
| `itemIndicatorShell` | `SelectionIndicator` root | Border ring |
| `itemIndicatorFill` | Fill layer | Checked background |
| `itemIndicatorMark` | Check/dot mark | Icon color |

### Standalone

```tsx
<ListBox
  defaultValue="ru"
  aria-label="Interface language"
  selectionIndicator
  classNames={{
    root: "rounded-mid border border-primary/20 p-base",
    headerText: "text-primary",
    item: "rounded-lg",
    label: "font-semibold",
    hint: "text-muted/80",
    itemIndicatorShell: "border-primary/40",
  }}
>
  <ListBox.Section>
    <ListBox.Header>Available languages</ListBox.Header>
    $1aria-label="Russian" hint="Cyrillic" />
    $1aria-label="English" />
  </ListBox.Section>
</ListBox>
```

### Compound item layout

```tsx
<ListBox.Item value="de" className="py-xlarge">
  <ListBox.ItemIndicator
    classNames={{ itemIndicatorFill: "bg-primary/20" }}
  />
  <ListBox.Label className="text-mid">Deutsch</ListBox.Label>
  <ListBox.Icon><IoFlag aria-hidden /></ListBox.Icon>
</ListBox.Item>
```

### In Select / ComboBox

List styles via `classNames.listBox` on Select/ComboBox root; items — default map or custom `Popover` children.

### Practical notes

- **`selectionIndicator`:** without it, the indicator slot is not rendered in simple API.
- **Active vs selected:** active — keyboard hover (`bg-default-hover`); selected — `aria-selected` + indicator.
- **Gloss:** root gloss is not inherited into Popover automatically — set `variant` on `ListBox` inside popover body.
- **Merge order:** base → `classNames.slot` → sub-part `className`.

## Accessibility

- Root: `role="listbox"`, `aria-label` / `aria-labelledby`
- Item: `role="option"`, `aria-selected`, `id={listId}-opt-{value}`
- Section: `aria-labelledby` from Header id
- Active option: synced with parent combobox via `aria-activedescendant`

## File structure

```
ListBox/
├── ListBox.tsx
├── index.ts
├── listBoxTypes.ts
├── listBoxStyles.ts
├── listBoxAnimations.ts       # gloss ref + item squeeze
├── listBoxParts.tsx
├── useListBoxRootState.ts
├── useListBoxItemState.ts
├── listBoxAPI.ts
├── listBoxA11y.ts
└── ListBox.stories.tsx
```

## Storybook

`Core Components/ListBox` — single/multiple, sections, gloss, indicator, `classNames`.
