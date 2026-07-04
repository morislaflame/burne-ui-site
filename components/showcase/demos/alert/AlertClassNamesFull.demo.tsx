import { Alert } from "burne-ui";
import { Button } from "burne-ui";

export function AlertClassNamesFullDemo() {
  return (
    <Alert
      title="Full customization Alert"
      description="All slots are redefined via classNames."
      // action={
      //   <Button size="small" variant="primary">
      //     Open
      //   </Button>
      // }
      classNames={{
        root: "rounded-large border-primary/50 bg-primary-tint p-mid",
        indicator: "text-primary",
        message: "items-start",
        content: "gap-xsmall",
        title: "font-semibold text-primary text-large",
        description: "text-foreground/80",
        action: "self-start",
      }}
      className="max-w-lg"
    />
  );
}
