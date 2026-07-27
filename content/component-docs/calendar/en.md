# Calendar

Date picker calendar: **single**, **range**, **multiple**. Views: days → months → years. Compound default content or custom layout via `Header` / `Grid` / `Footer`.

## Import

```tsx
import {
  Calendar,
  RU_LOCALE,
  useCalendar,
  type CalendarProps,
  type CalendarMode,
  type CalendarView,
  type CalendarVariant,
  type CalendarSize,
  type CalendarRangeValue,
  type CalendarLocale,
  type CalendarClassNames,
} from "burne-ui";
```

## API

### Simple (default content)

```tsx
<Calendar
  mode="single"
  defaultValue={new Date()}
  onValueChange={setDate}
/>
```

### Range

```tsx
<Calendar
  mode="range"
  defaultValue={{ start: null, end: null }}
  onValueChange={setRange}
/>
```

### Compound

```tsx
<Calendar mode="range" variant="outline" size="base" locale={RU_LOCALE}>
  <Calendar.Header />
  <Calendar.Grid />
  <Calendar.Footer />
</Calendar>
```

If `children` are not passed — `CalendarDefaultContent` is rendered.

### Common props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `secondary` \| `outline` \| `gloss` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `defaultMonth` | today | Initial month for the view |
| `initialView` | `days` | `days` \| `months` \| `years` |
| `locale` | built-in RU | Weekdays, months, Today/Clear labels |
| `minDate` / `maxDate` | — | Selection constraints |
| `classNames` | — | Slots |

### Mode-specific value

| Mode | `value` / `onValueChange` |
|------|---------------------------|
| `single` | `Date \| null` |
| `range` | `CalendarRangeValue` (`start`, `end`) |
| `multiple` | `Date[]` |

### `CalendarClassNames`

`root`, `glossContent`, `header`, `navPrev`, `navNext`, `headerTitle`, `grid`, `weekdayGrid`, `weekdayCell`, `daysGrid`, `dayCellWrapper`, `rangeHalfFill`, `dayCell`, `monthsGrid`, `monthCell`, `yearsGrid`, `yearCell`, `cell`, `cellFill`, `cellText`, `cellTodayDot`, `footer`, `footerToday`, `footerClear`.

### Compound subparts

| Part | Purpose |
|------|---------|
| `Calendar.Header` | Nav prev/next + title (drill-up view) |
| `Calendar.Grid` | Weekdays + day/month/year cells |
| `Calendar.Footer` | Today / Clear actions |

### `useCalendar()`

Hook from context: `view`, `viewDate`, `selectedDates`, `rangeStart`/`rangeEnd`, `onDayPress`, `onClear`, `onToday`, and more.

## variant and sizes

| variant | Root surface |
|---------|--------------|
| `default` | `rounded-large border-token bg-surface shadow-token-sm` |
| `secondary` | `bg-secondary` |
| `outline` | `bg-transparent border-token` |
| `gloss` | `gloss-panel gloss-deep` + `glossContent` |

| size | `min-w` | root padding | day cell |
|------|---------|--------------|----------|
| `small` | `15.5rem` | `p-small` | `max-w-control-small` |
| `base` | `18rem` | `p-large` | `max-w-control-base` |
| `mid` | `21rem` | `p-large` | `max-w-control-mid` |
| `large` | `24rem` | `p-xlarge` | `max-w-control-large` |

Nav buttons: `CALENDAR_NAV_BTN` per size. Weekday labels — uppercase muted `weekdayCell`.

## Behavior

- Click title in header — switch view: `days` → `months` → `years`
- Range mode: hover preview + half-fill between `rangeStart` and hover/current day
- Disabled days outside `minDate`/`maxDate` — `aria-disabled`, no handlers
- `RU_LOCALE` is exported; custom `locale` for other languages
- `useCalendar()` — access to state from compound children

## Animations

`calendarAnimations.ts` + `useToggleButtonFillAnimation` from ToggleButton utils.

**DOM (day cell):**

```
<div class=dayCellWrapper>             ← range half-fill bands (absolute)
  <CalendarRangeHalfFill side=left|right />
  <button class=dayCell ref=btn>       ← hover lift + squeeze
    <span class=cellFill ref=fill />   ← GSAP fill on selected
    <Text class=cellText>12</Text>
    <span class=cellTodayDot />        ← today marker
```

