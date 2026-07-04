import { Switch } from "burne-ui";

export function SwitchClassNamesFullDemo() {
  return (
    <Switch
      defaultChecked
      classNames={{
        root: "max-w-md rounded-mid border-token bg-surface p-mid max-w-component-small",
        track: "ring-1 ring-primary/20 bg-primary",
        thumbShell: "ring-primary/30 bg-primary",
        labelText: "text-primary font-semibold",
        hint: "text-muted/80",
      }}
    >
      <Switch.Control gloss />
      <Switch.Content>
        <Switch.Label>Notifications</Switch.Label>
        <Switch.Hint>Setting up slots via classNames on root.</Switch.Hint>
      </Switch.Content>
    </Switch>
  );
}
