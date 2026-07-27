# Tabs

Tabs with compound API: `List`, `Tab`, `Panel`. Sliding indicator (GSAP), hover/press on inactive tab text. Supports horizontal/vertical, `variant`, `size`. No simple API — compound children only.

## Import

```tsx
import {
  Tabs,
  useTabsContext,
  type TabsRootProps,
  type TabsListProps,
  type TabsTabProps,
  type TabsPanelProps,
  type TabsSize,
  type TabsOrientation,
  type TabsVariant,
  type TabsClassNames,
} from "burne-ui";
```

## API

### Compound API

```tsx
<Tabs defaultValue="profile" variant="outline" size="base">
  <Tabs.List>
    <Tabs.Tab value="profile">Profile</Tabs.Tab>
    <Tabs.Tab value="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="profile">Profile content</Tabs.Panel>
  <Tabs.Panel value="settings">Settings content</Tabs.Panel>
</Tabs>
```

### Controlled

```tsx
const [tab, setTab] = useState("profile");

<Tabs value={tab} onValueChange={setTab}>
  <Tabs.List>...</Tabs.List>
  <Tabs.Panel value="profile">...</Tabs.Panel>
</Tabs>
```

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `value` | — | Controlled tab value |
| `defaultValue` | — | Initial value (uncontrolled) |
| `onValueChange` | — | `(value: string) => void` |
| `orientation` | `horizontal` | `horizontal` \| `vertical` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `variant` | `default` | `default` \| `outline` \| `secondary` \| `gloss` |
| `disabled` | `false` | Disables the entire group |
| `className` | — | On root `<div>` |
| `classNames` | — | Slots |

### Compound subparts

| Part | Purpose |
|------|---------|
| `Tabs.List` | `role="tablist"`, indicator, keyboard nav |
| `Tabs.Tab` | Tab button; `value`, `asChild`, `disabled` |
| `Tabs.Panel` | `role="tabpanel"`, `value` |

### `TabsClassNames`

`root`, `list`, `indicator`, `tab`, `tabText`, `panel`.

## variant and sizes

| variant | List surface | Indicator |
|---------|--------------|-----------|
| `default` | border-bottom/left line | `bg-primary` 2px line |
| `outline` | `bg-transparent border-token rounded-mid` | tab bbox, `bg-secondary` |
| `secondary` | `bg-secondary border-token rounded-mid` | bbox, `bg-tertiary` |
| `gloss` | `gloss-panel rounded-mid` | bbox, `bg-tertiary` |

No `status` — only `variant` + `size`.

| size | Tab height | Text variant |
|------|------------|--------------|
| `small` | `CONTROL_SIZE_LAYOUT.small` | `small` |
| `base` | `CONTROL_SIZE_LAYOUT.base` | `base` |
| `mid` | `CONTROL_SIZE_LAYOUT.mid` | `mid` |
| `large` | `CONTROL_SIZE_LAYOUT.large` | `large` |

## Animations

`tabsAnimations.ts` + `useSlidingTabIndicator.ts` + gloss on `Tabs.List`.

**DOM:**

```
<div class=root>
  <div role=tablist class=list ref=listRef>
    <span class=indicator />              ← layout left/top/w/h; GSAP x/y/scaleX/scaleY (FLIP)
    <button role=tab>
      <Text ref=motionRef class=tabText>  ← hover squeeze (not selected)
  <div role=tabpanel hidden=...>
```

### 1. Sliding indicator (`useSlidingTabIndicator`)

On `value` change / resize:

1. Finds the selected tab in the list
2. Computes metrics (bbox or 2px line for `default`)
3. Sets layout `left/top/width/height` instantly; FLIP via GSAP `x/y/scaleX/scaleY` (`transform-origin: 0 0`) + `motionInteractive()`
4. `ResizeObserver` on list + tabs → recalculation

**First layout / reduced motion:** instant layout + clear transform, no tween.