**DOM (nav):**

```
<Calendar.Header>
  <button class=navPrev ref>           ← hover lift + squeeze
  <button class=headerTitle>           ← drill-up view (CSS hover only)
  <button class=navNext ref>
```

### 1. Nav buttons (`useCalendarNavButtonAnimations`)

**Pointer enter:** `animateInteractiveHoverLift(el, true)` — scale lift without second-level shadow (1st level).

**Pointer leave:** lift reverse.

**Pointer down:** `animateInteractivePressSqueeze(el, { pointerInside })`.

**Disabled:** handlers no-op.

Slots: `classNames.navPrev`, `navNext`.

#### Customizing nav/cell interactive

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.03,
  pressSqueezeScale: [1, 0.96, 1],
  interactiveDuration: 280,
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

**Reduced motion:** `shouldSkipInteractiveHoverLift()` / `prefersReducedInteractiveHoverLift()` — no lift/squeeze.

### 2. Day / month / year cells (`useCalendarInteractiveCellAnimations`)

Same pipeline as nav: hover lift + press squeeze on `<button>`.

`CalendarInteractiveCellInner` combines:

- motion handlers
- `useToggleButtonFillAnimation(selected, fillRef)` on `cellFill`
- today dot when `isToday && !selected`

`cellKind`: `day` | `month` | `year` → different slots (`dayCell`, `monthCell`, `yearCell`).

### 3. Selection fill (`useToggleButtonFillAnimation`)

`cellFill` span — GSAP scale/opacity fill on `selected` / `aria-pressed`:

- Same as `ToggleButton` / `Switch` fill
- **Do not override `transform` on `cellFill` in CSS**

```ts
configureMotion({
  enableToggleButtonFill: true,
  // selection fill ease/duration — shared toggle tokens
});
```

### 4. Range half-fill (`CalendarRangeHalfFill`)

In `mode="range"` between `rangeStart` and hover/current day:

**DOM:** absolute band `rangeHalfFill` (`bg-default-hover`) left/right of cell.

**Visible toggle:** `motionContentFade()` → `autoAlpha` 0↔1.

**First layout:** instant opacity (no fade on mount).

**Reduced motion:** instant show/hide.

Uses `tooltipDuration` + `interactiveEase` from `motionContentFade()` (not separate `contentFade*` keys).

### 5. Header title drill-up

Click title → `days` → `months` → `years`. CSS `hover:text-primary` only — no GSAP.

### What's not included

- Portal motion (inline panel)
- Ripple
- FLIP on month grid change
- Second-level persistent shadow on root (`shadow-token-sm` in CSS)

### Summary: what is configured where

| Animation | Utility | `configureMotion` keys | Local prop |
|-----------|---------|------------------------|------------|
| Nav hover/squeeze | `useCalendarNavButtonAnimations` | `hoverLiftScale`, `pressSqueezeScale` | `disabled` on nav |
| Cell hover/squeeze | `useCalendarInteractiveCellAnimations` | interactive tokens | `disabled` on day |
| Selected fill | `useToggleButtonFillAnimation` | `enableToggleButtonFill` | `selected` state |
| Range band fade | `motionContentFade` | `tooltipDuration`, `interactiveEase` | `mode="range"` |
| Today dot | CSS static | — | `isToday` |

## Tokens and CSS

| Class / token | Purpose |
|---------------|---------|
| `CALENDAR_ROOT_SURFACE` | Variant backgrounds + `shadow-token-sm` |
| `CALENDAR_RANGE_HALF_FILL_CLASS` | `absolute inset-y-0 bg-default-hover` |
| `CALENDAR_HEADER_TITLE_INTERACTIVE_CLASS` | Drill-up title hover |
| `CALENDAR_CELL_FILL_CLASS` | Fill layer under day text |
| `CALENDAR_CELL_TODAY_DOT_CLASS` | "Today" marker |
| `gloss-panel gloss-deep` | Gloss variant shell |
| `max-w-control-*` | Square day/month/year hit targets |

## Styling and customization

### Two levels

