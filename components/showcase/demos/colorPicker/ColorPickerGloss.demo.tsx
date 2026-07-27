import { useState } from "react";

import { ColorPicker, ColorSwatch } from "burne-ui";
import { Text } from "burne-ui";

export function ColorPickerGlossDemo() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="flex flex-wrap items-center gap-large">
      <ColorPicker variant="gloss" value={color} onValueChange={setColor}>
        <ColorPicker.Trigger />
        <ColorPicker.Content presets={["#3b82f6", "#22c55e", "#ef4444", "#eab308"]} />
      </ColorPicker>
      <ColorSwatch color={color} size="large" />
      <Text as="span" variant="small" className="font-mono text-muted">
        {color}
      </Text>
    </div>
  );
}
