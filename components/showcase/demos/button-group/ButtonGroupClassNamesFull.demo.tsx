import { Button } from "burne-ui";
import { ButtonGroup } from "burne-ui";

export function ButtonGroupClassNamesFullDemo() {
  return (
    <ButtonGroup
      aria-label="Custom slots"
      buttonSize="base"
      classNames={{
        root: "rounded-[1.5rem] border-primary p-base bg-surface",
        separator: "border-primary/40",
        text: "bg-primary/5",
        textLabel: "text-primary font-medium",
      }}
    >
      <ButtonGroup.Text className="text-primary font-medium bg-tertiary">Label</ButtonGroup.Text>
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
    </ButtonGroup>
  );
}
