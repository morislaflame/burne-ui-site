import { Field } from "burne-ui";
import { Input } from "burne-ui";

export function FieldAddressSetDemo() {
  return (
    <Field.Set>
      <Field.Legend>
        <Field.LegendHeader>
          <Field.Label>Delivery address</Field.Label>
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
