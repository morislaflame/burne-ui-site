import { Expandable } from "burne-ui";
import { Text } from "burne-ui";

import { EXPANDABLE_INFO_ICON } from "@/lib/showcase/shared/constants";

export function ExpandableGlossDemo() {
  return (
    <Expandable
      variant="gloss"
      title="Gloss"
      icon={EXPANDABLE_INFO_ICON}
      description="Glass panel with hover-lift"
    >
      <Text as="p" variant="small" className="text-muted">
        variant=&quot;gloss&quot; on the root Expandable.
      </Text>
    </Expandable>
  );
}
