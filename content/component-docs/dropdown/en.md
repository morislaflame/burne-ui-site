# Dropdown

Action and value-selection menu. Built on top of `Popover` (portal, squeeze on open). Compound API: trigger, popover, groups, items, submenus, selection indicators.

## Import

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownPopover,
  type DropdownProps,
  type DropdownClassNames,
  type DropdownItemProps,
  type DropdownItemVariant,
} from "burne-ui";
```

## API

### Basic menu

```tsx
<Dropdown>
  <Dropdown.Trigger asChild>
    <Button variant="outline">Actions</Button>
  </Dropdown.Trigger>
  <Dropdown.Popover>
    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item status="danger">Delete</Dropdown.Item>
  </Dropdown.Popover>
</Dropdown>
```

### Selection (single / multiple)

```tsx
<Dropdown
  selectionIndicator
  defaultValue="ru"
  onValueChange={setLang}
>
  <Dropdown.Trigger asChild>
    <Button variant="outline">Language</Button>
  </Dropdown.Trigger>
  <Dropdown.Popover>
    <Dropdown.Group>
      <Dropdown.Header>Select language</Dropdown.Header>
      <Dropdown.Item value="ru">
        <Dropdown.ItemIndicator />
        <Dropdown.Label>Russian</Dropdown.Label>
      </Dropdown.Item>
      <Dropdown.Item value="en">
        <Dropdown.ItemIndicator />
        <Dropdown.Label>English</Dropdown.Label>
      </Dropdown.Item>
    </Dropdown.Group>
  </Dropdown.Popover>
</Dropdown>
```

### Submenu

```tsx
<Dropdown.Popover>
  <Dropdown.Sub>
    <Dropdown.SubTrigger>More</Dropdown.SubTrigger>
    <Dropdown.SubContent>
      <Dropdown.Item>Export</Dropdown.Item>
    </Dropdown.SubContent>
  </Dropdown.Sub>
</Dropdown.Popover>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `open` / `defaultOpen` | `false` | Controlled / uncontrolled |
| `onOpenChange` | — | Open state callback |
| `multiple` | `false` | Multi-select |
| `value` / `defaultValue` | — | `string` or `string[]` |
| `onValueChange` | — | Selection callback |
| `selectionIndicator` | `false` | Show radio/check indicators |
| `closeOnSelect` | `!multiple` | Close after selection |
| `popoverVariant` | `default` | `default` \| `gloss` for panel |
| `classNames` | — | Slots |

### `DropdownClassNames`

`root`, `trigger`, `popover`, `popoverBody`, `group`, `label`, `separator`, `item`, `itemLabel`, `itemHint`, `itemIcon`, `itemIndicator`, `itemIndicatorShell`, `itemIndicatorFill`, `itemIndicatorMark`, `sub`, `subTrigger`, `subTriggerLabelWrap`, `subTriggerIcon`, `subPopover`, `subPopoverGlossPanel`, `subPopoverBody`.

### Compound sub-parts

| Part | Purpose |
|------|---------|
| `Dropdown.Trigger` | Toggle; `asChild` for `Button` |
| `Dropdown.Popover` / `Content` | Wrapper over `Popover` |
| `Dropdown.Group` | `role="group"` + optional indicators |
| `Dropdown.Header` | Section heading (like ListBox.Header) |
| `Dropdown.Separator` | Divider (`Separator`) |
| `Dropdown.Item` | Menu item / selection row |
| `Dropdown.Label` / `Hint` / `Icon` | Row slots |
| `Dropdown.ItemIndicator` | `SelectionIndicator` compound |
| `Dropdown.Sub` | Nested submenu |
| `Dropdown.SubTrigger` / `SubContent` | Hover/flyout submenu |

### `Dropdown.Item` props

| Prop | Description |
|------|-------------|
| `value` | Value for selection |
| `href` | Link item (closes menu) |
| `disabled` | Disabled state |
| `selection` | `false` — action item without indicator |
| `variant` | `default` \| `danger` \| `warning` \| `info` \| `success` |

## variant (item) and popover

| `Dropdown.Item` variant | Styles |
|-------------------------|--------|
| `default` | `text-foreground` + `hoverVariant()` |
| `danger` | `text-danger` + `hoverVariant("danger")` |
| `warning` | `text-warning` + semantic hover |
| `info` | `text-info` + semantic hover |
| `success` | `text-success` + semantic hover |

`popoverVariant` on root (`default` \| `gloss`) is passed to `Popover` and the submenu portal.

Item row — grid from `optionListItemGridClass` (indicator | icon | label/hint), same as `ListBox` / `Select`.

## Animations

Motion is split: `dropdownAnimations.ts` (keyboard, submenu portal) + `Popover` (main panel) + `runOpenAfterSqueeze` (trigger).

**DOM (open menu):**

