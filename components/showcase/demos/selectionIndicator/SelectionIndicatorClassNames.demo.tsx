import { useState } from "react";

import { SelectionIndicator } from "burne-ui";
import { Text } from "burne-ui";

export function SelectionIndicatorClassNamesDemo() {
  const [selected, setSelected] = useState(true);

  return (
    <div className="flex w-full max-w-component-small flex-col gap-mid justify-center items-center">
      <Text as="p" variant="small" className="font-medium">
        classNames: shell / fill / mark
      </Text>
      <div className="flex flex-wrap items-end gap-xlarge">
        <SelectionIndicator
          size="large"
          variant="base"
          selected={selected}
          check
          classNames={{
            shell: "rounded-mid border-token bg-surface",
            fill: "rounded-base bg-primary inset-0",
            mark: "text-primary-foreground",
          }}
        />
        <SelectionIndicator size="large" variant="base" selected={selected} check />
      </div>
      <label className="flex cursor-pointer items-center gap-small text-sm">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => setSelected(e.target.checked)}
          className="size-4"
        />
        Selected
      </label>
    </div>
  );
}
