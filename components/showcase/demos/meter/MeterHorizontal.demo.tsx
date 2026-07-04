import { Meter } from "burne-ui";

export function MeterHorizontalDemo() {
  return (
    <div className="flex flex-col gap-mid max-w-120 w-full">
      <Meter label="Disk" value={78} min={0} max={100} showValue className="w-full" />
      <Meter
        label="Memory"
        value={45}
        min={0}
        max={100}
        color="var(--color-warning)"
        showValue
        className="w-full"
      />
    </div>
  );
}
