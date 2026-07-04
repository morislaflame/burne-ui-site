import { Radio } from "burne-ui";

export function RadioClassNamesSimpleLabelDemo() {
  return (
    <Radio
      name="simple-label"
      value="express"
      defaultChecked
      label="Express delivery"
      hint="Slot label stylizes the signature in simple API."
      classNames={{
        label: "text-primary",
        labelText: "font-semibold underline decoration-primary/30 underline-offset-4 text-large",
        hint: "text-muted/80",
      }}
      className="max-w-md"
    />
  );
}
