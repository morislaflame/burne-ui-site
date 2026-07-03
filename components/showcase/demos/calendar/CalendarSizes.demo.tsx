import { Calendar } from "burne-ui";
import { Text } from "burne-ui";

const SIZES = ["small", "base", "mid", "large"] as const;

export function CalendarSizesDemo() {
  return (
    <div className="flex flex-wrap gap-large">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-start gap-small">
          <Text as="span" variant="tools" className="font-medium text-muted">
            {size}
          </Text>
          <Calendar size={size} />
        </div>
      ))}
    </div>
  );
}
