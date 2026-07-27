import { Surface } from "burne-ui";
import { Text } from "burne-ui";

export function SurfaceVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-small">
      <Surface variant="default" padding="large" className="min-w-[8rem]">
        <Text as="span" variant="small">
          default
        </Text>
      </Surface>
      <Surface variant="secondary" padding="large" className="min-w-[8rem]">
        <Text as="span" variant="small">
          secondary
        </Text>
      </Surface>
      <Surface variant="tertiary" padding="large" className="min-w-[8rem]">
        <Text as="span" variant="small">
          tertiary
        </Text>
      </Surface>
    </div>
  );
}
