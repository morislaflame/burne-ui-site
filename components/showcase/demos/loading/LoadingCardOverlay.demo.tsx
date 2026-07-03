import { Loading } from "burne-ui";
import { Surface } from "burne-ui";
import { Text } from "burne-ui";

export function LoadingCardOverlayDemo() {
  return (
    <Surface
      variant="secondary"
      padding="mid"
      className="relative w-full max-w-xs overflow-hidden"
    >
      <div className="flex flex-col gap-xsmall opacity-40">
        <Text as="p" variant="base" className="font-medium">
          Loading the dashboard
        </Text>
        <Text as="p" variant="small" className="text-muted">
          Metrics for the last 7 days
        </Text>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-[2px]">
        <Loading size="mid" color="primary" label="Loading metrics" />
      </div>
    </Surface>
  );
}
