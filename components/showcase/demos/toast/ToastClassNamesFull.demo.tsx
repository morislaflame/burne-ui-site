import { type SubmitEvent, useState } from "react";

import { Button, Input, Toast, useToast } from "burne-ui";

function ToastRenameForm({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState("");

  return (
    <form
      className="mt-small flex flex-col gap-small w-full"
      onSubmit={(e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = name.trim();
        if (!value) return;
        onSubmit(value);
      }}
    >
      <Input.Control
        placeholder="New name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <Button type="submit" variant="primary" disabled={!name.trim()}>
        Save
      </Button>
    </form>
  );
}

export function ToastClassNamesFullDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        let id = "";
        id = toast.show({
          title: "Rename item",
          description: (
            <ToastRenameForm
              onSubmit={() => {
                toast.dismiss(id);
              }}
            />
          ),
          timeout: 0,
          classNames: {
            root: "rounded-large",
            indicator: "text-primary",
            title: "font-semibold text-primary text-mid",
            description: "text-foreground/80",
          },
        });
      }}
    >
      Show toast with form
    </Button>
  );
}
