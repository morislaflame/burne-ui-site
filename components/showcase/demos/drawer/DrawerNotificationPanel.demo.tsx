import { useState } from "react";

import { Badge } from "burne-ui";
import { Button } from "burne-ui";
import { Drawer } from "burne-ui";
import { Text } from "burne-ui";

const NOTIFICATIONS = [
  { title: "New comment", time: "2 min" },
  { title: "Deployment complete", time: "1 h" },
  { title: "Invitation to the team", time: "yesterday" },
] as const;

export function DrawerNotificationPanelDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>

      <Drawer open={open} onOpenChange={setOpen} placement="right">
        <Drawer.Trigger asChild>
          <Button variant="outline">
            Notifications
            <Badge size="small" variant="primary" className="ml-xsmall aspect-square">
              3
            </Badge>
          </Button>
        </Drawer.Trigger>
        <Drawer.Panel>
          <Drawer.Header>
          <Drawer.HeadingBlock>
            <Drawer.Title>Notifications</Drawer.Title>
            <Drawer.Description>Latest events</Drawer.Description>
          </Drawer.HeadingBlock>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Body className="flex flex-col gap-mid">
          {NOTIFICATIONS.map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-base border-token px-plus py-base">
              <div className="flex flex-col items-start gap-xsmall">
                <Text as="span" variant="mid" className="font-medium">
                  {item.title}
                </Text>
                <Text as="span" variant="small" className="text-muted">
                  {item.time}
                </Text>
              </div>
              <Button variant="ghost" size="small" type="button">
                View
              </Button>
            </div>
          ))}
        </Drawer.Body>
        </Drawer.Panel>
      </Drawer>
    </>
  );
}
