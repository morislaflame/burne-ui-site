import { Field } from "burne-ui";
import { Input } from "burne-ui";
import { Label } from "burne-ui";

export function FieldAddressSetDemo() {
  return (
    <Field.Set className="max-w-md">
      <Field.Legend>
        <Field.LegendHeader>
          <Label>Delivery address</Label>
          <Field.Hint as="span">Please provide a current address</Field.Hint>
        </Field.LegendHeader>
      </Field.Legend>
      <Field.Group>
        <Input>
          <Input.Label>City</Input.Label>
          <Input.Control placeholder="Moscow" />
        </Input>
      </Field.Group>
    </Field.Set>
  );
}
