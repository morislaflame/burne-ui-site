import { Button } from "burne-ui";
import { useToast } from "burne-ui";

export function ToastDefaultDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.show({
          title: "Changes saved",
          description: "Profile settings have been updated.",
        })
      }
    >
      Show toast
    </Button>
  );
}
