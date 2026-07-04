import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";

import { TimeField } from "burne-ui";

const prefix = <IoTimeOutline className="icon-base shrink-0" aria-hidden />;

export function TimeFieldVariantsDemo() {
  const [timeValue, setTimeValue] = useState("09:30");

  return (
    <div className="flex w-full flex-col items-center gap-mid">
      <TimeField
        label="Start of shift"
        hint="Default shell — bg-surface."
        value={timeValue}
        onValueChange={setTimeValue}
        prefix={prefix}
        className="w-64"
      />
      <TimeField
        label="Outline"
        variant="outline"
        hint="Transparent background with outline."
        value={timeValue}
        onValueChange={setTimeValue}
        prefix={prefix}
        className="w-64"
      />
      <TimeField
        label="Secondary"
        variant="secondary"
        hint="Secondary surface — like Button secondary."
        value={timeValue}
        onValueChange={setTimeValue}
        prefix={prefix}
        className="w-64"
      />
    </div>
  );
}
