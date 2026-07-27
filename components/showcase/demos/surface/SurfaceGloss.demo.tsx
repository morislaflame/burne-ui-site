import { Surface } from "burne-ui";
import { Text } from "burne-ui";

export function SurfaceGlossDemo() {
  return (
    <Surface variant="gloss" padding="large" className="min-w-[12rem]">
      <Text as="span" variant="small">
        Glass surface for grouping content.
      </Text>
    </Surface>
  );
}
