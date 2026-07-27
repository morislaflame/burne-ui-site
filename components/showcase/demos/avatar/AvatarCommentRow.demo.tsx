import { Avatar } from "burne-ui";
import { Text } from "burne-ui";
import { PIN_IMAGE2 } from "@/lib/showcase/mock-images";

export function AvatarCommentRowDemo() {
  return (
    <div className="flex w-full max-w-md gap-large">
      <Avatar size="mid" label="Grace Hopper" src={PIN_IMAGE2} alt="" loading="lazy" />
      <div className="flex min-w-0 flex-col gap-xsmall">
        <div className="flex items-baseline gap-small">
          <Text as="span" variant="small" className="font-medium">
            Grace Hopper
          </Text>
          <Text as="span" variant="xsmall" className="text-muted">
            2 hours ago
          </Text>
        </div>
        <Text as="p" variant="small" className="text-muted">
          Compound Avatar + text - a typical comment line.
        </Text>
      </div>
    </div>
  );
}
