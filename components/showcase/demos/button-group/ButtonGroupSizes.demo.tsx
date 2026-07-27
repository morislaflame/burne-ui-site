import { ButtonGroup } from "burne-ui";
import { Button } from "burne-ui";

const SIZES = ["small", "base", "mid", "large"] as const;

export function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col gap-large">
      {SIZES.map((size) => (
        <ButtonGroup key={size} aria-label={size} buttonSize={size}>
          <Button variant="outline">A</Button>
          <Button variant="outline" groupSegment={{ orientation: "horizontal", position: "last" }}>
            B
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
}
