import { Expandable } from "burne-ui";
import { Surface } from "burne-ui";
import { Text } from "burne-ui";

import { EXPANDABLE_INFO_ICON } from "@/lib/showcase/shared/constants";

export function ExpandableOrderDetailsDemo() {
  return (
    <Surface variant="secondary" padding="mid" className="w-full max-w-md">
      <Text as="p" variant="small" className="mb-mid font-medium">
        Order #1042
      </Text>
      <Expandable defaultOpen title="Order contents" icon={EXPANDABLE_INFO_ICON} description="3 positions">
        <ul className="flex flex-col gap-xsmall text-sm text-muted">
          <li>Parka Arctic — 1 pcs.</li>
          <li>Cap Wool — 1 pcs.</li>
          <li>Gloves Pro — 1 pcs.</li>
        </ul>
      </Expandable>
    </Surface>
  );
}
