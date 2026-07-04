import { CloseButton } from "burne-ui";
import { Text } from "burne-ui";

export function CloseButtonInfoBannerDemo() {
  return (
    <div className="flex w-full max-w-md items-start gap-mid rounded-mid border-l-4 border-primary bg-surface p-mid">
      <div className="min-w-0 flex-1">
        <Text as="p" variant="base" className="font-medium text-primary">
          New version available
        </Text>
        <Text as="p" variant="small" className="text-muted">
          Update CLI, to get gloss-topic.
        </Text>
      </div>
      <CloseButton
        aria-label="Hide notification"
        variant="ghost"
        size="small"
        className="shrink-0 text-primary hover:bg-primary-tint"
      />
    </div>
  );
}