```
<div class=root>                         ← inline-flex wrapper
  <button|asChild> Trigger               ← squeeze target
  <Popover.Content unstyled>             ← portal, motionTooltip
    <Popover.Body role=menu>             ← scrollable list
      <Dropdown.Group>
        <Dropdown.Item>                  ← press squeeze on pointerdown
          <ItemIndicator /> <ItemLabel />
      <Dropdown.Sub>
        <SubTrigger>                     ← hover open, CSS hoverVariant
        <SubContent portal z-110>        ← separate portal motion
```

No hover-lift on root wrapper. Item/sub row — CSS `hoverVariant`, not GSAP shadow.

### 1. Trigger open — press squeeze

`Dropdown.Trigger` on `pointerdown` (when menu is closed):

1. `e.preventDefault()` — blocks the child `Button`'s own squeeze
2. `runOpenAfterSqueeze({ triggerRef, openingRef, setOpen: true })` — squeeze trigger, then open

**Close:** `click` when `open=true` → `setOpen(false)` immediately, without squeeze.

`asChild`: handlers merge onto child; order — trigger `pointerdown` first.

#### Customizing squeeze

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  pressSqueezeScale: [1, 0.98, 1],
  enablePressSqueeze: true,
});
```

**Reduced motion:** squeeze is skipped inside `animateInteractivePressSqueeze` / `prefersReducedMotion`.

### 2. Main popover portal

`Dropdown.Popover` — thin wrapper over `Popover`:

- `matchAnchorWidth` — panel width = trigger
- `unstyled` — surface is set by `popoverBody`
- `contentRole={undefined}` — dialog semantics disabled; `role="menu"` on `Popover.Body`
- `shouldDismiss` — ignores clicks inside `subPanelRootsRef`

Enter/exit: `animatePortalOpen` / `animatePortalClose` + `motionTooltip()` (scale 0.97→1, fade).

Persistent shadow on default panel — from `Popover` (`usePersistentElShadow`).

#### Customizing portal

```ts
configureMotion({
  tooltipDuration: 200,        // → motionTooltip duration
  interactiveEase: "power2.out",
});
```

**Reduced motion:** `applyReducedPortalMotion` / instant unmount.

### 3. Item press squeeze

`Dropdown.Item` on `pointerdown` (when not `disabled`):

```ts
animateInteractivePressSqueeze(el);
```

Only the row element (`<button>` / `<a>`), not the indicator fill. Selection state changes without GSAP — via `SelectionIndicator`.

### 4. Submenu flyout portal

`useDropdownSubContentPortal` (`SubContent`):

**Open:** `pointerenter` / `click` / `Enter|Space` on `SubTrigger` → `setOpen(true)`.

**Position:** fixed `left/top`, 6px gap to the right of trigger; flip left if it doesn't fit; clamp by viewport height.

**Motion:** separate portal `z-dropdown-sub` with the same `animatePortalOpen`/`Close` + `motionTooltip()`.

**Dismiss coordination:** `subPanelRootsRef` registers submenu roots — main popover does not close when clicking inside submenu.

**Close delay:** `scheduleClose` on `pointerleave` of sub row (hover bridge).

Gloss submenu: `subPopoverGlossPanel` + `subPopoverBody` instead of `bg-surface shadow-mid`.

### 5. Keyboard navigation

`useDropdownPopoverMenu` when open:

| Key | Action |
|-----|--------|
| `ArrowDown` / `ArrowUp` | Next/previous focusable item |
| `Home` / `End` | First/last item |
| `Escape` | Close + focus trigger |

On open — autofocus on the first focusable item in the panel.

### What's not included

- Hover lift / second-level shadow on items (CSS tint only)
- Ripple on items
- FLIP list animation on selection change

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Trigger squeeze | `runOpenAfterSqueeze` | `pressSqueezeScale`, `interactiveDuration`, `enablePressSqueeze` | — |
| Main panel portal | `Popover` + `motionTooltip` | `tooltipDuration`, `interactiveEase` | `popoverVariant` |
| Item squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale` | `disabled` |
| Submenu portal | `useDropdownSubContentPortal` | `tooltipDuration` | `popoverVariant` |
| Item hover tint | `hoverVariant()` CSS | — | `variant` on Item |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `DROPDOWN_POPOVER_BODY_CLASS` | `max-h-[min(24rem,70vh)]`, `p-base`, scroll |
| `DROPDOWN_ITEM_BASE_CLASS` | `rounded-mid px-base py-small` row |
| `hoverVariant()` | Semantic hover background on item/sub |
| `optionListItemGridClass` | Grid: indicator, icon, label, hint |
| `shadow-token-md` | Submenu default surface |
| `gloss-panel gloss-deep` | Gloss popover/submenu |
| `z-dropdown` / `z-dropdown-sub` | Main menu / submenu stacking (`--z-dropdown`) |

## Styling and customization

### Two levels

1. **`className` on root `Dropdown`** — merged with `classNames.root` on the `relative inline-flex` wrapper.
2. **`classNames` on root** — all slots via `DropdownClassNamesProvider`.

Sub-parts (`Dropdown.Item`, `Dropdown.SubTrigger`, …) accept **`className`** on top of the slot.

`bodyClassName` on `Dropdown.Popover` — extra classes on `Popover.Body` (`role="menu"`).

