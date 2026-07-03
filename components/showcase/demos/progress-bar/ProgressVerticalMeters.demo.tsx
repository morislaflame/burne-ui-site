import { ProgressBar } from "burne-ui";
import { Text } from "burne-ui";

export function ProgressVerticalMetersDemo() {
  return (
    <div className="flex items-end gap-mid rounded-mid border-token bg-tertiary p-mid">
      <div className="flex flex-col items-center gap-xsmall">
        <ProgressBar
          orientation="vertical"
          label="Build"
          showValue
          value={88}
          color="var(--color-primary)"
          className="h-32"
        />
        <Text as="span" variant="tools" className="text-muted">
          CI
        </Text>
      </div>
      <div className="flex flex-col items-center gap-xsmall">
        <ProgressBar
          orientation="vertical"
          label="Lint"
          showValue
          value={100}
          color="var(--color-success)"
          className="h-32"
        />
        <Text as="span" variant="tools" className="text-muted">
          QA
        </Text>
      </div>
      <ProgressBar
        orientation="vertical"
        label="Deploy"
        indeterminate
        color="var(--color-info)"
        className="h-32"
      />
    </div>
  );
}
