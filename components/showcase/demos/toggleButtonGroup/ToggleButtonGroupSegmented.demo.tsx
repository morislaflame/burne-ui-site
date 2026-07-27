import { useState } from "react";

import { ToggleButtonGroup } from "burne-ui";
import { ToggleButton } from "burne-ui";

export function ToggleButtonGroupSegmentedDemo() {
  const [tags, setTags] = useState<string[]>(["design"]);

  return (
    <ToggleButtonGroup
      segmented
      type="multiple"
      aria-label="Tags"
      value={tags}
      onValueChange={(v) => setTags(v as string[])}
    >
      <ToggleButton value="design">Design</ToggleButton>
      <ToggleButton value="dev">Dev</ToggleButton>
      <ToggleButton value="qa">QA</ToggleButton>
    </ToggleButtonGroup>
  );
}
