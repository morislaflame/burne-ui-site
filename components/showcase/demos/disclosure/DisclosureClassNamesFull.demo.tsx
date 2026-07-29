import { Disclosure } from "burne-ui";
import { Text } from "burne-ui";

export function DisclosureClassNamesFullDemo() {
  return (
    <Disclosure
      variant="outline"
      defaultOpen
      classNames={{
        trigger: "border border-info/30 rounded-mid",
        title: "text-info font-semibold",
        icon: "text-info",
        chevron: "text-info",
        contentPanel: "border border-info/20 bg-info/5",
      }}
    >
      <Disclosure.Trigger icon={<span aria-hidden>📦</span>}>Delivery and payment</Disclosure.Trigger>
      <Disclosure.Content>
        <Text as="p" variant="small" className="text-muted">
          Customization trigger, title, chevron and content through classNames.
        </Text>
      </Disclosure.Content>
    </Disclosure>
  );
}
