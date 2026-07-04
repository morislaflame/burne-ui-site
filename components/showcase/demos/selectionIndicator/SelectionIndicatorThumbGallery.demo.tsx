import { useState } from "react";
import { IoCheckmark, IoEllipse } from "react-icons/io5";

import { SelectionThumb, SelectionThumbIcon } from "burne-ui";
import { Text } from "burne-ui";

export function SelectionIndicatorThumbGalleryDemo() {
  const [active, setActive] = useState(true);

  return (
    <div className="flex w-full max-w-component-small flex-col gap-mid justify-center items-center">
      <Text as="p" variant="small" className="font-medium">
        SelectionThumb
      </Text>
      <div className="flex flex-wrap items-center gap-xlarge">
        <div className="selection-indicator-base flex items-center justify-center">
          <SelectionThumb active={active}>
          </SelectionThumb>
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-small text-sm">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="size-4"
        />
        Active
      </label>
    </div>
  );
}
