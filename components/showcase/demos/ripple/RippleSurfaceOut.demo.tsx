import { Ripple } from "burne-ui";
import { Surface } from "burne-ui";
import { Text } from "burne-ui";

export function RippleSurfaceOutDemo() {
  return (
    <Surface variant="tertiary" padding="mid" className="relative w-full max-w-xs overflow-hidden">
      <Ripple color="primarySolid" direction="out" duration={520} />
      <Text as="p" variant="base" className="relative z-[1] font-medium">
        Ripple direction=&quot;out&quot;
      </Text>
      <Text as="p" variant="small" className="relative z-[1] text-muted">
        Slow wave on Surface-panels.
      </Text>
    </Surface>
  );
}
