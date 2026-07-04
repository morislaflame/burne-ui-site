import { useState } from "react";

import { ColorPicker } from "burne-ui";
import { Text } from "burne-ui";

export function ColorPickerClassNamesFullDemo() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="flex flex-col items-center gap-mid">
      <ColorPicker
        value={color}
        onValueChange={setColor}
        classNames={{
          contentPanel: "border border-primary/30 bg-primary/5 shadow-token-base",
          area: "rounded-base ring-1 ring-primary/25",
          hexInput: "border-primary/30 bg-primary/10",
          hexInputField: "text-primary",
          previewSwatch: "ring-2 ring-primary/30",
        }}
      >
        <ColorPicker.Trigger />
        <ColorPicker.Content />
      </ColorPicker>
      <Text as="p" variant="small" className="font-mono text-muted">
        {color}
      </Text>
    </div>
  );
}
