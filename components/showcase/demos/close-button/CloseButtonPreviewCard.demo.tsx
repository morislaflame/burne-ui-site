import { CloseButton } from "burne-ui";
import { Surface } from "burne-ui";
import { Text } from "burne-ui";
import { PIN_IMAGE2 } from "@/lib/showcase/mock-images";

export function CloseButtonPreviewCardDemo() {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-mid">
      <div
        className="h-36 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${PIN_IMAGE2})` }}
      />
      <CloseButton
        aria-label="Close preview"
        size="small"
        className="absolute right-small top-small shadow-token-mid text-primary"
      />
      <Surface variant="default" padding="base" className="rounded-none rounded-b-mid">
        <Text as="p" variant="small" className="text-muted">
          Preview Card
        </Text>
      </Surface>
    </div>
  );
}
