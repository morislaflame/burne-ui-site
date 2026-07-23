# Input

Text field with a shell, affix slots, and `text` / `number` / `password` / `file` types. Simple and compound API. Integrates with `Form`, `ButtonGroup`, and `FieldLabelContext`.

## Import

```tsx
import {
  Input,
  type InputProps,
  type InputSimpleProps,
  type InputRootProps,
  type InputVariant,
  type InputStatus,
  type InputSize,
  type InputClassNames,
} from "burne-ui";
```

## API

### Compound

```tsx
<Input label="Email" hint="…" status="danger" required>
  <Input.Label>Email</Input.Label>
  <Input.Control type="email" autoComplete="email" />
  <Input.Hint>Format: name@domain.tld</Input.Hint>
  <Input.Error>Invalid address</Input.Error>
</Input>
```

| Part | Purpose |
|------|---------|
| `Input` / `Input.Root` | `Field` + context |
| `Input.Label` | Alias for `Label` |
| `Input.Control` | Shell + `<input>` |
| `Input.Hint` | Hint text |
| `Input.Error` | Error (`role="alert"`) |

### Simple API

```tsx
<Input
  label="Email"
  hint="Format: name@domain.tld"
  error={invalid ? "Enter a valid address." : undefined}
  status={invalid ? "danger" : "default"}
  required
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### `Input.Control` props (key)

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `outline` \| `gloss` |
| `status` | `default` | `default` \| `danger` \| `success` \| `warning` |
| `size` | `base` | `small` \| `base` \| `mid` \| `large` |
| `inputType` | `text` | `text` \| `number` \| `password` \| `file` |
| `prefix` / `suffix` | — | Affix slots (not for `file`) |
| `groupSegment` | — | `ButtonGroup` segment |
| `classNames` | — | See below |

### `InputClassNames`

`root`, `label`, `shell`, `control`, `prefix`, `suffix`, `passwordToggle`, `fileArea`, `fileEmpty`, `fileRow`, `fileGlyph`, `filePreview`, `fileRemove`, `hint`, `error`.

### Field types (`inputType`)

| `inputType` | Details |
|-------------|---------|
| `text` | Standard input |
| `number` | `type="number"` |
| `password` | Toggle visibility (`IoEye` / `IoEyeOff`) |
| `file` | Drag area, preview, multi-file, remove with exit animation |

## variant and status

| variant | Shell |
|---------|-------|
| `default` | `bg-surface border-token` |
| `outline` | transparent + `border-token` |
| `gloss` | `gloss-control` |

With `status` danger/success/warning — tint background (`bg-surface-tint-*`). Affix: `bg-primary-tint` or status tint.

## Sizes

From `CONTROL_SIZE_LAYOUT`: `h-control-*`, `controlPad`, toggle icon/pad for password.

## Animations

Motion: `inputAnimations.ts` → `useInputShellMotion` + `animateInputFileRowExit`.

**DOM structure (text/password):**

```
Field
  Label
  <div data-slot="input-shell" ref=shellRef>   ← motion target
    [prefix affix]
    <input class="control" />
    [suffix / password toggle]
  Hint / Error
```

### 1. Shell hover lift (2nd level, `variant !== "gloss"`)

`useFieldShellHoverLift(shellRef, enabled)`:

- **enabled** when `!blocked && !isGloss && groupSegment == null`
- **Init:** `shadow-token-sm` on shell (`--el-shadow`)
- **Pointer enter/leave:** sm → md + adaptive scale lift
- Classes: `animate-shadow`, `field-shell-transition`, `focus-within-ring`
- CSS hover background: `fieldShellHoverClass(status)` — tint on hover/focus-within

**ButtonGroup:** when `groupSegment` is set, shell hover is **disabled** — glue with adjacent segments.

#### Customizing hover

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.025,
  hoverLiftEase: "sine.inOut",
  interactiveDuration: 280,
  enableHoverLift: true,
});
```

**Reduced motion / touch:** `shouldSkipInteractiveHoverLift()`.

### 2. Shell press squeeze (standard)

On shell `pointerdown` (not on affix buttons — they `stopPropagation`):

1. Checks: `!blocked`, `!isGloss`, `groupSegment == null`, not `defaultPrevented`
2. `animateInteractivePressSqueeze(shell)` — adaptive squeeze on the entire shell

Does not run for `gloss` (separate path) or inside `ButtonGroup`.

### 3. Gloss shell (`variant="gloss"`)

`useGlossFieldShellMotion(shellRef, enabled)`:

| Event | Action |
|-------|--------|
| pointer enter/leave | `animateGlossInteractiveHoverLift` |
| pointer down | gloss press squeeze (`onShellPointerDown`) |
| focus in/out (capture) | sync lift when focus is inside shell |
| ResizeObserver | `refreshGlossInteractiveState` |

Class: gloss-control motion from `glossInteractive.css`.  
`data-gloss-disabled` when `blocked && gloss`.

**ButtonGroup + gloss:** shell hover/squeeze disabled when `groupSegment` is set.

### 4. File row exit (`inputType="file"`)

When removing a file from the list:

```ts
animateInputFileRowExit(rowEl):
  gsap.to(rowEl, {
    scale: 0.94,
    y: "-0.5rem",
    autoAlpha: 0,
    ...motionInteractive(),
  });
```

**Reduced motion:** instant removal without GSAP.

After complete — update `files` via `DataTransfer`.

### 5. Password / file buttons

