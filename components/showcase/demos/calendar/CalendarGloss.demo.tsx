import { useState } from "react";

import { Calendar } from "burne-ui";

export function CalendarGlossDemo() {
  const [date, setDate] = useState<Date | null>(null);

  return <Calendar variant="gloss" mode="single" value={date} onValueChange={setDate} />;
}
