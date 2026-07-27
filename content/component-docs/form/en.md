# Form

Composite wrapper around `<form>`: state machine (values, errors, touched, submit), field binding by `name`, validation, and a11y announce. **Compound API only** — layout from `Title`, `Section`, `Field`, `Actions`.

## Import

```tsx
import {
  Form,
  useFormField,
  type FormProps,
  type FormSectionProps,
  type FormClassNames,
  type FormValues,
  type FormFieldRules,
  type FormResolver,
  type FormValidateMode,
} from "burne-ui";
```

Extended API (for control authors) — from `@/components/composite/Form`: `useFormControlProps`, `useFormFieldBinding`, `useFormBindingContext`.

## API

### Compound API

```tsx
<Form
  aria-label="Profile"
  defaultValues={{ name: "", email: "" }}
  rules={{
    name: { required: "Enter your name" },
    email: { required: true, pattern: { value: /\S+@\S+/, message: "Invalid email" } },
  }}
  onSubmit={(values) => console.log(values)}
>
  <Form.Title>Profile</Form.Title>
  <Form.Description>Update your account details.</Form.Description>
  <Form.Section>
    <Form.Field name="name">
      <Input name="name" label="Name" required />
    </Form.Field>
    <Form.Field name="email">
      <Input name="email" label="Email" type="email" />
    </Form.Field>
  </Form.Section>
  <Form.Actions>
    <Button type="submit">Save</Button>
  </Form.Actions>
</Form>
```

`FormRoot` automatically renders `<Form.Announce>` and `<Form.ErrorSummary>` — **do not duplicate** them in children.

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `defaultValues` | `{}` | Initial values (uncontrolled) |
| `values` | — | Controlled values |
| `onValuesChange` | — | Callback on change |
| `rules` | — | `Record<string, FormFieldRules>` at form level |
| `resolver` | — | Async/sync validation after rules |
| `validateMode` | `onSubmit` | `onSubmit` \| `onBlur` \| `onChange` |
| `size` | — | `small` \| `base` \| `mid` \| `large` → context for fields |
| `disabled` / `readOnly` | `false` | Passed through context |
| `onSubmit` | — | `(values) => void \| Promise<void>` |
| `onSubmitError` | — | `(errors) => void` on validation errors |
| `className` | — | On `<form>` |
| `classNames` | — | Layout slots |
| HTML form attrs | — | `aria-label`, `id`, … |

HTML `onSubmit` is overridden — native validation is disabled (`noValidate`).

### Compound subparts

| Part | DOM | Purpose |
|------|-----|---------|
| `Form` | `<form>` | Root + state machine |
| `Form.Section` | `<div>` | Field group |
| `Form.Title` | `Text as="h2"` | Form heading |
| `Form.Description` | `<p>` | Description |
| `Form.Field` | `<div>` | Wrapper + `rules` registration |
| `Form.Actions` | `<div>` | Submit/cancel buttons |
| `Form.ErrorSummary` | `role="alert"` sr-only | Error summary (auto in root) |
| `Form.Announce` | `role="status"` sr-only | Live region (auto in root) |

### `FormClassNames`

`root`, `section`, `title`, `description`, `actions`, `errorSummary`, `announce`, `field`.

### `useFormField(name, rules?)`

Sugar for fields inside Form:

```tsx
function CustomField({ name }: { name: string }) {
  const field = useFormField(name, { required: true });
  return (
    <input
      name={field.name}
      value={String(field.value ?? "")}
      onChange={field.onChange}
      onBlur={field.onBlur}
      disabled={field.disabled}
      aria-invalid={field["aria-invalid"]}
      ref={field.ref as React.Ref<HTMLInputElement>}
    />
  );
}
```

Returns: `value`, `onChange`, `onBlur`, `disabled`, `readOnly`, `ref`, `aria-invalid`, `error`, `bound`.

### Validation

**`FormFieldRules`:**

```ts
type FormFieldRules = {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: unknown, values: FormValues) => string | undefined;
};
```

Rule sources: `rules` on Form, `rules` on `Form.Field`, `rules` in `useFormField`.

**`validateMode`:**

| Mode | When |
|------|------|
| `onSubmit` | On submit (default) |
| `onBlur` | `validateField` on blur |
| `onChange` | On every `setValue` |

On submit, validation is **always** full + `resolver`.

**Nested keys:** dot-notation `"address.city"`.

**Submit flow:**

1. `preventDefault`, `validateForm()`
2. `resolver(values)` — merge errors
3. Errors → announce, `focusFirstInvalid`, `onSubmitError`
4. Success → `await onSubmit(values)`, announce "Form submitted successfully"
5. `isSubmitting` blocks fields and buttons

## variant / size / status

| Axis | Form |
|------|------|
| `variant` | No |
| `status` | No (errors on fields via `status="danger"`) |
| `size` | Yes — context for `Input`, `Button`, … |
| `disabled` / `readOnly` | Yes — context |

## Animations

`Form` **does not contain GSAP** or a motion pipeline. Animations are fully delegated to child controls (`Input`, `Button`, `Checkbox`, `ComboBox`).

### Summary