#### Customization

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  interactiveEase: "power2.out",
});
```

### 2. Tab text hover/press (`useTabPointerMotion`)

Only **inactive** tabs (`!isSelected`):

- **Hover:** `animateInteractiveHoverLift` on `tabText` span
- **Press:** `animateInteractivePressSqueeze`

Selected tab — no motion (static primary text).

`asChild` — motion is not applied (no internal `Text` ref).

### 3. Gloss list (`variant="gloss"`)

`useMergedGlossPanelRef` on `Tabs.List` — gloss box-shadow/lift for the list panel.

### What's not included

- Press squeeze on selected tab
- Portal motion
- Ripple
- `status` semantic colors

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Indicator slide | `useSlidingTabIndicator` | `interactiveDuration`, `interactiveEase` | `variant`, `orientation` |
| Tab text hover/squeeze | `useTabPointerMotion` | `hoverLiftScale`, `pressSqueezeScale` | `disabled`, selected |
| Gloss list | gloss utils | gloss tokens | `variant="gloss"` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `tabsRootClass` | `flex gap-large`, orientation row/col |
| `LIST_VARIANT_CLASS` | Surface per variant |
| `INDICATOR_VARIANT_CLASS` | Indicator color/shape |
| `CONTROL_SIZE_LAYOUT` | Tab height/padding per size |
| `TEXT_COLOR_TRANSITION` | Muted → primary hover |
| `focus-ring` | Keyboard focus on tab/panel |

## Styling and customization

### Two levels

1. **`className` on `Tabs`** — root layout.
2. **`classNames` on root** — list, indicator, tab, panel.

`Tabs.Tab` / `Tabs.Panel` — **`className`** on top of the `tab` / `panel` slot.

### `TabsClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | Root wrapper | Max-width, outer border |
| `list` | `tablist` | Background ring, padding |
| `indicator` | Sliding span | Custom indicator color/shape |
| `tab` | Tab button | Font, padding override |
| `tabText` | Inner Text span | Gap icons, typography |
| `panel` | `tabpanel` | Content area bg/padding |

### Customization example

```tsx
<Tabs
  defaultValue="a"
  classNames={{
    root: "max-w-xl rounded-mid border border-info/25 p-base",
    list: "bg-info/5 ring-1 ring-info/15",
    indicator: "bg-info/30",
    tab: "font-medium",
    tabText: "gap-small",
    panel: "rounded-small bg-info/5 p-large",
  }}
>
  <Tabs.List>
    <Tabs.Tab value="a">Tab A</Tabs.Tab>
    <Tabs.Tab value="b">Tab B</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="a">Content A</Tabs.Panel>
  <Tabs.Panel value="b">Content B</Tabs.Panel>
</Tabs>
```

### `asChild` on Tab

```tsx
<Tabs.Tab value="custom" asChild>
  <Button variant="ghost" type="button">Custom tab</Button>
</Tabs.Tab>
```

Handlers and ARIA merge onto the child; text motion is disabled.

### Practical notes

- Each `Tabs.Tab` and `Tabs.Panel` must have a unique `value`.
- `disabled` on root blocks all tabs; per-tab — `disabled` on `Tabs.Tab`.
- Vertical: `orientation="vertical"` + keyboard `ArrowUp`/`ArrowDown`.
- **Do not set `transform` on `indicator`** — GSAP owns `x/y/scaleX/scaleY` (FLIP); layout `left/top/width/height` is set instantly.
- **Merge order:** variant/size → `classNames.slot` → `className` tab/panel.

## Integrations

| Component | Scenario |
|-----------|----------|
| `Button` | `asChild` trigger tab |
| `Badge` | Counter on tab label |
| `Card` | Panel content layout |

## Accessibility

- Tab: `role="tab"`, `aria-selected`, `aria-controls`, roving `tabIndex`
- Panel: `role="tabpanel"`, `aria-labelledby`, `hidden` when not selected
- List: `aria-orientation`, keyboard `Home`/`End`/arrows
- Indicator: `aria-hidden`
- IDs: `{baseId}-tab-{value}`, `{baseId}-panel-{value}`

## File structure

```
Tabs/
├── Tabs.tsx
├── index.ts
├── tabsTypes.ts
├── tabsStyles.ts
├── tabsAnimations.ts
├── tabsParts.tsx
├── useTabsRootState.ts
├── useSlidingTabIndicator.ts
├── tabsContext.tsx
├── tabsAPI.ts
├── tabsA11y.ts
└── Tabs.stories.tsx
```

## Storybook

`Core Components/Tabs` — default, vertical, variants, sizes, controlled, disabled, `CustomClassNames`.
