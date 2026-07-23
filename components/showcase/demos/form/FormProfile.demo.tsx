import { useCallback } from "react";

import { CheckboxGroup } from "burne-ui";
import { Form, type FormValues } from "burne-ui";
import { Button } from "burne-ui";
import { Checkbox } from "burne-ui";
import { Input } from "burne-ui";

export function FormProfileDemo() {
  const onSubmit = useCallback((values: FormValues) => {
    void values;
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      aria-label="Example form"
      className="max-w-md"
      rules={{
        name: { required: "Enter name" },
        email: {
          required: "Email required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Incorrect email",
          },
        },
      }}
    >
      <Form.Title>Profile</Form.Title>
      <Form.Section>
        <Form.Field name="name">
          <Input required name="name" label="Name" placeholder="Ivan" autoComplete="name" />
        </Form.Field>
        <Form.Field name="email">
          <Input
            required
            name="email"
            label="Email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Form.Field>
      </Form.Section>
      <Form.Section>
        <CheckboxGroup>
          <CheckboxGroup.Legend>
            <CheckboxGroup.Label>Delivery method</CheckboxGroup.Label>
          </CheckboxGroup.Legend>
          <CheckboxGroup.List>
            <Checkbox name="ship" value="courier" label="Courier" />
            <Checkbox name="ship" value="pickup" label="Pickup" />
          </CheckboxGroup.List>
        </CheckboxGroup>
      </Form.Section>
      <Form.Actions>
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Form.Actions>
    </Form>
  );
}
