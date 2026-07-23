import { useState } from "react";
import { IoGridOutline, IoListOutline } from "react-icons/io5";

import { ToggleButtonGroup } from "burne-ui";
import { ToggleButton } from "burne-ui";

export function ToggleButtonGroupSingleDemo() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <ToggleButtonGroup
      type="single"
      aria-label="List view"
      value={viewMode}
      onValueChange={(v) => setViewMode(v as string)}
    >
      <ToggleButton variant="default" value="list" icon={<IoListOutline aria-hidden />}>
        List
      </ToggleButton>
      <ToggleButton value="grid" icon={<IoGridOutline aria-hidden />}>
        Net
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
