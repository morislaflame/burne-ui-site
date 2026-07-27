import { useState } from "react";

import { ListBox } from "burne-ui";
import { Surface } from "burne-ui";

export function ListBoxSimpleApiDemo() {
  const [listBoxMulti, setListBoxMulti] = useState<string[]>(["ru"]);

  return (
    <Surface variant="default" padding="mid" className="max-w-sm">
      <ListBox multiple value={listBoxMulti} onValueChange={(v) => setListBoxMulti(v as string[])}>
        <ListBox.Item value="ru" label="Russian" />
        <ListBox.Item value="en" label="English" />
        <ListBox.Item value="de" label="Deutsch" disabled hint="Soon" />
      </ListBox>
    </Surface>
  );
}
