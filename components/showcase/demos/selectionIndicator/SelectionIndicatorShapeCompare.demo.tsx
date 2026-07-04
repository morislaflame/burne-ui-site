import { useState } from "react";

import { SelectionIndicator } from "burne-ui";
import { Text } from "burne-ui";

export function SelectionIndicatorShapeCompareDemo() {
  const [selected, setSelected] = useState(true);

  return (
    <div className="flex w-full max-w-component-small flex-col gap-mid justify-center items-center">
      <Text as="p" variant="small" className="font-medium">
        Shell shape
      </Text>
      <div className="flex flex-wrap items-end gap-xlarge">
        <div className="flex flex-col items-center gap-xsmall">
          <SelectionIndicator size="large" variant="base" selected={selected} check />
          <Text as="span" variant="tools" className="text-muted">
            rounded-full
          </Text>
        </div>
        <div className="flex flex-col items-center gap-xsmall">
          <SelectionIndicator
            size="large"
            variant="base"
            selected={selected}
            check
            classNames={{
              shell: "rounded-small border-token bg-surface",
              fill: "rounded-none bg-primary inset-0",
            }}
          />
          <Text as="span" variant="tools" className="text-muted">
            rounded-small
          </Text>
        </div>
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
