import { Avatar } from "burne-ui";
import { Button } from "burne-ui";
import { Popover } from "burne-ui";
import { Text } from "burne-ui";
import { Card } from "burne-ui";

export function PopoverProfileCardDemo() {
  return (
    <Popover>
      <Popover.Trigger>
          <Card pressable className="p-base w-fit flex items-center gap-base">
              <div className="flex items-center justify-center gap-base">
                <Avatar size="small" label="AK" />
                <span>Andrey K.</span>
              </div>
        </Card>
      </Popover.Trigger>
      <Popover.Content showArrow className="w-64">
        <Popover.Arrow />
        <Popover.Body className="flex flex-col gap-base">
          <div className="flex items-center gap-base">
            <Avatar size="base" label="AK" />
            <div className="flex min-w-0 flex-col">
              <Text as="span" variant="small" className="font-medium">
                Andrey K.
              </Text>
              <Text as="span" variant="xsmall" className="truncate text-muted">
                andrey@example.com
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-xsmall">
            <Button variant="outline" size="small" type="button">
              Settings
            </Button>
            <Button variant="primary" status="danger" size="small" type="button">
              Log out
            </Button>
          </div>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
