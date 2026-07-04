import { Field } from "burne-ui";
import { Label } from "burne-ui";
import { Switch } from "burne-ui";

export function FieldSettingsPanelDemo() {
  return (
    <Field.Set className="items-center justify-center">
      <div className="flex flex-col gap-mid p-mid items-center justify-center">
        <Field.Legend>
          <Field.LegendHeader>
            <Label>Notifications</Label>
            <Field.Hint as="span">Email and push</Field.Hint>
          </Field.LegendHeader>
        </Field.Legend>
        <div className="flex items-center justify-between gap-mid">
          <Switch defaultChecked aria-label="Weekly digest" >
            <Switch.Control defaultChecked />
            <Switch.Content>
              <Switch.Label>Weekly digest</Switch.Label>
            </Switch.Content>
          </Switch>
        </div>
      </div>
    </Field.Set>
  );
}
