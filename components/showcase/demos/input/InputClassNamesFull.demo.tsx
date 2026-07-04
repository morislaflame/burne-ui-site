import { Input } from "burne-ui";

export function InputClassNamesFullDemo() {
  return (
    <Input
      className="max-w-sm"
      classNames={{
        root: "rounded-mid border-token bg-surface p-base",
        control: "text-primary",
        hint: "text-foreground/70",
        error: "text-danger",
      }}
      label="Email"
      placeholder="you@example.com"
      status="danger"
      hint="We do not share the address with third parties."
      error="Please enter correct email."
    />
  );
}

export function InputClassNamesCompoundDemo() {
  return (
    <Input
      className="max-w-sm"
      classNames={{
        root: "rounded-mid border-token bg-surface p-mid",
        prefix: "text-primary",
        suffix: "text-primary",
        hint: "text-foreground/70",
      }}
    >
      <Input.Label>Domain</Input.Label>
      <Input.Control prefix="https://" suffix=".com" placeholder="example" />
      <Input.Hint>Slots prefix, suffix and shell through classNames.</Input.Hint>
    </Input>
  );
}