1. **`className` on `Calendar`** — root panel (`calendarRootClass`).
2. **`classNames` on root** — header, grid, cells, footer via provider.

Compound subparts (`Header`, `Grid`, `Footer`) do not accept a separate `classNames` prop — only root `classNames` + context.

### `CalendarClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | Root panel | Outer border, custom min-width |
| `glossContent` | Gloss inner flex | Padding in gloss variant |
| `header` | Header row | Gap nav/title |
| `navPrev` / `navNext` | Nav buttons | Icon button size/color |
| `headerTitle` | Title button | Month/year label typography |
| `grid` | Grid container | Vertical rhythm |
| `weekdayGrid` / `weekdayCell` | Weekday row | Muted labels, uppercase |
| `daysGrid` | 7-column grid | Gap between weeks |
| `dayCellWrapper` | Cell + range bands | Position relative for half-fill |
| `rangeHalfFill` | Range band | Custom range preview color |
| `dayCell` | Day button | Radius, aspect ratio |
| `monthCell` / `yearCell` | Picker cells | Month/year view buttons |
| `cell` | Shared cell shell | Shared styles for all cell kinds |
| `cellFill` | Fill span | Selected bg shape (not transform!) |
| `cellText` | Day number Text | Font size per size |
| `cellTodayDot` | Today marker | Dot color/position |
| `footer` | Footer row | Today/Clear layout |
| `footerToday` / `footerClear` | Action buttons | Link-style actions |

### Simple (default content)

```tsx
<Calendar
  mode="single"
  variant="outline"
  size="base"
  defaultValue={new Date()}
  classNames={{
    root: "border-primary/30 shadow-token-md",
    dayCell: "rounded-full",
    cellFill: "rounded-full bg-primary",
  }}
/>
```

### Compound range with custom slots

```tsx
<Calendar
  mode="range"
  locale={RU_LOCALE}
  classNames={{
    root: "rounded-large border-primary/30 bg-primary/5 shadow-token-md",
    headerTitle: "font-semibold text-primary",
    weekdayCell: "text-primary/70 uppercase tracking-wide",
    dayCell: "rounded-full",
    cellFill: "rounded-full bg-primary",
    rangeHalfFill: "bg-primary/15",
    footerToday: "text-primary font-medium",
    footerClear: "text-muted hover:text-foreground",
  }}
>
  <Calendar.Header />
  <Calendar.Grid />
  <Calendar.Footer />
</Calendar>
```

Controlled range for forms:

```tsx
const [range, setRange] = useState<CalendarRangeValue>({ start: null, end: null });

<Calendar mode="range" value={range} onValueChange={setRange} />
```

### Practical notes

- **Without `children`** — `CalendarDefaultContent` is rendered (Header + Grid + Footer).
- **`locale`:** export `RU_LOCALE`; for EN pass your own labels/weekdays object.
- **`variant="gloss"`:** content in `glossContent`; panel styles on root.
- **`minDate` / `maxDate`:** disabled cells are not focusable, no press handlers.
- **Range hover preview:** half-fill bands are managed by context; do not remove `dayCellWrapper` positioning.
- **Do not override `cellFill` transform** — fill animation from ToggleButton util.
- **Merge order:** size/variant tokens → `classNames.slot` → per-cell `className` (if API adds it).

## Integrations

| Component | Scenario |
|-----------|----------|
| `DateField` / forms | Embedded picker |
| `Popover` | Calendar in dropdown panel |
| `ToggleButton` | Shared fill animation util |

## Accessibility

- Nav buttons: `aria-label` (back/forward)
- Cells: `aria-label` with full date, `aria-selected`
- Disabled cells: not focusable
- Footer: Today / Clear as buttons
- Keyboard: focusable day cells

## File structure

```
Calendar/
├── Calendar.tsx
├── index.ts
├── calendarTypes.ts
├── calendarStyles.ts
├── calendarAnimations.ts
├── calendarParts.tsx
├── useCalendarRootState.ts
├── calendarContext.tsx
├── calendarAPI.ts
├── calendarA11y.ts
├── calendarLocale.ts
└── Calendar.stories.tsx
```

## Storybook

`Core Components/Calendar` — single/range/multiple, sizes, variants, views, gloss, `classNames`.
