import { ListBox } from "burne-ui";
import { Surface } from "burne-ui";

const SIZES = ["small", "base", "mid", "large"] as const;

export function ListBoxSizesDemo() {
  return (
    <div className="flex flex-wrap gap-large">
      {SIZES.map((size) => (
        <Surface key={size} variant="default" padding="mid" className="w-40">
          <ListBox size={size} defaultValue="ru">
            <ListBox.Item value="ru" label="Russian" />
            <ListBox.Item value="en" label="English" />
          </ListBox>
        </Surface>
      ))}
    </div>
  );
}
