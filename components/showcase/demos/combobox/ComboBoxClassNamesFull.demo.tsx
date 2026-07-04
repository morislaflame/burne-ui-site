import { useState } from "react";

import { ComboBox } from "burne-ui";
import { IoGlobeOutline } from "react-icons/io5";

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

export function ComboBoxClassNamesFullDemo() {
  const [value, setValue] = useState("ru");

  return (
    <ComboBox
      label="Language"
      hint="Customization via classNames"
      options={options}
      value={value}
      onValueChange={setValue}
      variant="outline"
      classNames={{
        root: "rounded-mid border-token bg-surface p-mid max-w-component-small",
        inputGroup: "border-primary/40 bg-primary/5 shadow-token-base",
        input: "text-primary placeholder:text-primary/50",
        trigger: "text-primary hover:text-primary",
        popoverBody: "bg-primary/5",
        listBox: "p-xsmall",
      }}
    />
  );
}
