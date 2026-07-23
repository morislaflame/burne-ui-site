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
          <Popover.Title>Heading</Popover.Title>
          <Popover.Description>Glass pop-up panel</Popover.Description>
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
