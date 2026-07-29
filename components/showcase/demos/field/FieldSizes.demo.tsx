"use client";

import { Field, type FieldSize, Input } from "burne-ui";

const SIZES: FieldSize[] = ["small", "base", "mid", "large"];

export function FieldSizesDemo() {
  return (
    <div className="w-full gap-2xlarge flex flex-col">
      {SIZES.map((size) => (
        <div key={size} className="rounded-mid border-token p-mid bg-surface">
          <Field.Set size={size} className="max-w-md">
            <Field.Legend>
              <Field.LegendHeader>
                <Field.Label>size="{size}"</Field.Label>
                <Field.Hint as="span">
                  Set gaps + Label / Hint type. Input stays at its own size.
                </Field.Hint>
              </Field.LegendHeader>
            </Field.Legend>
            <Field.Group>
              <Input label="Name" placeholder="Ivan" />
              <Input label="Email" placeholder="you@example.com" hint="Work email preferred" />
            </Field.Group>
          </Field.Set>
        </div>
      ))}
    </div>
  );
}
