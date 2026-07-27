import { useState } from "react";
import { IoGridOutline, IoListOutline, IoSquareOutline } from "react-icons/io5";

import { ToggleButtonGroup } from "burne-ui";
import { Surface } from "burne-ui";
import { ToggleButton } from "burne-ui";
import { Text } from "burne-ui";

export function ToggleButtonGroupViewToolbarDemo() {
  const [view, setView] = useState("list");

  return (
    <Surface variant="secondary" padding="large" className="flex w-full max-w-md items-center justify-between gap-large">
      <Text as="span" variant="small" className="font-medium">
        Catalog view
      </Text>
      <ToggleButtonGroup
        type="single"
        variant="outline"
        size="small"
        aria-label="Catalog view"
        value={view}
        onValueChange={(v) => setView(v as string)}
      >
        <ToggleButton value="list" icon={<IoListOutline aria-hidden />} aria-label="List" />
        <ToggleButton value="grid" icon={<IoGridOutline aria-hidden />} aria-label="Net" />
        <ToggleButton value="tiles" icon={<IoSquareOutline aria-hidden />} aria-label="Tiles" />
      </ToggleButtonGroup>
    </Surface>
  );
}
