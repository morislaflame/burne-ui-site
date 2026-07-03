import { Button } from "burne-ui";
import { useToast } from "burne-ui";

export function ToastGlossDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="gloss"
      onClick={() =>
        toast.show({
          title: "Gloss toast",
          description: "Glass notice with hover-lift.",
          status: "info",
          variant: "gloss",
        })
      }
    >
      Gloss Toast
    </Button>
  );
}
