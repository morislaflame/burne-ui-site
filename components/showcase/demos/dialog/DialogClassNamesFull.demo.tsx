import { useState } from "react";

import { Button, Input } from "burne-ui";
import { Dialog } from "burne-ui";

export function DialogClassNamesFullDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        classNames={{
          panel: "border-primary/40 shadow-token-large",
          header: "border-b border-primary/20 pb-mid",
          title: "text-primary font-semibold text-large",
          description: "text-foreground/75",
          footer: "border-t border-primary/20 pt-mid",
        }}
      >
        <Dialog.Trigger asChild>
          <Button variant="outline">
            Open from classNames
          </Button>
        </Dialog.Trigger>
        <Dialog.Panel>
          <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Settings</Dialog.Title>
            <Dialog.Description>Slots are configured via classNames.</Dialog.Description>
          </Dialog.HeadingBlock>
          <Dialog.Close variant="gloss" />
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-plus">
          <Input>
            <Input.Label>Name</Input.Label>
            <Input.Control variant="gloss" name="gloss-name" placeholder="Ivan" autoComplete="name" />
          </Input>
          <Input>
            <Input.Label>Email</Input.Label>
            <Input.Control
              variant="gloss"
              name="gloss-email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Input>
        </Dialog.Body>
        <Dialog.Footer>
          <Button size="small" variant="gloss" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
