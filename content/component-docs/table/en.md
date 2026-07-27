# Table

Data table with compound API: scroll container, header/columns, body/rows, footer. Supports **sort**, **selection**, row `tone`, and variants including `gloss`.

## Import

```tsx
import {
  Table,
  TABLE_ROW_TONE_SURFACE,
  type TableProps,
  type TableVariant,
  type TableClassNames,
  type TableContentProps,
  type SortDescriptor,
  type SelectionMode,
} from "burne-ui";
```

## API

### Compound API

```tsx
<Table variant="default" className="max-w-2xl">
  <Table.ScrollContainer>
    <Table.Content
      aria-label="Team"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      sortDescriptor={sort}
      onSortChange={setSort}
    >
      <Table.Header>
        <Table.Column id="name" isRowHeader allowsSorting>
          Name
        </Table.Column>
        <Table.Column id="role" allowsSorting>
          Role
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id} id={user.id} tone="default">
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
  <Table.Footer>
    <span className="text-small text-muted">3 records</span>
  </Table.Footer>
</Table>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `secondary` \| `toned` \| `gloss` |
| `className` | — | Root wrapper |
| `classNames` | — | Slots |

### `Table.Content` props

| Prop | Default | Description |
|------|---------|-------------|
| `selectionMode` | `none` | `none` \| `single` \| `multiple` |
| `selectedKeys` | — | `Set` or `"all"` |
| `onSelectionChange` | — | Callback |
| `sortDescriptor` | — | `{ column, direction }` |
| `onSortChange` | — | Sort callback |
| `aria-label` | — | Table name |

### `TableClassNames`

`root`, `glossContent`, `scrollContainer`, `content`, `header`, `headerRow`, `column`, `columnInner`, `columnLabel`, `columnSortChevron`, `body`, `row`, `cell`, `footer`, `emptyCell`.

### Compound sub-parts

| Part | Role |
|------|------|
| `Table.ScrollContainer` | Horizontal scroll + `tabIndex` |
| `Table.Content` | `<table>` + selection/sort context |
| `Table.Header` | `<thead>` |
| `Table.Column` | `<th>` + sort UI |
| `Table.Label` | Column header text (`className` / `ref`); plain Column children are wrapped automatically. Slot `classNames.columnLabel` |
| `Table.Body` | `<tbody>` + empty state |
| `Table.Row` | `<tr>` + tone/selection |
| `Table.Cell` | `<td>` |
| `Table.Footer` | Footer bar below table |

## Variant / row tone

| Variant | Surface |
|---------|---------|
| `default` | `rounded-mid border-token bg-surface overflow-clip` |
| `secondary` | Transparent root; header `bg-secondary` on columns |
| `toned` | `border-separate border-spacing-y-xsmall`; row strips via `tone` |
| `gloss` | `gloss-panel gloss-deep` + inner `glossContent` |

### Row `tone` (`TABLE_ROW_TONE_SURFACE`)

| tone | Row background |
|------|----------------|
| `default` | `bg-surface` |
| `outline` | `bg-transparent border-token` |
| `secondary` | `bg-secondary` |
| `danger` / `success` / `info` / `warning` | semantic `bg-surface-tint-*` |

In the `toned` variant, cells get `first:rounded-l-mid last:rounded-r-mid`; hover — `brightness-[0.97]`.

In `gloss`, selectable rows: `hover:bg-primary-tint`, selected — `bg-primary-tint` + ring on cell.

## Animations

`tableAnimations.tsx` — the only GSAP layer. Everything else — CSS hover/selection.

**DOM (sortable column):**

```
<th class=group/col>
  <span class=columnInner>
    <Table.Label class=columnLabel>Name</Table.Label>
    <TableSortChevron ref=chevron>   ← IoChevronUp, GSAP rotate
      <IoChevronUp />
```

**DOM (selectable row):**

```
<tr aria-selected class=row>         ← React state, CSS bg
  <td class=cell>                    ← ring-primary when selected (toned)
```

No portal, no press squeeze on rows, no FLIP on data sort.

### 1. Sort chevron rotation

`TableSortChevron` → `useChevronRotation(descending, chevronRef)`:

**Idle:** chevron `opacity-0`, `group-hover/col:opacity-40`.

**Active sort:** `text-primary opacity-100`.

**Direction change:** GSAP rotate chevron when `sortDirection === "descending"` (icon `IoChevronUp`).

Slot: `classNames.columnSortChevron`.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  interactiveEase: "power2.out",
});
```

**Reduced motion:** rotation may be instant inside `useChevronRotation` when `prefers-reduced-motion`.

### 2. Row / cell hover (CSS)

| Variant | Hover |
|---------|-------|
| `default` / `secondary` / `gloss` | `hoverVariant()` on row via styles |
| `toned` | `hover:brightness-[0.97]` on cells (`motion-reduce:hover:brightness-100`) |
| `gloss` selectable | `hover:bg-primary-tint` |

No GSAP scale/lift on rows.

### 3. Selection state

Controlled via React (`selectedKeys`, `onSelectionChange`):

- Per-row `isSelected` / roving focus — external store + `useSyncExternalStore` (only affected rows re-render)
- `Table.Row` / `Table.Cell` — `memo`
- Row: `aria-selected`, `bg-default-hover` or gloss tint
- Cell (toned): `ring-2 ring-inset ring-primary` when selected
- Checkbox column — via `selectionMode`, no fill animation

