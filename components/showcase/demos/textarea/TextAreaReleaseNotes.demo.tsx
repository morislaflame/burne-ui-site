import { useState } from "react";

import { Text } from "burne-ui";
import { TextArea } from "burne-ui";

const MAX = 280;

export function TextAreaReleaseNotesDemo() {
  const [value, setValue] = useState("Fixed indents in Field.Set and added custom demos to showcase.");

  return (
    <div className="flex w-full max-w-md flex-col gap-xsmall rounded-mid border-token bg-surface p-mid">
      <TextArea className="w-full">
        <TextArea.Label>Release Notes</TextArea.Label>
        <TextArea.Control
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="secondary"
        />
        <TextArea.Hint>Briefly describe the changes for changelog.</TextArea.Hint>
      </TextArea>
      <Text
        as="p"
        variant="tools"
        className={`text-right tabular-nums ${value.length > MAX ? "text-danger" : "text-muted"}`}
      >
        {value.length} / {MAX}
      </Text>
    </div>
  );
}
