import { useState } from "react";

import { ComboBox } from "burne-ui";

const options = [
  { value: "react", label: "React" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
];

export function ComboBoxVariantsDemo() {
  const [value, setValue] = useState("react");

  return (
    <div className="flex w-full flex-col items-center gap-large">
      <ComboBox
        label="Framework"
        options={options}
        value={value}
        onValueChange={setValue}
        hint="Default shell — bg-surface."
        className="w-64"
      />
      <ComboBox
        label="Outline"
        variant="outline"
        options={options}
        value={value}
        onValueChange={setValue}
        hint="Transparent background with outline."
        className="w-64"
      />
      <ComboBox
        label="Secondary"
        variant="secondary"
        options={options}
        value={value}
        onValueChange={setValue}
        hint="Secondary surface — like Button secondary."
        className="w-64"
      />
    </div>
  );
}
