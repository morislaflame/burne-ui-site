import { Checkbox } from "burne-ui";

export function CheckboxClassNamesFullDemo() {
  return (
    <Checkbox
      defaultChecked
      variant="outline"
      classNames={{
        root: "rounded-large border-primary/40 p-mid",
        control: "ring-primary/30",
        controlTrack: "border-primary/50",
        indicator: "text-primary rounded-mid",
        indicatorFill: "rounded-[inherit]",
        content: "gap-xsmall",
        label: "gap-xsmall",
        labelText: "text-primary font-semibold text-large",
        hint: "text-foreground/70",
      }}
      className="max-w-md"
    >
      <Checkbox.Control>
        <Checkbox.Indicator size="large"/>
      </Checkbox.Control>
      <Checkbox.Content>
        <Checkbox.Label>Notifications</Checkbox.Label>
        <Checkbox.Hint>Setting up slots via classNames on root.</Checkbox.Hint>
      </Checkbox.Content>
    </Checkbox>
  );
}
