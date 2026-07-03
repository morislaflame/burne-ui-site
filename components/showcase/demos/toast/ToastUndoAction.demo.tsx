import { Button } from "burne-ui";
import { useToast, useToastContext } from "burne-ui";

export function ToastUndoActionDemo() {
  const { toast } = useToast();
  const { update } = useToastContext();

  return (
    <Button
      variant="outline"
      onClick={() => {
        const undoToastId = toast.show({
          title: "Item deleted",
          description: "File «draft-v3.sketch» moved to trash.",
          status: "default",
          action: (
            <Button
              variant="ghost"
              size="small"
              className="h-7 px-small text-primary"
              onClick={() => {
                update(undoToastId, {
                  status: "info",
                  title: "Canceled",
                  description: "File «draft-v3.sketch» restored.",
                  action: undefined,
                });
              }}
            >
              Cancel
            </Button>
          ),
        });
      }}
    >
      Remove from undo
    </Button>
  );
}
