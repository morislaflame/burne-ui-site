import { CloseButton } from "burne-ui";
import { Text } from "burne-ui";

export function CloseButtonFilterChipDemo() {
  return (
    <div className="inline-flex items-center gap-small rounded-full border-token bg-tertiary py-xsmall pl-mid pr-xsmall shadow-token-base">
      <Text as="span" variant="small" className="text-primary">
        Filter: published
      </Text>
      <CloseButton
        aria-label="Reset filter"
        variant="ghost"
        size="small"
        className="min-h-0 rounded-full border-0 bg-tertiary hover:bg-transparent"
      />
    </div>
  );
}