Password toggle and file remove — **CSS** `hoverVariant`, `TEXT_COLOR_TRANSITION`, no GSAP on shell.

### Summary: what is configured where

| Animation | Utility | `configureMotion` | Conditions |
|-----------|---------|-------------------|------------|
| Shell hover sm→md | `useFieldShellHoverLift` | `enableHoverLift`, `hoverLiftScale` | !gloss, !groupSegment |
| Shell squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale`, `enablePressSqueeze` | !gloss, !groupSegment |
| Gloss shell | `useGlossFieldShellMotion` | interactive | variant=gloss |
| File row exit | `animateInputFileRowExit` | `interactiveDuration` | inputType=file |
| Affix hover | CSS | — | — |

## Integration

| Context | Behavior |
|---------|----------|
| `Form` | `error` from `getError(name)`, `size`, `disabled` |
| `ButtonGroup` | `groupSegment`, `variant` gloss, no shell hover |
| `FieldLabelContext` | auto `htmlFor`, `labelId`, `required` |

## Styling and customization

### Two levels

1. **`className` on root** — additional classes on the `Field` wrapper (merged with `classNames.root`).
2. **`classNames` on root** — per-slot overrides via `InputClassNamesProvider`; all subparts read from context.

In compound API, slots from root `classNames` apply to all parts. Additionally, each subpart accepts its own **`className`**, merged on top of the context slot (`mergeInputSlotClass`).

### `InputClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------|
| `root` | `Field` | Spacing, max-width, border around the entire field |
| `label` | `Label` (simple and `Input.Label`) | Typography, label spacing |
| `shell` | `[data-slot="input-shell"]` | Shell: ring, border, min-height, hover/focus (be careful with motion classes) |
| `control` | `<input>` | Font, placeholder, padding inside shell |
| `prefix` / `suffix` | Affix slots | Icon background, affix spacing |
| `passwordToggle` | Password visibility button | Hit area size, icon color |
| `fileArea` | File UI container | Drag-zone / list layout |
| `fileEmpty` | Empty zone + icon | Dashed area, “Select file” text |
| `fileRow` | Selected file row | Row gap, padding |
| `filePreview` | `<img>` preview | Preview size |
| `fileGlyph` | File icon without preview | Glyph size |
| `fileRemove` | File remove button | Remove hit area |
| `hint` / `error` | `Field.Hint` / `Field.Error` | Hint/error color and size |

`variant`, `status`, and `size` set base tokens in `inputStyles.ts`. `classNames` **extend** them without canceling variant logic (except for explicit Tailwind overrides).

### Simple API

All field and control props — on a single `Input`. Slot styles — via `classNames` on root:

```tsx
<Input
  className="max-w-sm"
  classNames={{
    root: "rounded-mid border border-primary/20 p-base",
    root: "ring-1 ring-primary/15",
    control: "text-primary placeholder:text-primary/50",
    prefix: "bg-surface-elevated text-muted",
    hint: "text-foreground/70",
    error: "font-medium",
  }}
  label="Email"
  placeholder="you@example.com"
  prefix={<IoSearch aria-hidden />}
  status="danger"
  hint="We do not share your address with third parties."
  error="Enter a valid email."
/>
```

For `inputType="file"`, additionally: `fileArea`, `fileEmpty`, `fileRow`, `filePreview`, `fileRemove`.

### Compound API

`classNames` on root + **`className` on each part** for local tweaks. You can reorder and wrap parts:

```tsx
<Input
  status="danger"
  required
  classNames={{
    root: "max-w-md gap-small",
    root: "border-primary/30",
    hint: "text-xs",
  }}
>
  <Input.Label className="uppercase tracking-wide">
    Email
  </Input.Label>

  <div className="relative">
    <Input.Control
      className="pr-large"
      placeholder="you@example.com"
      prefix={<IoMail aria-hidden />}
    />
  </div>

  <Input.Hint>Service email address</Input.Hint>
  <Input.Error className="text-danger">Invalid format</Input.Error>
</Input>
```

`Input.Label` also accepts nested `classNames` from the `Label` component (`root`, `text`, `required`) — they merge with `classNames.label` from Input context.

`Input.Control` inherits `variant`, `status`, and `size` from field context (or props). Affix (`prefix` / `suffix`) — only on `Control`.

### Practical notes

- **Shell vs control:** shadow and hover lift attach to `shell`; text and caret — to `control`.
- **Gloss:** do not override `gloss-control` on shell unless necessary — it breaks gloss motion.
- **ButtonGroup:** when `groupSegment` is set, shell hover is disabled; the group sets segment styles.
- **Merge order:** `base styles` → `classNames.slot` → `className` on subpart.

## Accessibility

- `joinFieldDescribedBy(hintId, errorId)` on control
- `aria-invalid` when `status="danger"`
- `aria-required` from `required`
- Password toggle: `aria-label`, `aria-pressed`
- File remove: `aria-label`

## File structure

```
Input/
├── Input.tsx
├── index.ts
├── inputTypes.ts
├── inputStyles.ts
├── inputAnimations.ts       # shell motion + file exit
├── inputParts.tsx           # InputControl, file UI
├── useInputRootState.ts
├── inputContext.tsx
├── inputAPI.ts
├── inputA11y.ts
└── Input.stories.tsx
```

## Storybook

`Core Components/Input` — simple/compound, variant, status, password, file, gloss, ButtonGroup segment, `classNames`.
