import { useState } from "react";

import { Switch } from "burne-ui";
import { Text } from "burne-ui";

export function SwitchAccentColorDemo() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-large">
      <Text as="p" variant="small" className="font-medium">
        Accent color
      </Text>
      <Switch
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
        label="Gradient fill"
        hint="color — CSS-color or linear-gradient"
        color="linear-gradient(90deg, var(--color-success) 0%, var(--color-primary) 100%)"
      />
    </div>
  );
}
