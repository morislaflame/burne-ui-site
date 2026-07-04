import { useState } from "react";

import { Button } from "burne-ui";
import { Dialog } from "burne-ui";
import { Switch } from "burne-ui";
import { Text } from "burne-ui";

export function DialogSettingsModalDemo() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  return (
    <>
      <Button variant="outline" type="button" onClick={() => setOpen(true)}>
        Privacy Settings
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Panel>
          <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Privacy</Dialog.Title>
            <Dialog.Description>Data Collection Management.</Dialog.Description>
          </Dialog.HeadingBlock>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-mid">
          <Switch
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            label="Usage analytics"
            hint="Anonymous statistics to improve the product"
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button type="button" onClick={() => setOpen(false)}>
            Ready
          </Button>
        </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
