import { ToggleButton } from "burne-ui";
import { ToggleButtonGroup } from "burne-ui";

export function ToggleButtonGroupClassNamesFullDemo() {
  return (
    <ToggleButtonGroup
      type="single"
      defaultValue="a"
      aria-label="Custom slots"
      classNames={{
        root: "rounded-[1.5rem] border-primary/25 p-mid",
        separator: "border-primary/40",
      }}
    >
      <ToggleButton value="a">A</ToggleButton>
      <ToggleButton value="b">B</ToggleButton>
      <ToggleButton value="c">C</ToggleButton>
    </ToggleButtonGroup>
  );
}