### What's not included

- Row press squeeze
- Portal / popover motion
- Row reorder animation on sort (chevron only)
- Ripple

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Chevron rotate | `useChevronRotation` | `interactiveDuration`, `interactiveEase` | `allowsSorting` on Column |
| Row hover tint | CSS `hoverVariant` / brightness | — | `variant`, `tone` |
| Selection highlight | Store + CSS | — | `selectionMode`, `selectedKeys` |

## Tokens and CSS

| Class / token | Role |
|---------------|------|
| `TABLE_ROOT_VARIANT_CLASS` | Surface per variant |
| `TABLE_COLUMN_SORTABLE_CLASS` | `cursor-pointer`, `hover:text-foreground` |
| `TABLE_COLUMN_SORT_CHEVRON_*` | Idle/active chevron opacity |
| `TABLE_ROW_SELECTED_CLASS` | `bg-default-hover` |
| `TABLE_CELL_SELECTED_RING_CLASS` | Inset ring on selected cell |
| `TABLE_FOOTER_CLASS` | `border-t-token`, flex actions row |
| `shadow-token-sm` | On default root (not 2nd level lift) |

## Styling and customization

### Two levels

1. **`className` on `Table`** — root wrapper (`max-w-*`, margin).
2. **`classNames` on root** — all slots via `TableClassNamesProvider`.

Sub-parts: **`className` on `Table.Column` / `Table.Row` / `Table.Cell`** on top of the slot.

### `TableClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | Outer wrapper | Border, radius, max-width container |
| `glossContent` | Gloss inner | Padding in gloss variant |
| `scrollContainer` | Scroll div | Scrollbar, horizontal padding |
| `content` | `<table>` | Border-collapse, width |
| `header` | `<thead>` | Sticky header helpers |
| `headerRow` | Header `<tr>` | Bottom border, bg strip |
| `column` | `<th>` | Header typography, padding |
| `columnInner` | Flex row label+chevron | Gap, alignment |
| `columnLabel` | `Table.Label` | Font weight, color, truncate |
| `columnSortChevron` | Chevron wrapper | Size/color sort icon |
| `body` | `<tbody>` | Empty state container |
| `row` | `<tr>` | Row hover, tone override |
| `cell` | `<td>` | Cell padding, text color |
| `footer` | Footer bar | Summary/actions layout |
| `emptyCell` | Empty placeholder td | Centered empty message |

### Compound table (sort + selection)

```tsx
<Table
  variant="default"
  classNames={{
    root: "rounded-mid border border-info/25 shadow-token-sm",
    headerRow: "bg-info/10",
    column: "text-info font-semibold",
    columnSortChevron: "text-info",
    row: "hover:bg-info/5",
    cell: "text-foreground/90",
    footer: "bg-info/5",
  }}
  className="max-w-2xl"
>
  <Table.ScrollContainer>
    <Table.Content
      aria-label="Team"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      sortDescriptor={sort}
      onSortChange={setSort}
    >
      <Table.Header>
        <Table.Column id="name" isRowHeader allowsSorting>Name</Table.Column>
        <Table.Column id="role" allowsSorting>Role</Table.Column>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id} id={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
  <Table.Footer>
    <span className="text-small text-muted">3 records</span>
  </Table.Footer>
</Table>
```

### Toned rows with semantic tone

```tsx
<Table variant="toned" classNames={{ row: "cursor-pointer" }}>
  <Table.ScrollContainer>
    <Table.Content aria-label="Statuses">
      <Table.Header>...</Table.Header>
      <Table.Body>
        <Table.Row id="1" tone="danger">
          <Table.Cell>Sync error</Table.Cell>
        </Table.Row>
        <Table.Row id="2" tone="success">
          <Table.Cell>Done</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>
```

### Practical notes

- **`Table.ScrollContainer` is required** for horizontal overflow on narrow screens (`tabIndex={0}`).
- **Sort:** `allowsSorting` + controlled `sortDescriptor` / `onSortChange`; without them the chevron is decorative.
- **`isRowHeader`** on the first column — screen reader row headers.
- **`renderEmptyState` on `Table.Body`** — custom empty UI (`emptyCell` slot).
- **Gloss:** table children are placed inside `glossContent` automatically; do not duplicate `gloss-panel` in `classNames.root`.
- **Do not set `transform` on `columnSortChevron`** — conflicts with GSAP rotate.
- **Merge order:** variant styles → `classNames.slot` → sub-part `className`.

## Integrations

| Component | Use case |
|-----------|----------|
| `Pagination` | Paging below table footer |
| `Checkbox` | Selection UI (via selectionMode) |
| `Badge` | Status in cells |

## Accessibility

- `Table.Content`: `aria-label` on `<table>`
- Sortable columns: `aria-sort`
- Selected rows: `aria-selected`
- Row header column: `isRowHeader`
- Scroll container: `tabIndex={0}` for keyboard scroll

## File structure

```
Table/
├── Table.tsx
├── index.ts
├── tableTypes.ts
├── tableStyles.ts
├── tableAnimations.tsx       # TableSortChevron
├── tableParts.tsx
├── useTableRootState.ts
├── useTableContentState.ts
├── tableContext.tsx
├── tableAPI.ts
├── tableA11y.ts
└── Table.stories.tsx
```

## Storybook

`Core Components/Table` — variants, sort, selection, tones, gloss, empty state, `classNames`.
