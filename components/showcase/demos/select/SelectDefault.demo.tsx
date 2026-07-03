import { useState } from "react";

import { Select } from "burne-ui";

const options = [
  { value: "react", label: "React" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
];

export function SelectDefaultDemo() {
  const [value, setValue] = useState("react");

  return (
    <Select
      label="Framework"
      options={options}
      value={value}
      onValueChange={setValue}
      hint={`Selected: ${value}`}
      className="w-64"
    />
  );
}
