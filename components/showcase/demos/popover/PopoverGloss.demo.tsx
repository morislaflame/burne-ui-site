import { Button } from "burne-ui";
import { Popover } from "burne-ui";
import { Text } from "burne-ui";

export function PopoverGlossDemo() {
  return (
    <Popover variant="gloss">
      <Popover.Trigger asChild>
        <Button variant="gloss">Gloss Popover</Button>
      </Popover.Trigger>
      <Popover.Content showArrow>
        <Popover.Header>
          <Popover.Label>Heading</Popover.Label>
          <Popover.Hint>Glass pop-up panel</Popover.Hint>
        </Popover.Header>
        <Popover.Body>
          <Text as="p" variant="small" className="text-muted">
            Content inside gloss Popover.
          </Text>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
