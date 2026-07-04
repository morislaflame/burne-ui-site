import { useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";

import { Select } from "burne-ui";

const options = [
  {
    value: "ru",
    label: "Russian",
    hint: "Interface in Russian",
    icon: <IoGlobeOutline aria-hidden />,
  },
  {
    value: "en",
    label: "English",
    hint: "UI in English",
    icon: <IoGlobeOutline aria-hidden />,
  },
];

export function SelectClassNamesFullDemo() {
  const [value, setValue] = useState("ru");

  return (
    <Select
      label="Language"
      hint="Customization via classNames"
      options={options}
      value={value}
      onValueChange={setValue}
      variant="outline"
      classNames={{
        root: "rounded-mid border-token bg-surface p-mid max-w-component-small",
        triggerGroup: "border-primary/40 bg-primary/5 shadow-token-base",
        value: "text-primary",
        trigger: "text-primary hover:text-primary",
        popoverBody: "bg-primary/5",
        listBox: "p-xsmall",
      }}
    />
  );
}
