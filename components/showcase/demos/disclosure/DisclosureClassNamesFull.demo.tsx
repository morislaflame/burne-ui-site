import { Disclosure } from "burne-ui";
import { Text } from "burne-ui";

export function DisclosureClassNamesFullDemo() {
  return (
    <Disclosure
      variant="outline"
      defaultOpen
      classNames={{
        trigger: "border border-primary/30 rounded-mid",
        triggerTitle: "text-primary font-semibold",
        triggerChevron: "text-primary",
        contentPanel: "border border-primary/20 bg-primary/5",
      }}
    >
      <Disclosure.Trigger>Delivery and payment</Disclosure.Trigger>
      <Disclosure.Content>
        <Text as="p" variant="small" className="text-muted">
          Customization trigger, title, chevron and content through classNames.
        </Text>
      </Disclosure.Content>
    </Disclosure>
  );
}
