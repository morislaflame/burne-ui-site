import { Button } from "burne-ui";
import { Field } from "burne-ui";
import { Input } from "burne-ui";

export function FieldBillingSetDemo() {
  return (
    <Field.Set className="w-full">
      <Field.Legend>
        <Field.LegendHeader>
          <Field.Label>Payment</Field.Label>
          <Field.Hint as="span">Data protected</Field.Hint>
        </Field.LegendHeader>
      </Field.Legend>
      <Field.Group>
        <Input>
          <Input.Label>Name on the card</Input.Label>
          <Input.Control placeholder="IVAN IVANOV" autoComplete="cc-name" />
        </Input>
        <Input>
          <Input.Label>Card number</Input.Label>
          <Input.Control placeholder="•••• •••• •••• 4242" inputMode="numeric" />
          <Input.Hint>The debit will occur after confirmation.</Input.Hint>
        </Input>
      </Field.Group>
      <Field.Actions>
        <Button type="button" variant="primary">
          Pay
        </Button>
      </Field.Actions>
    </Field.Set>
  );
}
