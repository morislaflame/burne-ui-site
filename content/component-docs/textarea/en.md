# TextArea

Multiline field with shell, optional resize handle, and the same variant/status as Input. Simple and compound API.

## Import

```tsx
import {
  TextArea,
  type TextAreaProps,
  type TextAreaSimpleProps,
  type TextAreaVariant,
  type TextAreaStatus,
  type TextAreaSize,
  type TextAreaClassNames,
} from "burne-ui";
```

## API

### Compound

```tsx
<TextArea label="Description" hint="Up to 500 characters" rows={4}>
  <TextArea.Label>Description</TextArea.Label>
  <TextArea.Control placeholder="…" />
  <TextArea.Hint>Up to 500 characters</TextArea.Hint>
</TextArea>
```

| Part | Purpose |
|------|---------|
| `TextArea` | Root + Field |
| `TextArea.Label` | `Label` |
| `TextArea.Control` | Shell + `<textarea>` + resize |
| `TextArea.Hint` / `TextArea.Error` | Same as Input |

### Simple API

```tsx
<TextArea
  label="Comment"
  rows={3}
  resizable
  placeholder="Your feedback…"
/>
```

### `TextArea.Control` props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `default` | `default` \| `outline` \| `gloss` |
| `status` | `default` | semantic tint |
| `size` | `base` | padding / min-height size |
| `rows` | `1` | Native rows |
| `resizable` | `true` | Drag handle in the corner |
| `classNames` | — | `root`, `shell`, `control`, `resizeHandle`, … |

### `TextAreaClassNames`

`root`, `label`, `shell`, `control`, `resizeHandle`, `hint`, `error`.

## variant and status

Same as Input: `default` / `outline` / `gloss`; status tint for danger/success/warning.

## Sizes

`TEXTAREA_MIN_H`: `min-h-control-*` on shell. Control padding — `CONTROL_SIZE_LAYOUT[size].controlPad`.

`field-sizing: content` on textarea — auto-grow with content (CSS).

## Animations

`textAreaAnimations.ts` + `useTextAreaResize.ts`.

**DOM structure:**

```
Field.Root
  Label
  <div data-slot="textarea-shell" ref=shellRef>
    <textarea ref=textareaRef />
    [button data-textarea-resize-handle]   ← optional
  Hint / Error
```

### 1. Shell hover lift (standard, `variant !== "gloss"`)

`useFieldShellHoverLift(shellRef, !blocked && !isGloss)`:

- Rest: `shadow-token-sm`
- Hover: sm → md + scale lift
- `fieldShellHoverClass(status)` — CSS tint on hover/focus-within
- Class: `standardShellHoverMotionClass` → `animate-shadow`

### 2. Shell press squeeze

`useTextAreaShellMotion` → `handleShellPointerDown`:

1. Ignore if target is inside `[data-textarea-resize-handle]`
2. **Gloss:** `glossShellMotion.onShellPointerDown()` (gloss squeeze)
3. **Standard:** `animateInteractivePressSqueeze(shell)`

### 3. Gloss shell (`variant="gloss"`)

`useGlossFieldShellMotion`:

- pointer enter/leave → gloss hover lift
- focus capture in/out → lift when textarea is focused
- `glossShellHoverMotionClass` on shell
- ResizeObserver for gloss state refresh

### 4. Resize handle (not GSAP)

`useTextAreaResize(shellRef, resizable, blocked, size)`:

**pointerdown** on handle → `setPointerCapture`

**pointermove:**

```ts
nextHeight = clamp(
  minHeight,                          // readControlHeightPx(size)
  startHeight + (clientY - startY),
  MAX_HEIGHT_PX,                      // 640
);
shell.style.height = `${nextHeight}px`;
```

**pointerup:** release capture, listeners off.

- Minimum — control height for the size from tokens
- Maximum — **640px** (constant, not in `configureMotion`)
- When `resizable={false}` — inline `height` is cleared in `setShellRef`

**Important:** resize is not animated — instant cursor tracking.

### Customizing shell motion

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  hoverLiftScale: 1.025,
  interactiveDuration: 280,
  pressSqueezeScale: [1, 0.98, 1],
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

