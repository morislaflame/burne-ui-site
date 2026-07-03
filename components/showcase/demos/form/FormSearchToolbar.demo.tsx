import { useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { Form, type FormValues } from "burne-ui";
import { Button } from "burne-ui";
import { Input } from "burne-ui";

export function FormSearchToolbarDemo() {
  const onSubmit = useCallback((values: FormValues) => {
    void values;
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      aria-label="Catalog search"
      className="flex w-full max-w-xl items-center gap-small flex-row rounded-mid border-token bg-tertiary p-xsmall"
    >
      <Form.Section className="min-w-0 flex-1">
        <Input
          name="q"
          placeholder="Find component…"
          className="[&_label]:sr-only"
          label="Search"
        />
      </Form.Section>
      <Button type="submit" variant="primary" iconOnly aria-label="Search">
        <IoSearchOutline aria-hidden />
      </Button>
    </Form>
  );
}
