import { Button } from "burne-ui";
import { Kbd } from "burne-ui";
import { Text } from "burne-ui";
import { Tooltip } from "burne-ui";

const SHORTCUTS = [
  { keys: "⌘ K", label: "Command Palette" },
  { keys: "⌘ S", label: "Save" },
  { keys: "⌘ ⇧ P", label: "Quick Actions" },
] as const;

export function TooltipShortcutGridDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-large">
      <Text as="p" variant="small" className="font-medium">
        Hotkeys
      </Text>
      <div className="grid gap-small">
        {SHORTCUTS.map((item) => (
          <Tooltip key={item.keys} side="right">
            <Tooltip.Trigger asChild>
              <Button variant="outline" size="small" type="button" className="w-full justify-between">
                <span>{item.label}</span>
                <Kbd size="small" variant="secondary">
                  {item.keys}
                </Kbd>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>{item.label}</Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
