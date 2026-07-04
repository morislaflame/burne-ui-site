import { ProgressBar } from "burne-ui";

export function ProgressBarClassNamesFullDemo() {
  return (
    <ProgressBar
      label="Uploading a file"
      hint="The remaining time depends on the network speed"
      showValue
      value={72}
      color="var(--color-primary)"
      classNames={{
        root: "rounded-mid border border-token bg-surface p-mid max-w-120",
        value: "text-primary font-semibold",
        track: "bg-primary/10",
        fill: "opacity-95",
        hint: "text-muted/80",
      }}
    />
  );
}
