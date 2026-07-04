import { Radio } from "burne-ui";

export function RadioClassNamesFullDemo() {
  return (
    <Radio
      name="classnames-full"
      value="courier"
      defaultChecked
      variant="gloss"
      classNames={{
        root: "rounded-large border-token bg-surface p-mid shadow-token-base",
        control: "ring-primary/30",
        controlTrack: "border-primary/50",
        indicator: "text-primary",
        content: "gap-xsmall",
        label: "gap-xsmall",
        labelText: "text-primary font-semibold",
        hint: "text-foreground/70",
      }}
      className="max-w-md max-w-component-small"
    >
      <Radio.Control>
        <Radio.Indicator />
      </Radio.Control>
      <Radio.Content>
        <Radio.Label>Courier</Radio.Label>
        <Radio.Hint>Setting up slots via classNames on root.</Radio.Hint>
      </Radio.Content>
    </Radio>
  );
}
