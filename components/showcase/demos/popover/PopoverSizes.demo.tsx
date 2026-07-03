import { Button } from "burne-ui";
import { Popover } from "burne-ui";
import { Text } from "burne-ui";

const SIZES = ["small", "base", "mid", "large"] as const;

export function PopoverSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-mid">
      {SIZES.map((size) => (
        <Popover key={size} size={size}>
          <Popover.Trigger>
            <Button variant="outline" type="button" size={size}>
              {size}
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Body>
              <Text as="p" variant="small">
                Popover size={size}
              </Text>
            </Popover.Body>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  );
}
