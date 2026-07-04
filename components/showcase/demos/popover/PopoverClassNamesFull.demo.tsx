import { Button } from "burne-ui";
import { Popover } from "burne-ui";
import { Text } from "burne-ui";

export function PopoverClassNamesFullDemo() {
  return (
    <Popover
      classNames={{
        trigger: "rounded-mid",
        panel: "border-primary bg-surface",
        label: "text-primary font-semibold",
        hint: "text-muted/80",
        body: "text-foreground",
      }}
    >
      <Popover.Trigger>
        <Button variant="outline" type="button">
          Filters
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Label>Display Settings</Popover.Label>
          <Popover.Hint>root on the trigger, panel/label/body through classNames</Popover.Hint>
        </Popover.Header>
        <Popover.Body>
          <Text as="p" variant="small">
            Example of customizing a pop-up panel.
          </Text>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
