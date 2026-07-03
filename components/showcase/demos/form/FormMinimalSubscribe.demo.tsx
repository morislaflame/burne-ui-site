import { useCallback } from "react";

import { Form, type FormValues } from "burne-ui";
import { Button } from "burne-ui";
import { Input } from "burne-ui";

export function FormMinimalSubscribeDemo() {
  const onSubmit = useCallback((values: FormValues) => {
    void values;
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      aria-label="Quick subscription"
      className="max-w-sm"
      rules={{ subscribe: { required: "Specify email" } }}
    >
      <Form.Section>
        <Form.Field name="subscribe">
          <Input label="Email" name="subscribe" placeholder="you@example.com" autoComplete="email" />
        </Form.Field>
      </Form.Section>
      <Form.Actions>
        <Button type="submit" variant="primary" className="w-full">
          Subscribe
        </Button>
      </Form.Actions>
    </Form>
  );
}
