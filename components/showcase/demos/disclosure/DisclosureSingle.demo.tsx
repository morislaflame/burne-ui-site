import { Disclosure } from "burne-ui";
import { Text } from "burne-ui";

export function DisclosureSingleDemo() {
  return (
    <Disclosure className="max-w-lg" defaultOpen>
      <Disclosure.Trigger>Single block</Disclosure.Trigger>
      <Disclosure.Content>
        <Text as="p" variant="small" className="text-muted">
          Disclosure with height animation - alternative Accordion for single blocks.
        </Text>
      </Disclosure.Content>
    </Disclosure>
  );
}
