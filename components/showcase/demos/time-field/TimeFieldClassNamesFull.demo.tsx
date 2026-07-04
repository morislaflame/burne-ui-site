import { IoTimeOutline } from "react-icons/io5";

import { TimeField } from "burne-ui";

export function TimeFieldClassNamesFullDemo() {
  return (
    <TimeField
      className="max-w-sm"
      classNames={{
        root: "rounded-mid border-token bg-surface p-mid max-w-component-small",
        shell: "ring-1 ring-primary/15",
        segment: "text-primary",
        prefix: "text-primary",
        hint: "text-foreground/70",
        error: "text-danger",
      }}
      label="Meeting time"
      defaultValue="09:30"
      hint="24-hour format"
      error="Please enter the correct time."
      prefix={<IoTimeOutline className="icon-base shrink-0" aria-hidden />}
    />
  );
}

export function TimeFieldClassNamesCompoundDemo() {
  return (
    <TimeField
      className="max-w-sm"
      classNames={{
        root: "rounded-mid border-token bg-surface p-mid max-w-component-small",
        shell: "border-primary/30 bg-primary/5",
        segments: "text-primary",
        segment: "text-primary",
        prefix: "text-primary",
        hint: "text-foreground/70",
      }}
    >
      <TimeField.Label>Start of shift</TimeField.Label>
      <TimeField.Control
        defaultValue="14:30"
        variant="segmented"
        prefix={<IoTimeOutline className="icon-base shrink-0" aria-hidden />}
      />
      <TimeField.Hint>Slots shell, segments and segment through classNames.</TimeField.Hint>
    </TimeField>
  );
}