| Animation | Where | Note |
|-----------|-------|------|
| Field shell hover | `Input`, `ComboBox`, … | `useFieldShellHoverLift` |
| Button press | `Button` | GSAP on submit |
| Error appear | `FieldError` | CSS / React |

### What is not included

- Own `formAnimations.ts`
- `configureMotion` at Form level
- Transition between sections

## Tokens and CSS

| Slot | Base classes (`formStyles.ts`) |
|------|--------------------------------|
| `root` | `flex flex-col gap-large w-full text-left` |
| `section` | `flex flex-col gap-base` |
| `title` | `text-header-3 font-semibold text-foreground` |
| `description` | `text-base text-muted` |
| `actions` | `flex flex-wrap justify-end gap-small pt-small` |
| `errorSummary` / `announce` | `sr-only` |
| `field` | user classes only |

`Form.Title` — `Text variant="mid" as="h2"` on top of `formTitleClass`.

## Styling and customization

### Two levels

1. **`className` on `Form`** — layout (horizontal toolbar, max-width).
2. **`classNames` on root** — all layout slots.

`Form.Section` / `Form.Field` can override a local slot (`section`, `field`).

### `FormClassNames` slots

| Slot | DOM | When to use |
|------|-----|-------------|
| `root` | `<form>` | Border, padding, bg panel |
| `section` | Section div | Gap between fields |
| `title` | `h2` Text | Heading color/size |
| `description` | `<p>` | Muted intro |
| `actions` | Actions row | Align buttons, border-top |
| `field` | Field wrapper | Per-field card/bg |
| `errorSummary` | sr-only alert | Custom summary (rare) |
| `announce` | sr-only status | Live region styling |

### classNames customization

```tsx
<Form
  classNames={{
    root: "rounded-mid border border-primary/20 bg-tertiary/50 p-large",
    title: "text-primary",
    description: "text-info",
    section: "gap-small",
    actions: "justify-start border-t border-token pt-large",
    field: "rounded-base bg-background/40 p-small",
  }}
  onSubmit={handleSubmit}
>
  <Form.Title>Feedback</Form.Title>
  <Form.Section>
    <Form.Field name="topic">
      <Input name="topic" label="Topic" />
    </Form.Field>
  </Form.Section>
  <Form.Actions>
    <Button type="submit">Submit</Button>
  </Form.Actions>
</Form>
```

### Controlled + resolver

```tsx
<Form
  values={values}
  onValuesChange={setValues}
  resolver={async (v) => {
    const errors: Record<string, string> = {};
    if (!v.login) errors.login = "Required";
    return Object.keys(errors).length ? { errors } : { values: v };
  }}
  onSubmit={save}
>
  ...
</Form>
```

### Horizontal layout

```tsx
<Form className="flex flex-row flex-wrap items-end gap-small" aria-label="Search">
  <Form.Section className="flex flex-1 flex-row gap-small">
    <Input name="q" label="Search" compact />
  </Form.Section>
  <Form.Actions className="pt-0">
    <Button type="submit">Find</Button>
  </Form.Actions>
</Form>
```

### Practical notes

- Fields bind by **`name`** on the control; `Form.Field` is needed for per-field `rules` and styles.
- Explicit `value` on a control **disables** form binding.
- `Checkbox` inside `CheckboxGroup` **does not** bind to Form (`group != null`).
- `ComboBox` / `Select` — `useFormFieldBinding` (value-based, not event).
- Always use `Form.Title` or `aria-label` on Form.
- `isSubmitting` automatically sets `disabled` on `Button` via context.

## Integrations

| Component | Binding |
|-----------|---------|
| `Input` | `useFormControlProps` — event-based |
| `Checkbox` | `useFormControlProps` (`type="checkbox"`) |
| `ComboBox` / `Select` | `useFormFieldBinding` — value-based |
| `Button` | `size`, `disabled`, `isSubmitting` from context |
| `CheckboxGroup` | No direct binding; single selection — separate `name`/`value` pattern |
| `Card` / `Dialog` / `Surface` | Layout wrappers in stories |

## Accessibility

| Mechanism | Implementation |
|-----------|----------------|
| Native validation | Disabled: `noValidate` |
| Form label | `aria-labelledby` → `Form.Title` id |
| Description | `aria-describedby` → `Form.Description` |
| Errors | `aria-describedby` + `Form.ErrorSummary` on errors |
| `Form.ErrorSummary` | `role="alert"`, `aria-live="polite"`, sr-only |
| `Form.Announce` | `role="status"`, `aria-live="polite"`, `aria-atomic` |
| Fields | `aria-invalid` via binding |
| Focus | `focusFirstInvalid` on submit with errors |

Messages (EN): "Please fix the form error", "Form submitted successfully".

## File structure

```
Form/
├── Form.tsx
├── index.ts
├── formTypes.ts
├── formStyles.ts
├── formAPI.ts
├── formA11y.ts
├── formContext.tsx
├── formParts.tsx
├── useFormRootState.ts
├── useFormControlProps.ts
├── useFormFieldBinding.ts
└── Form.stories.tsx
```

## Storybook

`Composite Components/Form` — profile, validation onBlur/onChange, login, controlled, async submit, search toolbar, billing, readOnly, classNames, resolver, compound layout, inline subscribe.
