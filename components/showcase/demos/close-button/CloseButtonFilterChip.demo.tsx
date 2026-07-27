import { CloseButton } from "burne-ui";
import { Text } from "burne-ui";

export function CloseButtonFilterChipDemo() {
  return (
    <div className="inline-flex items-center gap-small rounded-full border-token bg-tertiary py-xsmall pl-large pr-xsmall shadow-token-base">
      <Text as="span" variant="small" className="text-muted">
        Filter: published
      </Text>
      <CloseButton
        aria-label="Reset filter"
        variant="outline"
        size="small"
        className="size-7 min-h-0 rounded-full border-0 bg-surface"
      />
    </div>
  );
}