**Locally:** `resizable={false}` — no handle; `disabled` / `readOnly` → `blocked`, no hover/squeeze.

### Summary: what is configured where

| Animation | Utility | `configureMotion` | Hardcode |
|-----------|---------|-------------------|----------|
| Shell hover | `useFieldShellHoverLift` | `enableHoverLift`, `hoverLiftScale` | — |
| Shell squeeze | `animateInteractivePressSqueeze` | `pressSqueezeScale` | — |
| Gloss shell | `useGlossFieldShellMotion` | interactive | variant=gloss |
| Drag resize | `useTextAreaResize` | — | `MAX_HEIGHT_PX=640` |
| Content growth | CSS `field-sizing: content` | — | — |

## Styling and customization

### Two levels

1. **`className` on root** — classes on `Field.Root` (merged with `classNames.root`).
2. **`classNames` on root** — slots via `TextAreaClassNamesProvider`.

In compound API each subpart (`TextArea.Control`, `TextArea.Label`, …) accepts **`className`**, merged on top of the slot from context.

### `TextAreaClassNames` slots

| Slot | DOM / element | When to use |
|------|---------------|-------------|
| `root` | `Field.Root` | Max-width, outer spacing, field border |
| `label` | `Label` | Label typography |
| `shell` | `[data-slot="textarea-shell"]` | Min-height, ring, border; inline `height` from resize goes here too |
| `control` | `<textarea>` | Line-height, padding, `field-sizing` behavior |
| `resizeHandle` | `[data-textarea-resize-handle]` | Grip visibility, hit area (only when `resizable`) |
| `hint` / `error` | `Field.Hint` / `Field.Error` | Hint and error |

`variant`, `status`, `size` — base surface and padding from `textAreaStyles.ts`. `classNames` extend, they do not automatically replace variant.

### Simple API

```tsx
<TextArea
  className="max-w-md"
  classNames={{
    root: "rounded-mid border border-primary/20 p-base",
    shell: "min-h-[12rem] ring-1 ring-primary/15",
    control: "text-primary placeholder:text-primary/50 leading-relaxed",
    resizeHandle: "opacity-60 hover:opacity-100",
    hint: "text-foreground/70",
    error: "font-medium",
  }}
  label="Comment"
  placeholder="Your feedback…"
  rows={3}
  resizable
  status="danger"
  hint="Up to 500 characters."
  error="Text is too short."
/>
```

### Compound API

```tsx
<TextArea
  variant="outline"
  classNames={{
    root: "max-w-lg",
    shell: "border-token/60",
  }}
>
  <TextArea.Label className="font-semibold">
    Task description
  </TextArea.Label>

  <TextArea.Control
    className="text-mid"
    rows={5}
    resizable={false}
    placeholder="Details…"
  />

  <TextArea.Hint className="italic">
    Visible to all participants
  </TextArea.Hint>
</TextArea>
```

`TextArea.Label` supports nested `classNames` from the `Label` component — merged with `classNames.label` from context.

When `resizable={false}`, the `resizeHandle` slot is not rendered.

### Practical notes

- **Height:** minimum — via `rows` + `size`; drag-resize writes `height` on `shell`; content auto-grow — CSS `field-sizing: content` on `control`.
- **Shell vs control:** hover-lift and squeeze on `shell`; line breaks and scroll — on `control`.
- **Gloss:** same as Input — do not break `gloss-control` on shell without need.
- **Merge order:** base styles → `classNames.slot` → subpart `className`.

## Accessibility

- `aria-describedby` via hint/error ids
- Resize handle: `aria-label` ("Resize height")
- `aria-invalid`, `aria-required` same as Input

## File structure

```
TextArea/
├── TextArea.tsx
├── index.ts
├── textAreaTypes.ts
├── textAreaStyles.ts
├── textAreaAnimations.ts    # useTextAreaShellMotion
├── useTextAreaResize.ts     # pointer resize
├── textAreaParts.tsx
├── useTextAreaRootState.ts
└── TextArea.stories.tsx
```

## Storybook

`Core Components/TextArea` — simple/compound, resizable, gloss, status, `classNames`.
