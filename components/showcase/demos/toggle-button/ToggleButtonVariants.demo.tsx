import { ToggleButton } from "burne-ui";

export function ToggleButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-small">
      <ToggleButton variant="default">
        Default
      </ToggleButton>
      <ToggleButton variant="outline">
        Outline
      </ToggleButton>
      <ToggleButton variant="ghost">
        Ghost
      </ToggleButton>
    </div>
  );
}
