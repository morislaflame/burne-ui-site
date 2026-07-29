import { Field } from "burne-ui";
import { Switch } from "burne-ui";

export function FieldSettingsPanelDemo() {
  return (
    <Field.Set>
      <div className="flex flex-col gap-large p-large">
        <Field.Legend>
          <Field.LegendHeader>
            <Field.Label>Notifications</Field.Label>
            <Field.Hint as="span">Email and push</Field.Hint>
          </Field.LegendHeader>
        </Field.Legend>
        <div className="flex items-center justify-between gap-large">
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
