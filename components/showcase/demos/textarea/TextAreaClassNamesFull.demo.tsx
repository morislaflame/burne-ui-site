import { TextArea } from "burne-ui";

export function TextAreaClassNamesFullDemo() {
  return (
    <TextArea
      className="max-w-md"
      classNames={{
        root: "rounded-mid border-token bg-surface p-base",
        control: "text-primary",
        hint: "text-foreground/70",
        error: "text-danger",
      }}
      label="Comment"
      placeholder="Your review…"
      rows={3}
      status="danger"
      hint="Up to 500 characters."
      error="The text is too short."
    />
  );
}

export function TextAreaClassNamesCompoundDemo() {
  return (
    <TextArea
      className="max-w-md"
      classNames={{
        root: "rounded-mid border-token bg-surface p-base",
        control: "text-primary",
        hint: "text-foreground/70",
        error: "text-danger",
      }}
    >
      <TextArea.Label>Description</TextArea.Label>
      <TextArea.Control placeholder="Briefly about the task…" rows={2} />
      <TextArea.Hint>Slots shell, control and resizeHandle through classNames.</TextArea.Hint>
    </TextArea>
  );
}
