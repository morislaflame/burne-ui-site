import { Button } from "burne-ui";
import { useToast, type ToastSize } from "burne-ui";

const SIZES: ToastSize[] = ["small", "base", "mid", "large"];

export function ToastSizesDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center gap-mid">
      {SIZES.map((size) => (
        <Button
          key={size}
          variant="outline"
          type="button"
          onClick={() =>
            toast.show({
              size,
              title: `Size: ${size}`,
              description: "Padding, icon, typography and width viewport.",
            })
          }
        >
          {size}
        </Button>
      ))}
    </div>
  );
}
