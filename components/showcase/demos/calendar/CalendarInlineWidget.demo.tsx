import { useState } from "react";

import { Calendar } from "burne-ui";
import { Surface } from "burne-ui";
import { Text } from "burne-ui";

export function CalendarInlineWidgetDemo() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Surface variant="secondary" padding="small" className="inline-flex flex-col gap-small">
      <Text as="span" variant="tools" className="px-small text-muted">
        Quick date selection
      </Text>
      <Calendar mode="single" value={date} onValueChange={setDate} size="small" />
    </Surface>
  );
}