### `DropdownClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------|
| `root` | Wrapper div | Outer layout trigger+popover |
| `trigger` | Trigger button / asChild | Extra classes on button (with `asChild` merge on child) |
| `popover` | `Popover.Content` shell | z-index, outer ring |
| `popoverBody` | `Popover.Body` | Padding, border, max-height scroll area |
| `group` | `Dropdown.Group` | Gap between items |
| `header` | `Dropdown.Header` | Muted section heading |
| `separator` | `Dropdown.Separator` | Divider spacing |
| `item` | Item row | Radius, padding of the full row |
| `itemLabel` | Label span | Item typography |
| `itemHint` | Hint span | Secondary text below label |
| `itemIcon` | Leading icon slot | Icon size/color |
| `itemIndicator` | Indicator wrapper | Radio/check position |
| `itemIndicatorShell` / `Fill` / `Mark` | `SelectionIndicator` parts | Custom mark/fill |
| `sub` | `Dropdown.Sub` wrapper | Submenu container |
| `subTrigger` | Sub trigger row | Hover row styles |
| `subTriggerLabelWrap` | Label flex area | Truncate long labels |
| `subTriggerIcon` | `IoChevronForward` | Muted chevron |
| `subPopover` | Submenu portal panel | Flyout surface |
| `subPopoverGlossPanel` / `subPopoverBody` | Gloss submenu layers | Gloss variant |

### Simple-like selection menu

```tsx
<Dropdown
  selectionIndicator
  defaultValue="ru"
  popoverVariant="default"
  classNames={{
    popoverBody: "border border-primary/20 bg-surface",
    label: "text-primary font-medium",
    item: "rounded-lg",
    itemLabel: "font-medium",
  }}
>
  <Dropdown.Trigger asChild>
    <Button variant="outline">Interface language</Button>
  </Dropdown.Trigger>
  <Dropdown.Popover>
    <Dropdown.Group>
      <Dropdown.Header>Select language</Dropdown.Header>
      <Dropdown.Item value="ru">
        <Dropdown.ItemIndicator />
        <Dropdown.Label>Russian</Dropdown.Label>
      </Dropdown.Item>
      <Dropdown.Item value="en">
        <Dropdown.ItemIndicator />
        <Dropdown.Label>English</Dropdown.Label>
      </Dropdown.Item>
    </Dropdown.Group>
  </Dropdown.Popover>
</Dropdown>
```

### Compound with submenu and semantic items

```tsx
<Dropdown classNames={{ item: "rounded-mid", subPopover: "shadow-token-lg" }}>
  <Dropdown.Trigger>Menu</Dropdown.Trigger>
  <Dropdown.Popover bodyClassName="p-small">
    <Dropdown.Item status="danger">
      <Dropdown.Label>Delete</Dropdown.Label>
    </Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Sub>
      <Dropdown.SubTrigger>Export</Dropdown.SubTrigger>
      <Dropdown.SubContent>
        <Dropdown.Item>CSV</Dropdown.Item>
        <Dropdown.Item>PDF</Dropdown.Item>
      </Dropdown.SubContent>
    </Dropdown.Sub>
  </Dropdown.Popover>
</Dropdown>
```

`Dropdown.Group selectionIndicator={false}` — locally hide indicators in one section.

### Practical notes

- **`Dropdown.Popover`** — alias for `Dropdown.Popover`.
- **`asChild` on Trigger:** `trigger` styles merge onto child; squeeze is coordinated via `preventDefault`.
- **Action items:** without `value` or `selection={false}` — close menu without toggling selection.
- **Link items:** `href` → `<a>`, role `menuitem`, close on navigate.
- **Do not set `transform` on `popover` content** — conflicts with portal GSAP scale.
- **Gloss:** `popoverVariant="gloss"` on root affects both the main panel (via Popover) and the submenu surface.
- **Merge order:** base → `classNames.slot` → sub-part `className`.

## Integrations

| Component | Usage |
|-----------|-------|
| `Popover` | Portal + positioning |
| `SelectionIndicator` | Item selection marks |
| `Breadcrumbs` | Ellipsis hidden crumbs menu |
| `Button` | Typical trigger (`asChild`) |

## Accessibility

- Trigger: `aria-expanded`, `aria-haspopup="menu"`, `aria-controls`
- Popover body: `role="menu"`
- Item: `menuitem` / `menuitemradio` / `menuitemcheckbox`
- Group: `role="group"` + `aria-labelledby`
- Keyboard navigation in open menu
- `Escape` closes and returns focus to trigger

## File structure

```
Dropdown/
├── Dropdown.tsx
├── index.ts
├── dropdownTypes.ts
├── dropdownStyles.ts
├── dropdownAnimations.ts
├── dropdownParts.tsx
├── useDropdownRootState.ts
├── useDropdownSubState.ts
├── dropdownContext.tsx
├── dropdownAPI.ts
├── dropdownA11y.ts
└── Dropdown.stories.tsx
```

## Storybook

`Core Components/Dropdown` — actions, selection, multiple, submenus, gloss, `classNames`.
