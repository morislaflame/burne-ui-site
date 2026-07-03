import { Disclosure, DisclosureGroup } from "burne-ui";
import { Text } from "burne-ui";

const items = [
  { value: "card-1", title: "Card variant" },
  { value: "card-2", title: "Second block" },
] as const;

export function DisclosureCardGroupDemo() {
  return (
    <DisclosureGroup variant="card" defaultValue="card-1" className="max-w-lg">
      {items.map(({ value, title }) => (
        <Disclosure key={value} value={value}>
          <Disclosure.Trigger>{title}</Disclosure.Trigger>
          <Disclosure.Content>
            <Text as="p" variant="small" className="text-muted">
              DisclosureGroup variant=&quot;card&quot; — general card with dividers.
            </Text>
          </Disclosure.Content>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
