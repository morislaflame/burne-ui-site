import { Button } from "burne-ui";
import { Popover } from "burne-ui";
import { Text } from "burne-ui";

export function PopoverSimpleDemo() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="outline" type="button">
          Popover
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Body>
          <Text as="p" variant="small">
            Trigger click panel.
          </Text>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
