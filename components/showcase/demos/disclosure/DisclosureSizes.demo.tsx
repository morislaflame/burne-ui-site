import { Disclosure } from "burne-ui";
import { Text } from "burne-ui";

const SIZES = ["small", "base", "mid", "large"] as const;

export function DisclosureSizesDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-small">
      {SIZES.map((size) => (
        <Disclosure key={size} size={size}>
          <Disclosure.Trigger>Size {size}</Disclosure.Trigger>
          <Disclosure.Content>
            <Text as="p" variant="small" className="text-muted">
              Disclosure size={size}
            </Text>
          </Disclosure.Content>
        </Disclosure>
      ))}
    </div>
  );
}
