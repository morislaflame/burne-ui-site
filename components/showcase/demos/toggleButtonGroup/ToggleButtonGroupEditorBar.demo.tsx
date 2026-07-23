import { useState } from "react";

import { ToggleButtonGroup } from "burne-ui";
import { Surface } from "burne-ui";
import { ToggleButton } from "burne-ui";
import { Text } from "burne-ui";

export function ToggleButtonGroupEditorBarDemo() {
  const [formats, setFormats] = useState<string[]>(["bold", "italic"]);

  return (
    <Surface variant="secondary" padding="small" className="w-full max-w-md">
      <div className="flex flex-col gap-small">
        <Text as="span" variant="tools" className="text-muted">
          Format panel
        </Text>
        <ToggleButtonGroup
          type="multiple"
          size="small"
          variant="outline"
          aria-label="Formatting text"
          value={formats}
          onValueChange={(v) => setFormats(v as string[])}
        >
          <ToggleButton value="bold">B</ToggleButton>
          <ToggleButton value="italic">I</ToggleButton>
          <ToggleButton value="underline">U</ToggleButton>
          <ToggleButton value="strike">S</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Surface>
  );
}
